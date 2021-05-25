import React from "react";
import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ item }) {
  return (
    <div className="shadow-md border">
      <div className="flex space-x-10 p-5 bg-gray-100 items-center">
        <div className="">
          <p className="font-bold">Order Placed</p>
          <p className="text-lg">
            {moment.unix(item.timestamp).format("MM/DD/YYYY")}
          </p>
        </div>
        <div>
          <p className="font-bold">Total</p>
          <p className="text-lg">
            <Currency
              quantity={item.amount + item.amountShipping}
              currency={"PKR"}
            />
          </p>
        </div>
        <p className="text-lg self-end flex-1 whitespace-nowrap text-right">
          <p className=" truncate text-xs whitespace-nowrap w-full">{item.id}</p>
          <p className="text-blue-400">{item.items.reduce((total, item) => total + item.quantity, 0)} </p>
        </p>
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
