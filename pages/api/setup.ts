import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user: object = req.body.user
    const email: string = req.body.user.email
    
    // put together address
    const city: string = req.body.user.address.city
    const country: string = req.body.user.address.country
    const line1: string = req.body.user.address.line1
    const postal_code: string = req.body.user.address.postal_code
    const state: string = req.body.user.address.state

    const address: object = {
        city: city,
        country: country,
        line1: line1,
        postal_code: postal_code,
        state: state,
    }
    
    const customer = await stripe.customers.create({
        description: 'My First Test Customer (created for API docs)',
        email: email,
        address: obj
    })

    if (customer) {
        res.status(200).json({ statusCode: 200, message: customer});
    } else {
        res.status(500).json({ statusCode: 500, message: 'Error' });
    }

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}