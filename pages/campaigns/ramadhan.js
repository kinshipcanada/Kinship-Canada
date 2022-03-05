import Navbar from '../../components/Root/Navbar.js'
import Footer from '../../components/Root/Footer.js'
import Link from 'next/link'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { CameraIcon, CashIcon, DocumentDownloadIcon, DocumentIcon, DownloadIcon,ChevronDownIcon, MoonIcon, PlusCircleIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import { useEffect } from 'react'
import { Disclosure } from '@headlessui/react'

export default function Home() {

  const emptyCart = () => {
    localStorage.setItem('kinship_cart', JSON.stringify([]));
  }
  
  useEffect(()=>{
    emptyCart()
  })

  return (
    <div>
      <Head>
        <title>Kinship Canada · Ramadhan Campaign</title>
      </Head>
      <Navbar />
      <div className="relative mt-16">
        <div className="absolute inset-x-0 bottom-0 h-1/2" />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl brightness-50 blur-lg sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover brightness-50"
                src="/frontend/hunger.jpg"
                alt="Hunger"
              />
              <div className="absolute inset-0 bg-blue-100 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                
              <h1 className="text-center text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <MoonIcon className="w-4 h-4 mr-2" />
                    Ramadhan Campaign
                </span>
                <span className="block text-white">Hunger is not about a lack of food.</span>
                <span className="block text-white">It's a terrible injustice.</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                Donate today to help ensure that someone can keep one meal on the table. Donations will be sent on the 20th of Shabaan.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 sm:py-32 sm:px-2 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
            <div className="max-w-3xl">
              <h2 className="font-semibold text-gray-500">Where your donation goes</h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">What&apos;s actually included?</p>
              <p className="mt-4 text-gray-500">
                Amounts shown per region will provide a months worth of basic rations, including oil, flour, rice, and sugar. You can donate either the suggested amount or a custom amount. All donations are tax receipt eligible.
              </p>
            </div>

            <div className="space-y-16 pt-10 mt-10 border-t border-gray-200 sm:pt-16 sm:mt-16">
                <div
                  className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
                >
                  <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
                    <img src ="/regions/india.png" className="w-20 mb-3" />
                    <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        India.
                    </p>  
                    <p className="mt-4 text-md text-gray-500">The recommended amount is $100, which will allow a family of 5 to have at least one meal per day for a month.</p>
                  </div>
                  <div className="flex-auto lg:col-span-7 xl:col-span-8">

                    <div className="bg-white overflow-hidden shadow border rounded-lg divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6 text-semibold font-medium">
                        Make a donation in India
                    </div>
                    <div className="px-4 py-5 sm:p-6">

                        <div className='flex flex-col'>
                            <label htmlFor="india" className="block text-sm font-medium text-gray-700">
                                Choose an amount to donate (recommended: $100)
                            </label>
                            <div className="mt-2 relative rounded-md shadow-sm w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                type="text"
                                name="india"
                                id="india"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                defaultValue="100.00"
                                aria-describedby="price-currency"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    CAD
                                </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-3 flex justify-center text-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <PlusCircleIcon className="w-6 h-6 mr-2" />
                                Add Donation To Cart
                            </button>
                        </div>
                    </div>
                    </div>

                  </div>
                </div>
            </div>

            <div className="space-y-16 pt-10 mt-10 border-t border-gray-200 sm:pt-16 sm:mt-16">
                <div
                  className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
                >
                  <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
                    <img src ="/regions/africa.png" className="w-20 mb-3" />
                    <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Africa.
                    </p>  
                    <p className="mt-4 text-md text-gray-500">The recommended amount is $100, which will allow a family of 5 to have at least one meal per day for a month.</p>
                  </div>
                  <div className="flex-auto lg:col-span-7 xl:col-span-8">

                    <div className="bg-white overflow-hidden shadow border rounded-lg divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6 text-semibold font-medium">
                        Make a donation in Africa
                    </div>
                    <div className="px-4 py-5 sm:p-6">

                        <div className='flex flex-col'>
                            <label htmlFor="india" className="block text-sm font-medium text-gray-700">
                                Choose an amount to donate (recommended: $40)
                            </label>
                            <div className="mt-2 relative rounded-md shadow-sm w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                type="text"
                                name="india"
                                id="india"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                defaultValue="40.00"
                                aria-describedby="price-currency"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    CAD
                                </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-3 flex justify-center text-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <PlusCircleIcon className="w-6 h-6 mr-2" />
                                Add Donation To Cart
                            </button>
                        </div>
                    </div>
                    </div>

                  </div>
                </div>
            </div>


            <div className="space-y-16 pt-10 mt-10 border-t border-gray-200 sm:pt-16 sm:mt-16">
                <div
                  className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
                >
                  <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
                    <img src ="/regions/india.png" className="w-20 mb-3" />
                    <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        India.
                    </p>  
                    <p className="mt-4 text-md text-gray-500">The recommended amount is $100, which will allow a family of 5 to have at least one meal per day for a month.</p>
                  </div>
                  <div className="flex-auto lg:col-span-7 xl:col-span-8">

                    <div className="bg-white overflow-hidden shadow border rounded-lg divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6 text-semibold font-medium">
                        Make a donation in India
                    </div>
                    <div className="px-4 py-5 sm:p-6">

                        <div className='flex flex-col'>
                            <label htmlFor="india" className="block text-sm font-medium text-gray-700">
                                Choose an amount to donate (recommended: $100)
                            </label>
                            <div className="mt-2 relative rounded-md shadow-sm w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                type="text"
                                name="india"
                                id="india"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                defaultValue="100.00"
                                aria-describedby="price-currency"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    CAD
                                </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-3 flex justify-center text-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <PlusCircleIcon className="w-6 h-6 mr-2" />
                                Add Donation To Cart
                            </button>
                        </div>
                    </div>
                    </div>

                  </div>
                </div>
            </div>

            <div className="space-y-16 pt-10 mt-10 border-t border-gray-200 sm:pt-16 sm:mt-16">
                <div
                  className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
                >
                  <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
                    <img src ="/regions/india.png" className="w-20 mb-3" />
                    <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        India.
                    </p>  
                    <p className="mt-4 text-md text-gray-500">The recommended amount is $100, which will allow a family of 5 to have at least one meal per day for a month.</p>
                  </div>
                  <div className="flex-auto lg:col-span-7 xl:col-span-8">

                    <div className="bg-white overflow-hidden shadow border rounded-lg divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6 text-semibold font-medium">
                        Make a donation in India
                    </div>
                    <div className="px-4 py-5 sm:p-6">

                        <div className='flex flex-col'>
                            <label htmlFor="india" className="block text-sm font-medium text-gray-700">
                                Choose an amount to donate (recommended: $100)
                            </label>
                            <div className="mt-2 relative rounded-md shadow-sm w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                type="text"
                                name="india"
                                id="india"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                defaultValue="100.00"
                                aria-describedby="price-currency"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    CAD
                                </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-3 flex justify-center text-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <PlusCircleIcon className="w-6 h-6 mr-2" />
                                Add Donation To Cart
                            </button>
                        </div>
                    </div>
                    </div>

                  </div>
                </div>
            </div>
          </div>


          <div className = 'mt-8'>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  )
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const features = [
  {
    name: 'Receive your receipt',
    position: 1,
    icon: DocumentDownloadIcon,
    description:
      <>You&apos;ll receive an email soon with your tax receipt, some handy tips, and more. The email will come from noreply@kinshipcanada.com, but if you have any questions you can reach out to us at <Link href = 'mailto:support@kinshipcanada.com'><a className = 'text-blue-600 font-semibold'>support@kinshipcanada.com</a></Link></>,
    imageSrc: '/frontend/success-receipts.webp',
    imageAlt: 'Accounting image.',
  },
  {
    name: 'Money is sent',
    position: 2,
    icon: CashIcon,
    description:
      <>At this point, Kinship Canada will collect and send the funds to the person you are helping. If you made a custom donation that is less than the amount needed (for example, contributing $1000 toward a $5400 house), we will pool funds until we can send the full amount.</>,
    imageSrc: '/frontend/success-money.jpg',
    imageAlt: 'Money changing hands image.',
  },
  {
    name: 'Receive proof of your donation',
    position: 3,
    icon: CameraIcon,
    description:
      <>Lastly, when your donation has successfully been built or received, you&apos;ll receive proof of your donation, including pictures and receipts where applicable. You will receive proof by email, and can also view it in your <Link href = '/app/proof'><a className = 'text-blue-600 font-semibold'>dashboard</a></Link> if you logged in before making a donation.</>,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-04-detail-02.jpg',
    imageAlt: 'Proof of donation image.',
  },
]


