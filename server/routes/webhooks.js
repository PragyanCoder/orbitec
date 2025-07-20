const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { addCredits } = require('../services/billingService');

const router = express.Router();

// Stripe webhook handler
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        
        if (paymentIntent.metadata.type === 'credit_purchase') {
          const userId = paymentIntent.metadata.userId;
          const amount = paymentIntent.amount / 100; // Convert from cents
          
          await addCredits(userId, amount, `Credit purchase - $${amount}`, paymentIntent.id);
          console.log(`Added $${amount} credits to user ${userId}`);
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.error('Payment failed:', failedPayment.id, failedPayment.last_payment_error);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

module.exports = router;