import { MinusIcon, PlusIcon, StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { removeFromBasket, updateProductQuantity } from '../slices/basketSlice'

const CartItem = ({ item }) => {
  const { title, image, description, price, isPrime, id, quantity } = item
  const dispatch = useDispatch()

  const removeItem = () => {
    dispatch(removeFromBasket(id))
  }
  const updateQuantity = (val) => {
    if (val < 1) return false
    dispatch(updateProductQuantity({ id, quantity: val }))
  }
  return (
    <div className="grid sm:grid-cols-5 mt-3">
      <Image src={image} height={200} width={200} objectFit="contain" />
      <div className="sm:col-span-3 mx-5">
        <h1 className="font-semibold">{title}</h1>
        <div className="flex my-1">
          {[Array(Math.floor(Math.random() * 10) + 5)].map((_, i) => (
            <StarIcon className=" h-5 text-yellow-500" key={i} />
          ))}
        </div>
        <p className="text-xs line-clamp-2 my-1">{description}</p>
        <p className="font-semibold">
          <Currency quantity={price} currency={'USD'} />
        </p>
        {isPrime && (
          <div className="flex items-center space-x-2 mt-auto">
            <img
              src="https://links.papareact.com/fdw"
              alt=""
              className="w-12"
              loading="lazy"
            />
            <p>Free Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex sm:flex-col flex-row items-center space-x-2  sm:space-y-2   sm:justify-self-end mx-5 sm:my-auto">
        <div className="flex justify-center space-x-1">
          <button
            onClick={() => updateQuantity(quantity + 1)}
            className=" p-2 text-xs outline-none text-center bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm"
          >
            <PlusIcon className="h-5" />
          </button>
          <p className="bg-gray-100 p-2 outline-none w-1/2 text-center">
            {quantity}
          </p>
          <button
            onClick={() => updateQuantity(quantity - 1)}
            className="  p-2 text-xs outline-none bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm"
          >
            <MinusIcon className="h-5" />
          </button>
        </div>
        <button
          className="addButton sm:mt-auto py-3 sm:py-2"
          onClick={removeItem}
        >
          Remove from basket
        </button>
      </div>
    </div>
  )
}

export default CartItem
