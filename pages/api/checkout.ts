import { NextApiRequest, NextApiResponse } from 'next';

import { CURRENCY } from '../../config';
import { formatAmountForStripe } from '../../lib/stripeHelpers';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const amount: number = req.body.details[0].amount;
    const cart: any[] = req.body.details
    const lineItems: any = []

    for (let i = 0; i < 2; i++) {
      let arr: object = {
        name: cart[i]['name'],
        amount: formatAmountForStripe(cart[i]['amount'], CURRENCY),
        currency: CURRENCY,
        quantity: 1,
      }

      lineItems.push(arr)
    }

    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}