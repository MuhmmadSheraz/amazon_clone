import Image from "next/image";
import React from "react";
import ProductCard from "./ProductCard";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto md:-mt-52  ">
      {products.slice(0, 4).map((product) => (
        <ProductCard product={product} />
      ))}
      <img
        src={"https://links.papareact.com/dyz"}
        className="md:col-span-full"
      />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
      {products.slice(5, products.length).map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}

export default ProductFeed;
