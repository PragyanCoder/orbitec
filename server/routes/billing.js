const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database/init');
const { logActivity } = require('../services/activityService');

const router = express.Router();

// Get billing information
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    
    // Get user billing info
    const user = db.prepare('SELECT credits, hasPaymentMethod, stripeCustomerId FROM users WHERE id = ?').get(req.user.id);
    
    // Get recent transactions
    const transactions = db.prepare(`
      SELECT * FROM transactions 
      WHERE userId = ? 
      ORDER BY createdAt DESC 
      LIMIT 10
    `).all(req.user.id);

    // Get payment methods
    const paymentMethods = db.prepare(`
      SELECT * FROM paymentMethods 
      WHERE userId = ? 
      ORDER BY isDefault DESC, createdAt DESC
    `).all(req.user.id);

    res.json({
      credits: user.credits,
      hasPaymentMethod: user.hasPaymentMethod,
      transactions,
      paymentMethods
    });
  } catch (error) {
    console.error('Get billing error:', error);
    res.status(500).json({ error: 'Failed to fetch billing information' });
  }
});

// Add payment method
router.post('/payment-methods', async (req, res) => {
  try {
    const { paymentMethodId } = req.body;

    if (!paymentMethodId) {
      return res.status(400).json({ error: 'Payment method ID is required' });
    }

    const db = getDatabase();
    let user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);

    // Create Stripe customer if doesn't exist
    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: {
          userId: user.id
        }
      });

      db.prepare('UPDATE users SET stripeCustomerId = ? WHERE id = ?').run(customer.id, user.id);
      user.stripeCustomerId = customer.id;
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    // Get payment method details
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    // Save payment method to database
    const pmId = uuidv4();
    const isFirst = !user.hasPaymentMethod;

    db.prepare(`
      INSERT INTO paymentMethods (id, userId, stripePaymentMethodId, type, last4, expiryMonth, expiryYear, isDefault)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      pmId,
      user.id,
      paymentMethodId,
      paymentMethod.card.brand,
      paymentMethod.card.last4,
      paymentMethod.card.exp_month,
      paymentMethod.card.exp_year,
      isFirst
    );

    // Update user payment method status
    db.prepare('UPDATE users SET hasPaymentMethod = TRUE WHERE id = ?').run(user.id);

    // Set as default payment method in Stripe if it's the first one
    if (isFirst) {
      await stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    await logActivity(req.user.id, 'payment_method_added', 'Added payment method', req.ip, req.get('User-Agent'));

    res.json({ message: 'Payment method added successfully' });
  } catch (error) {
    console.error('Add payment method error:', error);
    res.status(500).json({ error: 'Failed to add payment method' });
  }
});

// Remove payment method
router.delete('/payment-methods/:id', async (req, res) => {
  try {
    const db = getDatabase();
    const paymentMethod = db.prepare('SELECT * FROM paymentMethods WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);

    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    // Detach from Stripe
    await stripe.paymentMethods.detach(paymentMethod.stripePaymentMethodId);

    // Remove from database
    db.prepare('DELETE FROM paymentMethods WHERE id = ? AND userId = ?').run(req.params.id, req.user.id);

    // Check if user still has payment methods
    const remainingMethods = db.prepare('SELECT COUNT(*) as count FROM paymentMethods WHERE userId = ?').get(req.user.id);
    
    if (remainingMethods.count === 0) {
      db.prepare('UPDATE users SET hasPaymentMethod = FALSE WHERE id = ?').run(req.user.id);
    }

    await logActivity(req.user.id, 'payment_method_removed', 'Removed payment method', req.ip, req.get('User-Agent'));

    res.json({ message: 'Payment method removed successfully' });
  } catch (error) {
    console.error('Remove payment method error:', error);
    res.status(500).json({ error: 'Failed to remove payment method' });
  }
});

// Purchase credits
router.post('/purchase-credits', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 10) {
      return res.status(400).json({ error: 'Minimum purchase amount is $10' });
    }

    const db = getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);

    if (!user.hasPaymentMethod) {
      return res.status(400).json({ error: 'Please add a payment method first' });
    }

    // Get default payment method
    const defaultPaymentMethod = db.prepare('SELECT * FROM paymentMethods WHERE userId = ? AND isDefault = TRUE').get(req.user.id);

    if (!defaultPaymentMethod) {
      return res.status(400).json({ error: 'No default payment method found' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      customer: user.stripeCustomerId,
      payment_method: defaultPaymentMethod.stripePaymentMethodId,
      confirm: true,
      return_url: `https://${process.env.DOMAIN}/dashboard/billing`,
      metadata: {
        userId: user.id,
        type: 'credit_purchase'
      }
    });

    if (paymentIntent.status === 'succeeded') {
      // Add credits to user account
      db.prepare('UPDATE users SET credits = credits + ? WHERE id = ?').run(amount, user.id);

      // Record transaction
      const transactionId = uuidv4();
      db.prepare(`
        INSERT INTO transactions (id, userId, type, amount, description, stripePaymentId, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(transactionId, user.id, 'credit', amount, `Credit purchase - $${amount}`, paymentIntent.id, 'completed');

      await logActivity(req.user.id, 'credits_purchased', `Purchased $${amount} credits`, req.ip, req.get('User-Agent'));

      res.json({ 
        message: 'Credits purchased successfully',
        amount,
        newBalance: user.credits + amount
      });
    } else {
      res.status(400).json({ error: 'Payment failed' });
    }
  } catch (error) {
    console.error('Purchase credits error:', error);
    res.status(500).json({ error: 'Failed to purchase credits' });
  }
});

// Redeem code
router.post('/redeem', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Redeem code is required' });
    }

    const db = getDatabase();
    
    // Find redeem code
    const redeemCode = db.prepare('SELECT * FROM redeemCodes WHERE code = ? AND used = FALSE').get(code.toUpperCase());

    if (!redeemCode) {
      return res.status(404).json({ error: 'Invalid or already used redeem code' });
    }

    // Check if expired
    if (redeemCode.expiresAt && new Date(redeemCode.expiresAt) < new Date()) {
      return res.status(400).json({ error: 'Redeem code has expired' });
    }

    // Mark as used and add credits
    db.prepare('UPDATE redeemCodes SET used = TRUE, usedBy = ? WHERE id = ?').run(req.user.id, redeemCode.id);
    db.prepare('UPDATE users SET credits = credits + ? WHERE id = ?').run(redeemCode.credits, req.user.id);

    // Record transaction
    const transactionId = uuidv4();
    db.prepare(`
      INSERT INTO transactions (id, userId, type, amount, description, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(transactionId, req.user.id, 'credit', redeemCode.credits, `Redeem code: ${code}`, 'completed');

    await logActivity(req.user.id, 'code_redeemed', `Redeemed code: ${code} for $${redeemCode.credits}`, req.ip, req.get('User-Agent'));

    res.json({ 
      message: 'Code redeemed successfully',
      credits: redeemCode.credits,
      newBalance: req.user.credits + redeemCode.credits
    });
  } catch (error) {
    console.error('Redeem code error:', error);
    res.status(500).json({ error: 'Failed to redeem code' });
  }
});

module.exports = router;