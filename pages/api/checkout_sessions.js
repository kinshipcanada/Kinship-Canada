const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // TODO: replace this with the `price` of the product you want to sell
            price: 'price_1Jbr09Bq7b4L3fUmL7RGAdIK',
            quantity: 1,
          },
          {
            // TODO: replace this with the `price` of the product you want to sell
            price: 'Kinship9893632544',
            quantity: 1,
          },
        ],
        payment_method_types: [
          'card',
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/success/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled?canceled=true`,
      });

      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}