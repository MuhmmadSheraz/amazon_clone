import React, { useEffect, useState } from 'react'
import router from 'next/router'
import { ShoppingBagIcon, CheckCircleIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import validation from '../../helper/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { cartItem, cleanBasket, Subtotal } from '../../slices/basketSlice'
import { useSession } from 'next-auth/client'
import { completeOrder } from '../../helper/completeOrder'

const PaymentGateway = () => {
  const session = useSession()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const items = useSelector(cartItem)
  const total = useSelector(Subtotal)
  const [expired, setExpired] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  })

  useEffect(() => {
    const payment_gateway_id = sessionStorage.getItem('payment_gateway_id')
    if (!payment_gateway_id) setExpired(true)
    return () => {
      window.sessionStorage.removeItem('payment_gateway_id')
    }
  }, [])
  if (expired)
    return (
      <div className="min-h-screen flex justify-center items-center text-4xl font-semibold bg-blue-100">
        Link Expired
      </div>
    )
  const onSubmit = async () => {
    let body = {
      id: router.query.id,
      email: session[0].user.email,
      items: items.map((prod) => {
        return {
          title: prod.title,
          id: prod.id,
          image: prod.image,
          price: prod.price,
          quantity: prod.quantity,
        }
      }),
      total,
    }
    setLoading(true)
    try {
      await completeOrder(body)
      setLoading(false)
      setPaymentSuccess(true)
      dispatch(cleanBasket())
      setTimeout(() => {
        router.push({
          pathname: '/success',
          query: { id: body.id },
        })
      }, 1000)
      return
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-screen bg-blue-100 flex justify-center items-center">
      <div className="w-[90vw] md:w-[80vw] max-h-screen h-[75vh] bg-white shadow-xl rounded-xl flex flex-col md:flex-row justify-between items-center">
        <div className="bg-blue-500  h-[50%]  md:h-[100%] flex justify-center  w-full mb-2 md:mb-0 md:w-[40vw] items-center flex-col px-4 text-white rounded-t-xl md:rounded-tl-xl md:rounded-bl-xl">
          <div className="fixed top-28 left-15 self-start justify-start  flex h-10 bg-blue-500 ">
            <ShoppingBagIcon className="w-10" />
          </div>

          <div className="w-full overflow-y-auto scrollbar-hide h-[70%] mt-8 md:mt-4">
            {!!items?.length &&
              items?.map((x) => (
                <div
                  key={x.id + x.title}
                  className="flex justify-between w-full my-4 border-b-2 border-dotted xl"
                >
                  <h1 className="pb-2 ">
                    <span className="font-bold"> {x.quantity}X </span>
                    {x.title}
                  </h1>
                  <h1 className="pb-2 font-bold">${x.price}</h1>
                </div>
              ))}
          </div>
          {/* Subtotal */}
          <div className="flex flex-col space-y-2 mt-4 justify-start self-start">
            <h1>
              SubTotal: <span className="font-bold">${total}</span>
            </h1>

            <h1>
              Shipping Charges: <span className="font-bold">$10</span>
            </h1>
          </div>
        </div>
        <div className="w-[90%] md:w-[60vw] px-4  flex justify-center items-center  pb-16">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full  flex-col space-y-4 flex justify-start items-center"
          >
            <input
              {...register('email')}
              type="email"
              className="w-full p-4 font-bold rounded border-2 border-gray-400"
              placeholder="Email"
            />
            <p className="text-red-500">{errors.email?.message}</p>
            <input
              {...register('cardNumber')}
              type="number"
              className="w-full p-4 font-bold rounded border-2 border-gray-400"
              placeholder="Card Number"
            />
            <p className="text-red-500">{errors.cardNumber?.message}</p>
            <div className="flex justify-between w-full items-center space-x-3">
              <div className="w-1/2">
                <input
                  {...register('expiryDate')}
                  type="date"
                  className="w-full p-4 font-bold rounded border-2 border-gray-400"
                  placeholder="Card Number"
                />
                <p className="text-red-500">{errors.expiryDate?.message}</p>
              </div>
              <div className="w-1/2">
                <input
                  {...register('cvc')}
                  type="number"
                  className="w-full p-4 font-bold rounded border-2 border-gray-400"
                  placeholder="Card Number"
                />
                <p className="text-red-500">{errors.cvc?.message}</p>
              </div>
            </div>
            <button
              disabled={loading || paymentSuccess}
              className={`flex text-center justify-center items-center flex-row max-w-[100%] md:w-[60%] ${
                paymentSuccess ? 'bg-green-500' : 'bg-blue-500'
              } font-semibold rounded-md text-xl px-2 py-2 md:py-4 text-white mb-4`}
            >
              {paymentSuccess ? (
                <p className="flex justify-center items-center">
                  {' '}
                  <CheckCircleIcon width={40} className="mr-2" />
                  Payment Successfull
                </p>
              ) : loading ? (
                <p className="animate-pulse">Loading...</p>
              ) : (
                <p>Pay ${total + 10}</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PaymentGateway
