import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'
import Header from '../components/Header'
import { cartItem } from '../slices/basketSlice'
import { Subtotal } from '../slices/basketSlice'
import { useSession } from 'next-auth/client'
import router from 'next/router'
import { v4 as uuidv4 } from 'uuid'
function checkout() {
  const session = useSession()
  const items = useSelector(cartItem)
  const total = useSelector(Subtotal)

  const proceedToCheckout = async () => {
    sessionStorage.setItem('payment_gateway_id', uuidv4())
    router.push(`/payment/${uuidv4()}`)
  }
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="mx-auto lg:flex max-w-screen-2xl min-h-[90vh]">
        {/* Left Side */}
        <div className="flex-grow shadow-sm m-5">
          <Image
            src={'https://links.papareact.com/ikj'}
            height={250}
            width={1024}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-50 bg-white">
            <h1 className="text-3xl pb-4 ">
              {items.length ? 'Your Shopping Basket' : 'No Items Added'}
            </h1>
            <div>
              {items?.map((item, i) => (
                <CartItem item={item} key={i} />
              ))}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-col  bg-white px-5 py-10 w-[80vh] shadow-md min-h-[90vh]">
          <h2 className="whitespace-nowrap mb-2 font-semibold">
            Subtotal {'('}
            {items?.length}
            {' items ) '}
            {Math.trunc(items.length ? total : 0)}
          </h2>
          <button
            onClick={proceedToCheckout}
            disabled={!session}
            className={` ${
              session[0]?.user.email
                ? 'addButton'
                : 'from-gray-300 to-gray-500 text-gray-300 cursor-not-allowed border-gray-800 bg-gray-400 p-2 rounded focus:outline-none mt-4'
            }`}
          >
            {!session ? 'Sign In' : 'Proceed To Checkout'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default checkout
