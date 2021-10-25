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
    const profile: any = req.body.profile;
    const user_id: string = req.body.user_id
    const cart: any[] = req.body.details
    const decoded_cart: string = JSON.stringify(cart);
    const fees_covered: boolean = req.body.fees_covered
    
    // Get extra parameters
    const stripe_donor_id: string = req.body.profile.stripe_donor_id
    const email: string = req.body.email

    const lineItems: any = []

    const metadata: any = {
      user_id: user_id,
      cart: decoded_cart,
    }

    for (let i = 0; i < cart.length; i++) {

      let arr: object;

      if (cart[i]['recurring']) {
        if (fees_covered) {
          arr = {
            quantity: 1,
            price_data: {
              product_data: {
                name: cart[i]['name'],
              },
              unit_amount: formatAmountForStripe((parseFloat(cart[i]['amount'])*1.029), CURRENCY),
              currency: CURRENCY,
              recurring: {
                interval: cart[i]['interval'],
              }
            }
          }
        } else {
            arr = {
              quantity: 1,
              price_data: {
                product_data: {
                  name: cart[i]['name'],
                },
                unit_amount: formatAmountForStripe(cart[i]['amount'], CURRENCY),
                currency: CURRENCY,
                recurring: {
                  interval: cart[i]['interval'],
                }
              }
            }
        }
      } else {
        if (fees_covered) {
          arr = {
            quantity: 1,
            price_data: {
              product_data: {
                name: cart[i]['name'],
              },
              unit_amount: formatAmountForStripe((parseFloat(cart[i]['amount'])*1.029), CURRENCY),
              currency: CURRENCY,
            }
          }
        } else {
          arr = {
            quantity: 1,
            price_data: {
              product_data: {
                name: cart[i]['name'],
              },
              unit_amount: formatAmountForStripe(cart[i]['amount'], CURRENCY),
              currency: CURRENCY,
            }
          }
        }
      }

      lineItems.push(arr)
    }

    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: lineItems,
        customer: stripe_donor_id,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
        metadata: metadata,
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