import db from '../../firebase'
import { firebase } from '../../firebase'
export const completeOrder = async (data) => {
  try {
    await db
      .collection('users')
      .doc(data.email)
      .collection('orders')
      .doc(data.id)
      .set({
        id: data.id,
        amount: data.total,
        amount_shipping: 10,
        timpestamp: firebase.database.ServerValue.TIMESTAMP,
        items: data?.items,
      })
      .then(() => {})
      .catch((err) => {
        throw err
      })
  } catch (error) {
    console.log(error)
    throw error
  }
}
