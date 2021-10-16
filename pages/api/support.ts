// Sends support tickets

import { NextApiRequest, NextApiResponse } from 'next';
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const email: string = req.body.details.email
    const phone: string = req.body.details.phone
    const message: string = req.body.details.message
    const first_name: string = req.body.details.first_name
    const last_name: string = req.body.details.last_name

    const subjectLine: string = first_name + ' sent a support ticket'
    const html: string = "<ul>" + "<li><b>Email: </b>" + email + "</li>" + "<li><b>First Name: </b>" + first_name + "</li>" + "<li><b>Last Name: </b>" + last_name + "</li>" + "<li><b>Phone Number: </b>" + phone + "</li>" + "<li><b>Message: </b>" + message + "</li>" + "</ul>"

    try {
      // Send the email
      const msg = {
        to: 'info@kinshipcanada.com', // Change to your recipient
        from: 'noreply@kinshipcanada.com', // Change to your verified sender
        subject: subjectLine,
        html: html,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })

      res.status(200).json({statusCode: 200, message: "success"});
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}