import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../slices/basketSlice";

const CartItem = ({ item }) => {
  const { title, image, description, price, isPrime, id } = item;
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeFromBasket(id));
  };
  return (
    <div className="grid grid-cols-5 mt-3">
      <Image src={image} height={200} width={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <h1 className="font-semibold">{title}</h1>
        <div className="flex my-1">
          {[Array(Math.floor(Math.random() * 10) + 5)].map((_, i) => (
            <StarIcon className=" h-5 text-yellow-500" key={i} />
          ))}
        </div>
        <p className="text-xs line-clamp-2 my-1">{description}</p>
        <p className="font-semibold">
          <Currency quantity={price} currency={"PKR"} />
        </p>
        {isPrime && (
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
      </div>
      <div className="flex flex-col space-y-2  my-auto justify-self-end ">
        <button className="addButton mt-auto" onClick={removeItem}>
          Remove from basket
        </button>
      </div>
    </div>
  );
};

export default CartItem;
