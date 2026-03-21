const functions = require("firebase-functions");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// This is the base webhook to receive recurring payment events from Stripe
exports.stripeWebhook = functions.https.onRequest((request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    // To implement in production:
    // event = stripe.webhooks.constructEvent(request.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    event = request.body; // Mock just for structure
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event (e.g., subscription created, renewed, canceled)
  switch (event.type) {
    case 'customer.subscription.created':
      // const subscription = event.data.object;
      console.log('Subscription created in Stripe');
      break;
    case 'invoice.payment_succeeded':
      console.log('Subscription payment successful');
      break;
    case 'customer.subscription.deleted':
      console.log('Subscription canceled in Stripe');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Confirm receipt to Stripe
  response.json({received: true});
});