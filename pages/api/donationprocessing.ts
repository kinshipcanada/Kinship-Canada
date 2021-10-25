import { buffer } from "micro";
import Stripe from "stripe";
import { supabase } from '../../lib/supabaseClient'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
  if (req.method === "POST") {

    const details: any[] = req.body.data;
    const cart: any[] = JSON.parse(req.body.data.object.metadata.cart)
    const user: string = req.body.data.object.metadata.user_id
    const fees_covered: boolean = req.body.data.object.metadata.fees_covered
    const stripe_donor_id: string = req.body.data.object.customer
    const checkout_id: string = req.body.data.object.id
    const email: string = req.body.data.object.customer_details.email


    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    const formatted_date = yyyy + '-' + mm + '-' + dd

    let amount = 0
    let eligible = 0
    let causes = []

    for (let i = 0; i < cart.length; i++) {
      amount += (parseFloat(cart[i]['amount'])*100)
      let obj = {}

      if (cart[i]['eligible']) {
        eligible += (parseFloat(cart[i]['amount'])*100)
        obj = {
          cause: cart[i]["name"],
          amount: parseFloat(cart[i]['amount']),
          eligible: parseFloat(cart[i]['amount'])
        }
      } else {
        obj = {
          cause: cart[i]["name"],
          amount: parseFloat(cart[i]['amount']),
          eligible: parseFloat(cart[i]['amount'])
        }
      }

      causes.push(obj)
    }

    const { data, error } = await supabase
      .from('donations')
      .insert([
        { user_id: user, date: formatted_date, live_mode: false, direct: true, stripe_donor_id: stripe_donor_id, stripe_payment_id: checkout_id, amount: amount, amount_eligible: eligible, causes: causes }
      ])
    
    if (error) {
      res.json({ received: false, succeeded: false })
    } else {
      res.json({ received: true, succeeded: true, data: data });
    }
      
    
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;