import { getSession, useSession } from 'next-auth/client'
import React, { useEffect } from 'react'

import db from '../../firebase'
import Header from '../components/Header'
import Order from '../components/Order'
import { useRouter } from 'next/router'

function orders({ orders = [] }) {
  const [user] = useSession()
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        return (window.location.href = '/')
      }
    })
  }, [])
  return (
    <div className="bg-100 ">
      <Header />
      <main className="max-w-screen-2xl mx-auto p-5">
        <h1 className="border-b-2 text-3xl  my-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {user?.user ? (
          <h2 className="font-semibold">{orders.length} Orders</h2>
        ) : (
          <h2>Sign In To See Your Order </h2>
        )}
        <div className="mt-5 space-y-4">
          {user && orders?.map((order) => <Order order={order} />)}
        </div>
      </main>
    </div>
  )
}

export default orders
export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) return

  const allOrders = await db
    .collection('users')
    .doc(session?.user?.email)
    .collection('orders')
    .get()
  const orders = await Promise.all(
    allOrders.docs.map(async (order) => {
      return order.data()
    })
  )
  return {
    props: { orders },
  }
}
