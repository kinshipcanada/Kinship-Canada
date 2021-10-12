import Navbar from '../components/Root/Navbar.js'
import Link from 'next/link'
import { ExternalLinkIcon } from '@heroicons/react/solid'

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Donation Canceled</span>
                </h2>
                <p className="mt-4 text-2xl text-indigo-200">
                  If you change your mind, you can still access your cart. To manage recurring donations, log in <Link href = '/login'><a className = 'text-white font-bold'>here</a></Link>.
                </p>
                <div className = 'mt-8 flex flex-row'>
                  <Link href = '/cart'>
                    <button
                      type="button"
                      className="mr-4 inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Go to cart &rarr;
                    </button>
                  </Link>
                  <Link href = '/support'>
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Get support
                      <ExternalLinkIcon className="-mr-1 ml-3 h-5 w-5 text-gray-800" aria-hidden="true" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="-mt-8 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img
                className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-12 lg:translate-y-16 h-196"
                src="/campaigns/india-globe.png"
                alt="Globe"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

