const functions = require("firebase-functions");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Este es el webhook base para recibir eventos de pagos recurrentes de Stripe
exports.stripeWebhook = functions.https.onRequest((request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    // Para implementar en producción:
    // event = stripe.webhooks.constructEvent(request.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    event = request.body; // Mock solo para estructura
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar el evento (ej: suscripción creada, renovada, cancelada)
  switch (event.type) {
    case 'customer.subscription.created':
      // const subscription = event.data.object;
      console.log('Suscripción creada en Stripe');
      break;
    case 'invoice.payment_succeeded':
      console.log('Pago de suscripción exitoso');
      break;
    case 'customer.subscription.deleted':
      console.log('Suscripción cancelada en Stripe');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Confirmar recepción a Stripe
  response.json({received: true});
});
