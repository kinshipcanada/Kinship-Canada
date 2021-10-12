import Navbar from '../components/Root/Navbar.js'
import Link from 'next/link'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { DownloadIcon } from '@heroicons/react/outline'

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative mt-16">
        <div className="absolute inset-x-0 bottom-0 h-1/2" />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                alt="People working on laptops"
              />
              <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Your Donation Succeeded.</span>
                <span className="block text-blue-200">Here&apos;s what you can expect next.</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                Kinship is putting together a package for you to receive proof and make getting a tax refund as easy as possible.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <a
                    href="#"
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 sm:px-8"
                  >
                    <DownloadIcon className = 'w-5 h-5 mr-2' />
                    Download Tax Receipt
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                  >
                    Go to dashboard &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 sm:py-32 sm:px-2 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
            <div className="max-w-3xl">
              <h2 className="font-semibold text-gray-500">Drawstring Canister</h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Use it your way</p>
              <p className="mt-4 text-gray-500">
                The Drawstring Canister comes with multiple strap and handle options to adapt throughout your day.
                Shoulder sling it, backpack it, or handy carry it.
              </p>
            </div>

            <div className="space-y-16 pt-10 mt-10 border-t border-gray-200 sm:pt-16 sm:mt-16">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
                >
                  <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                  </div>
                  <div className="flex-auto lg:col-span-7 xl:col-span-8">
                    <div className="aspect-w-5 aspect-h-2 rounded-lg bg-gray-100 overflow-hidden">
                      <img src={feature.imageSrc} alt={feature.imageAlt} className="object-center object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const features = [
  {
    name: 'Adventure-ready',
    description:
      'The Drawstring Canister is water and tear resistant with durable canvas construction. This bag holds up to the demands of daily use while keeping your snacks secure.',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-04-detail-03.jpg',
    imageAlt: 'Printed photo of bag being tossed into the sky on top of grass.',
  },
  {
    name: 'Minimal and clean',
    description:
      "Everything you need, nothing you don't. This bag has the simple, contemporary design that enables you to tell everyone you know about how essentialism is the only rational way to live life.",
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-04-detail-01.jpg',
    imageAlt: 'Double stitched black canvas hook loop.',
  },
  {
    name: 'Organized',
    description:
      'Never lose your snacks again with our patent-pending snack stash pocket system. With dedicated pouches for each of your snacking needs, the Drawstring Canister unlocks new levels of efficiency and convenience.',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-04-detail-02.jpg',
    imageAlt: 'Black canvas body with chrome zipper and key ring.',
  },
]


