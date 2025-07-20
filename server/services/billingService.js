const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database/init');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function deductCredits(userId, amount, description) {
  try {
    const db = getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Check if user has enough credits
    if (user.credits >= amount) {
      // Deduct from credits
      db.prepare('UPDATE users SET credits = credits - ? WHERE id = ?').run(amount, userId);
      
      // Record transaction
      const transactionId = uuidv4();
      db.prepare(`
        INSERT INTO transactions (id, userId, type, amount, description, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(transactionId, userId, 'debit', amount, description, 'completed');
      
      return true;
    }

    // If no credits, try to charge payment method
    if (user.hasPaymentMethod && user.stripeCustomerId) {
      try {
        // Get default payment method
        const paymentMethod = db.prepare('SELECT * FROM paymentMethods WHERE userId = ? AND isDefault = TRUE').get(userId);
        
        if (paymentMethod) {
          // Create payment intent
          const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: 'usd',
            customer: user.stripeCustomerId,
            payment_method: paymentMethod.stripePaymentMethodId,
            confirm: true,
            metadata: {
              userId: userId,
              type: 'service_charge',
              description: description
            }
          });

          if (paymentIntent.status === 'succeeded') {
            // Record transaction
            const transactionId = uuidv4();
            db.prepare(`
              INSERT INTO transactions (id, userId, type, amount, description, stripePaymentId, status)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(transactionId, userId, 'debit', amount, description, paymentIntent.id, 'completed');
            
            return true;
          }
        }
      } catch (stripeError) {
        console.error('Stripe payment error:', stripeError);
        return false;
      }
    }

    return false;
  } catch (error) {
    console.error('Deduct credits error:', error);
    return false;
  }
}

async function addCredits(userId, amount, description, stripePaymentId = null) {
  try {
    const db = getDatabase();
    
    // Add credits to user
    db.prepare('UPDATE users SET credits = credits + ? WHERE id = ?').run(amount, userId);
    
    // Record transaction
    const transactionId = uuidv4();
    db.prepare(`
      INSERT INTO transactions (id, userId, type, amount, description, stripePaymentId, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(transactionId, userId, 'credit', amount, description, stripePaymentId, 'completed');
    
    return true;
  } catch (error) {
    console.error('Add credits error:', error);
    return false;
  }
}

module.exports = {
  deductCredits,
  addCredits
};