import { buffer } from 'micro'
import * as admin from 'firebase-admin'

const serviceAccount = require('../../../permission.json')

// For Checking if it is not already Initialze
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app()

// Establish connection to stripe
const stripe = require('stripe')(
  'sk_test_51IuZHHAFo27nDP2RBSopEKhCU2rKJaUWW3W98MZFxd3OlxwnuiTVsMkCpJGeNl0U5flMZc6PHSgM5z5S6m6zXTOS00URjFba1s  '
)
// const endPointSecret = 'whsec_44L20E2gdbVd7CRIaWubU3EeRTtE63cR'
const endPointSecret = process.env.STRIPE_SECRET_KEY
const fullFillOrder = async (session) => {
  try {
    await app
      .firestore()
      .collection('users')
      .doc(session.metadata.email)
      .collection('orders')
      .doc(session.id)
      .set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        timpestamp: admin.firestore.FieldValue.serverTimestamp(),
        images: JSON.parse(session.metadata.images),
      })
      .then(() => {})
      .catch((err) => {})
  } catch (error) {}
}
export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()
    const sig = req.headers['stripe-signature']
    let event

    //  Verify That the event posted from Stripe or not
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endPointSecret)
    } catch (error) {
      return res.status(400).send(`WebHook Error`, error.message)
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      return fullFillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
    } else {
    }
  }
}
export const config = {
  api: {
    bodyParser: false, // Useless for webhooks
    externalResolver: true,
  },
}
