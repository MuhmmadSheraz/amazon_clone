import React from "react";
import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ item }) {
  return (
    <div className="shadow-md border">
      <div className="flex space-x-10 p-5 bg-gray-100 items-center">
        <div className="">
          <p className="font-bold sm:text-lg text-xs">Order Placed</p>
          <p className="sm:text-lg text-xs ">
            {moment.unix(item.timestamp).format("MM/DD/YYYY")}
          </p>
        </div>
        <div>
          <p className="font-bold sm:text-lg text-xs">Total</p>
          <p className="sm:text-lg text-xs">
            <Currency
              quantity={item.amount + item.amountShipping}
              currency={"PKR"}
            />
          </p>
        </div>
        <div className="text-lg self-end flex-1 whitespace-nowrap text-right w-8 sm:w-40">

          <p className="truncate text-xs whitespace-nowrap text-right ">
            {item.id}
          </p>
          <p className="text-blue-400">
            {item.items.reduce((total, item) => total + item.quantity, 0)}{" "}
          </p>
        </div>
      </div>
      <div className="mx-5 space-x-16 p-5 flex overflow-auto scrollbar-hide">
        {item?.images?.map((image, i) => (
          <img src={image} alt="" className="h-60" />
        ))}
        {item?.images?.map((image, i) => (
          <img src={image} alt="" className="h-60" />
        ))}
        {item?.images?.map((image, i) => (
          <img src={image} alt="" className="h-60" />
        ))}
        {item?.images?.map((image, i) => (
          <img src={image} alt="" className="h-60" />
        ))}
        {item?.images?.map((image, i) => (
          <img src={image} alt="" className="h-60" />
        ))}
        {item?.images?.map((image, i) => (
          <img src={image} alt="" className="h-60" />
        ))}
        {item?.images?.map((image, i) => (
          <img src={image} alt="" className="h-60" />
        ))}
        {item?.images?.map((image, i) => (
          <img src={image} alt="" className="h-60" />
        ))}
        {item?.images?.map((image, i) => (
          <img src={image} alt="" className="h-60" />
        ))}
      </div>
    </div>
  );
}

export default Order;
