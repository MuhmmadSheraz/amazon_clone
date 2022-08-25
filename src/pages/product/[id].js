import { StarIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import { addToBasket } from '../../slices/basketSlice'
import { getProductsByCategory } from '../../slices/productsSlice'
import ProductCard from '../../components/ProductCard'
export default function Product({
  product: { id, image, title, description, category, price, rating },
}) {
  const roundedRating = Math.floor(rating.rate)
  const allProducts = useSelector(getProductsByCategory)
  const dispatch = useDispatch()
  const [productsbyCategory, setProductsByCategory] = useState([])
  const addItem = () => {
    const product = {
      id,
      title,
      image,
      description,
      price,
      category,
      rating,
      quantity: 1,
    }
    dispatch(addToBasket(product))
  }
  useEffect(() => {
    const data = allProducts.filter((prod) => prod.category == category)
    setProductsByCategory(data)
  }, [])

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl bg-gray-100  min-h-screen">
        <div className="w-full pt-4 pb-2 flex flex-col md:flex-row  items-center justify-start md:space-x-4 md:space-y-0 space-y-8">
          {/* Image */}
          <div className="relative h-[70vh] w-[100vw] md:w-[50vw] ">
            <Image
              layout="fill"
              src={image}
              alt={title}
              objectFit="scale-down"
            />
          </div>
          {/* Content */}
          <div className="md:self-start w-full px-4 md:px-0 md:w-1/2 space-y-4 lg:space-y-8">
            <h2 className=" text-2xl lg:text-3xl">{title}</h2>
            <h2 className=" text-lg">{description}</h2>
            <h2 className=" text-lg">
              <span className="underline mb-1">Category:</span> {category}
            </h2>
            <div className="flex items-center my-2">
              {Array(roundedRating)
                .fill(0)
                .map((_, i) => (
                  <StarIcon className=" h-5 text-yellow-500" key={i} />
                ))}
            </div>
            <h2 className=" text-lg">Review Count: {rating.count}</h2>
            <h2 className=" text-lg">
              Price: <span className="font-semibold">${price}</span>
            </h2>
            <button className="addButton mt-auto" onClick={addItem}>
              Add to basket
            </button>
          </div>
        </div>
        <div className="md:p-2 mt-4">
          <h1 className="font-semibold text-2xl md:text-3xl mx-4  md:mx-6">
            More Products in{' '}
            {category.slice(0, 1).toUpperCase() + category.slice(1)}
          </h1>
          <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
            {productsbyCategory?.map((product, i) => (
              <ProductCard product={product} key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
// ServeSide Rendering
export async function getServerSideProps(context) {
  let product = await fetch(
    `https://fakestoreapi.com/products/${context.query.id}`
  ).then((res) => res.json())

  return { props: { product } }
}
