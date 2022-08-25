import React, { useState } from 'react'
import Image from 'next/image'
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip'
import { cartItem } from '../slices/basketSlice'
import { useSelector } from 'react-redux'
function Header({ setSearchText, categories, showByCategory }) {
  const [session] = useSession()
  const router = useRouter()
  const items = useSelector(cartItem)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      if (session) {
        await signOut()
      } else {
        await signIn()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <header>
      <div className="bg-amazon_blue flex flex-grow p-2">
        <div className=" flex items-center flex-grow sm:flex-grow-0 mt-2">
          <Image
            onClick={() => router.push('/')}
            src={'/images/amazonlogo.png'}
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer active:transform active:scale-90"
          />
        </div>
        {router.route == '/' && (
          <div className="bg-yellow-400 flex-grow items-center h-10 hidden sm:flex rounded-md cursor-pointer hover:bg-yellow-500">
            {router.route == '/' && (
              <input
                type="text"
                name=""
                id=""
                onChange={(e) => setSearchText(e.target.value)}
                className="w-6 flex-grow p-2 rounded-l-md focus:outline-none whitespace-nowrap flex-shrink"
              />
            )}
            {router.route == '/' && <SearchIcon className="h-12 p-4" />}
          </div>
        )}
        {router.route !== '/' && <div className=" flex-grow " />}
        <div className="flex text-white text-xs md:space-x-6 space-x-3  mx-6  whitespace-nowrap ">
          <div className="link" onClick={handleSignIn}>
            <p data-tip={!session ? 'Sign In' : session.user.name}>
              {!session ? 'Sign In' : session.user.name}
            </p>

            {!session && (
              <ReactTooltip place="bottom" type="warning" effect="solid" />
            )}

            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </div>
          <div className="link" onClick={() => router.push('/orders')}>
            <p>Returns </p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            className="relative flex items-center link  "
            onClick={() => router.push('/checkout')}
          >
            <span className="bg-yellow-400 rounded-md text-black absolute top-0 -right-2 h-4 px-1 text-center font-bold md:right-10">
              {items?.length}
            </span>
            <ShoppingCartIcon className="h-6 " />
            <p className="font-extrabold md:text-sm hidden md:inline">Basket</p>
          </div>
        </div>
      </div>
      {router.route == '/' && (
        <div className="bg-amazon_blue-light text-white items-center flex space-x-3 p-2 pl-6 text-xs sm:text-sm whitespace-nowrap ">
          <p
            className={` link hidden lg:inline-flex lg:flex-col`}
            onClick={() => {
              setSelectedCategory('all')
            }}
          >
            All
            <span
              className={`${
                selectedCategory == 'all'
                  ? 'border-b-2 border-white h-1'
                  : 'hidden'
              }`}
            />
          </p>
          {categories?.map((category) => (
            <p
              className={` link hidden lg:inline-flex lg:flex-col`}
              onClick={() => {
                showByCategory(category)
                setSelectedCategory(category)
              }}
            >
              {category.slice(0, 1).toUpperCase() + category.slice(1)}
              <span
                className={`${
                  category == selectedCategory
                    ? 'border-b-2 border-white h-1'
                    : 'hidden'
                }`}
              />
            </p>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
