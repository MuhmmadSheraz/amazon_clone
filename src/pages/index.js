import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";

export default function Home({ products, categories }) {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const fuse = new Fuse(products, {
    findAllMatches: true,
    shouldSort: true,
    minMatchCharLength: 3,
    keys: ["title"],
    includeScore: true,
  });
  const results = fuse.search(searchText);
  useEffect(() => {
    let array = results.map((item) => item.item);
    if (searchText === "") {
      return setFilteredProducts(products);
    }
    setFilteredProducts(array);
  }, [searchText]);
  const showByCategory = async (text) => {
    if (text === "all") {
      return setFilteredProducts(products);
    }
    console.log(products);
    const data = await fetch(
      `https://fakestoreapi.com/products/category/${text}`
    ).then((res) => res.json());
    setFilteredProducts(data);
  };
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>
      <Header
        setSearchText={setSearchText}
        searchText={searchText}
        categories={categories}
        showByCategory={showByCategory}
      />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={filteredProducts} />
      </main>
    </div>
  );
}
// ServeSide Rendering
export async function getServerSideProps(context) {
  let products = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  let categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());
  console.log(categories);

  return { props: { products, categories } };
}
