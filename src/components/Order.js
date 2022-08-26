import React from 'react'
import Currency from 'react-currency-formatter'

import { v4 as uuidv4 } from 'uuid'
function Order({ order }) {
  return (
    <div className="shadow-md border">
      <div className="flex space-x-10 p-5 bg-gray-200 items-center w-full justify-between">
        <div className="flex items-center space-x-7">
          <p className="font-bold sm:text-lg text-xs">Order Placed</p>

          <div className="text-lg  flex-1 whitespace-nowrap text-right w-8 sm:w-40">
            <p className="truncate  whitespace-nowrap text-right ">
              {order.id ? order.id : uuidv4()}
            </p>
          </div>
        </div>
        <div>
          <p className="font-bold sm:text-lg text-xs">Total</p>
          <p className="sm:text-lg text-xs">
            <Currency
              quantity={order.amount + order.amount_shipping}
              currency={'USD'}
            />
          </p>
        </div>
      </div>
      <div className="mx-5 space-x-16 p-5 flex overflow-auto scrollbar-hide">
        {order?.items?.map((prod, i) => {
          return <img src={prod.image} alt="" className="h-60" />
        })}
      </div>
    </div>
  )
}

export default Order
