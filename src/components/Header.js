import React from "react";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { cartItem } from "../slices/basketSlice";
import { useSelector } from "react-redux";
function Header({ setSearchText, searchText }) {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(cartItem);

  return (
    <header>
      <div className="bg-amazon_blue flex flex-grow p-2">
        <div className=" flex items-center flex-grow sm:flex-grow-0 mt-2">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer active:transform active:scale-90"
          />
        </div>
        <div className="bg-yellow-400 flex-grow items-center h-10 hidden sm:flex rounded-md cursor-pointer hover:bg-yellow-500">
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setSearchText(e.target.value)}
            className="w-6 flex-grow p-2 rounded-l-md focus:outline-none whitespace-nowrap flex-shrink"
          />
          <SearchIcon
            className="h-12 p-4"
            onClick={() => console.log(searchText)}
          />
        </div>
        <div className="flex text-white text-xs md:space-x-6 space-x-3  mx-6  whitespace-nowrap ">
          <div className="link" onClick={!session ? signIn : signOut}>
            <p data-tip="SignOut">{!session ? "Sign In" : session.user.name}</p>

            {!session && (
              <ReactTooltip place="bottom" type="warning" effect="solid" />
            )}

            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </div>
          <div className="link">
            <p>Returns </p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            className="relative flex items-center link"
            onClick={() => router.push("/checkout")}
          >
            <span className="bg-yellow-400 rounded-md text-black absolute top-0 -right-2 h-4 px-1 text-center font-bold md:right-10">
              {items?.length}
            </span>
            <ShoppingCartIcon className="h-6 " />
            <p className="font-extrabold md:text-sm hidden md:inline">Basket</p>
          </div>
        </div>
      </div>
      <div className="bg-amazon_blue-light text-white flex space-x-3 p-2 pl-6 text-xs sm:text-sm whitespace-nowrap ">
        <p className="link flex items-center">
          <MenuIcon className="h-3 sm:h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Foods & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
