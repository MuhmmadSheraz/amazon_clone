import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import confetti from 'canvas-confetti'
function success() {
  const router = useRouter()
  useEffect(() => {
    if (router.query.id) {
      confetti({
        particleCount: 500,
        startVelocity: 30,
        spread: 1000,
      })
    } else {
      router.push('/404')
    }
  }, [])

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="flex justify-center items-center h-[90vh]">
        <div className="flex flex-col justify-center items-center  space-y-3 p-5 px-10 bg-white mx-auto h-[30vh]">
          <div className="flex items-center">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h2 className="text-xl md:text-3xl">
              Thank you,Your Order has been confirmed!
            </h2>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic dolor
            dolore deleniti inventore tenetur ea eius ex, quidem aperiam,
            deserunt, ipsum quaerat soluta praesentium esse?
          </p>
          <div className="w-full space-x-7">
            <button
              className="addButton w-full"
              onClick={() => router.push('/orders  ')}
            >
              Go to My Orders
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default success
