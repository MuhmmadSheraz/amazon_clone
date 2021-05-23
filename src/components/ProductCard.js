import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { addToBasket } from "../slices/basketSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";
function ProductCard({
  product: { title, image, description, price, category, id },
}) {
  const rating = useState(Math.floor(Math.random() * (5 - 1 + 1) + 1));
  const isPrime = useState(Math.random() < 0.5);
  const dispatch = useDispatch();
  const addItem = () => {
    const product = {
      id,
      title,
      image,
      description,
      price,
      category,
      rating,
      isPrime: isPrime[0],
    };
    dispatch(addToBasket(product));
  };
  return (
    <div className="relative flex bg-white m-5 flex-col p-10 z-30 growing-hover ">
      <Image src={image} height={200} width={200} objectFit="contain" />
      <p className="absolute top-2 right-2 text-gray-500 italic">{category}</p>
      <h2 className="text-black font-weight-500 my-2 text-lg">{title}</h2>
      <div className="flex items-center my-2">
        {[Array(Math.floor(Math.random() * 10) + 5)].map((_, i) => (
          <StarIcon className=" h-5 text-yellow-500" key={i} />
        ))}
      </div>
      <p className="text-xs line-clamp-2">{description}</p>
      <div className="text-black my-3">
        <Currency quantity={price} currency={"PKR"} />
      </div>
      {isPrime[0] && (
        <div className="flex items-center space-x-2 mt-auto">
          <img
            src="https://links.papareact.com/fdw"
            alt=""
            className="w-12"
            loading="lazy"
            alt=""
          />
          <p>Free Next-day Delivery</p>
        </div>
      )}
      <button className="addButton mt-auto" onClick={addItem}>
        Add to basket
      </button>
    </div>
  );
}

export default ProductCard;
