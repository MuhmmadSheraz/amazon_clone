import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import { cartItem } from "../slices/basketSlice";
import { Subtotal } from "../slices/basketSlice";
import { useSession } from "next-auth/client";
function checkout() {
  const session = useSession();
  const items = useSelector(cartItem);
  const total = useSelector(Subtotal);
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
