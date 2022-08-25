const stripe = require('stripe')(
  'sk_test_51IuZHHAFo27nDP2RBSopEKhCU2rKJaUWW3W98MZFxd3OlxwnuiTVsMkCpJGeNl0U5flMZc6PHSgM5z5S6m6zXTOS00URjFba1s'
)

export default async (req, res) => {
  const { items, email } = req.body
  const stripeProducts = items.map((item, i) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * item.quantity * 100,
    },
  }))
  console.log('Host', process.env.Host)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_rates: ['shr_1IuZUVAFo27nDP2Rolmmu0dT'],
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'FR'],
      },
      line_items: stripeProducts,
      mode: 'payment',
      success_url: `${process.env.Host}/success`,
      cancel_url: `${process.env.Host}/cancel`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    })
    console.log('session-------', session)
    return res.status(200).json({ id: session.id })
  } catch (error) {
    return console.log(error)
  }
}
