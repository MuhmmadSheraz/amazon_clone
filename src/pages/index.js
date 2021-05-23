import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Next JS StaterPack</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}
// ServeSide Rendering
export async function getServerSideProps(context) {
  let products = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
  return { props: { products } };
}
