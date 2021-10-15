import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(
  req,
  res
) {
  if (req.method === 'POST') {
    const user = req.body.user
    const email = req.body.user.email
    const name = req.body.user.name
    const user_id = req.body.user.user_id
    const first_name = req.body.user.first_name
    const last_name = req.body.user.last_name

    // put together address
    const city = req.body.user.address.city
    const country = req.body.user.address.country
    const line1 = req.body.user.address.line1
    const postal_code = req.body.user.address.postal_code
    const state = req.body.user.address.state

    const address = {
      city: city,
      country: country,
      line1: line1,
      postal_code: postal_code,
      state: state,
    }

    const metadata = {
      user_id: user_id,
      first_name: first_name,
      last_name: last_name
    }
    
    const customer = await stripe.customers.create({
        email: email,
        address: address,
        name: name,
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