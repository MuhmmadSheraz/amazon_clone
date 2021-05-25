import { getSession, useSession } from "next-auth/client";
import React, { useEffect } from "react";
import moment from "moment";

import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";
import { useRouter } from "next/router";

function orders({ orders }) {
  const router = useRouter();
  const [user] = useSession();
  useEffect(() => {
    getSession().then((session) => (!session ? window.location.href="/" : true));
  }, []);
  return (
    <div className="bg-100 ">
      <Header />
      <main className="max-w-screen-2xl mx-auto p-5">
        <h1 className="border-b-2 text-3xl  my-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {user?.user ? (
          <h2 className="font-semibold">17 Orders</h2>
        ) : (
          <h2>Sign In To See Your Order </h2>
        )}
        <div className="mt-5 space-y-4">
          {user && orders?.map((order) => <Order item={order} />)}
        </div>
      </main>
    </div>
  );
}

export default orders;
export async function getServerSideProps(context) {
  const stripe = require("stripe")(
    "sk_test_51IuZHHAFo27nDP2RBSopEKhCU2rKJaUWW3W98MZFxd3OlxwnuiTVsMkCpJGeNl0U5flMZc6PHSgM5z5S6m6zXTOS00URjFba1s"
  );
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }
  const stripeOrders = await db
    .collection("users")
    .doc(session?.user?.email)
    .collection("orders")
    // .orderBy("timestamp", "desc")
    .get();
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => {
      return {
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: moment(order.data().timpestamp.toDate()).unix(),
        items: (
          await stripe.checkout.sessions.listLineItems(order.id, {
            limit: 100,
          })
        ).data,
      };
    })
  );
  return {
    props: {
      orders: orders,
    },
  };
}
