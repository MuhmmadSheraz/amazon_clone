import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import { cartItem } from "../slices/basketSlice";
import { Subtotal } from "../slices/basketSlice";
import { useSession } from "next-auth/client";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IuZHHAFo27nDP2RkVC3lcTseoLJkcv7X2XDXj7UUoM04UZy59RjCqPC8tNFqcBLYf7R8Np0HdbZxl3NHzT0ZWWP00g3ICrFr1"
);

function checkout() {
  const session = useSession();
  const items = useSelector(cartItem);
  const total = useSelector(Subtotal);
  const proceedToCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const checkoutSession = await axios.post("/api/create-checkout-session", {
        items: items,
        email: session[0].user.email,
      });
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="mx-auto lg:flex max-w-screen-2xl">
        {/* Left Side */}
        <div className="flex-grow shadow-sm m-5">
          <Image
            src={"https://links.papareact.com/ikj"}
            height={250}
            width={1024}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-50 bg-white">
            <h1 className="text-3xl pb-4 ">
              {items.length ? "Your Shopping Basket" : "No Items Added"}
            </h1>
            <div>
              {items?.map((item, i) => (
                <CartItem item={item} key={i} />
              ))}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-col  bg-white p-10 shadow-md">
          <h2 className="whitespace-nowrap">
            Subtotal {"("}
            {items?.length}
            {" items )"}
            {items.length ? total : ""}
          </h2>
          <button
            onClick={proceedToCheckout}
            disabled={!session}
            className={` ${
              session[0]
                ? "addButton"
                : "from-gray-300 to-gray-500 text-gray-300 cursor-not-allowed border-gray-800 bg-gray-400 p-2 rounded focus:outline-none"
            }`}
          >
            {!session ? "Sign In" : "Proceed To Checkout"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default checkout;
