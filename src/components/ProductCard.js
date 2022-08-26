import React, { useState } from 'react'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import { addToBasket } from '../slices/basketSlice'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
function ProductCard({
  product: { title, image, description, price, category, id, rating },
}) {
  const isPrime = useState(Math.random() < 0.5)
  const dispatch = useDispatch()
  const addItem = (e) => {
    e.stopPropagation()
    const product = {
      id,
      title,
      image,
      description,
      price,
      category,
      rating,
      isPrime: isPrime[0],
      quantity: 1,
    }
    dispatch(addToBasket(product))
  }
  const roundedRating = Math.floor(rating.rate)
  return (
    <Link href={`/product/${id}`}>
      <div className="relative flex bg-white m-5 flex-col p-10 z-30 growing-hover ">
        <Image src={image} height={200} width={200} objectFit="contain" />
        <p className="absolute top-2 right-2 text-gray-500 italic">
          {category}
        </p>
        <h2 className="text-black font-weight-500 my-2 text-lg">{title}</h2>
        <div className="flex items-center my-2">
          {Array(roundedRating)
            .fill(0)
            .map((_, i) => (
              <StarIcon className=" h-5 text-yellow-500" key={i} />
            ))}
        </div>
        <p className="text-xs line-clamp-2">{description}</p>
        <div className="text-black my-3">
          <Currency quantity={price} currency={'USD'} />
        </div>
        {isPrime[0] && (
          <div className="flex items-center space-x-2 mt-auto">
            <img
              src="https://links.papareact.com/fdw"
              className="w-12"
              loading="lazy"
              alt="demo"
            />
            <p>Free Next-day Delivery</p>
          </div>
        )}
        <button className="addButton mt-auto" onClick={addItem}>
          Add to basket
        </button>
      </div>
    </Link>
  )
}

export default ProductCard
