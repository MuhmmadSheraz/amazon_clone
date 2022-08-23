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
const endPointSecret =
  'whsec_a27ca0cd3828634eabdde2e3568c2ede7830c8acd2304771c9a6f0ceacf6d709'
const fullFillOrder = async (session) => {
  console.log('FullFill Order Session', session)
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
      .then(() => {
        console.log(`${session.id} has been added to Firestore`)
      })
      .catch((err) => {
        console.log('Firebase Error***', err.message)
      })
  } catch (error) {
    console.log(`Catch ${error.message}`)
  }
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
      console.log(error.message)
      return res.status(400).send(`WebHook Error`, error.message)
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      return fullFillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
    } else {
      console.log('Something went wrong*******')
    }
  }
}
export const config = {
  api: {
    bodyParser: false, // Useless for webhooks
    externalResolver: true,
  },
}
