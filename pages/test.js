import Navbar from '../components/Root/Navbar.js'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ArrowRightIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { ChevronRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'
import ReactTooltip from 'react-tooltip';
import Footer from '../components/Root/Footer'

const incentives = [
  {
    name: '100% of your donation goes to those who need it',
    description: "Kinship pays for any processing or bank fees out of pocket",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg',
  },
  {
    name: 'Download tax receipts from your dashboard',
    description: 'You can access and download CRA-eligible tax receipts from your dashboard',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg',
  },
  {
    name: 'Receive proof of donation ony our dashboard',
    description: "You will receive proof (including pictures) of all donations you make",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
]

export default function Home() {

  const [cart, setCart] = useState([])

  useEffect(()=>{
    if (JSON.parse(localStorage.getItem('kinship_cart')) != null) {
      setCart(JSON.parse(localStorage.getItem('kinship_cart')))
    } 
  },[])

  const checkForItem = (a, obj, rec) => {
    for (var i = 0; i < a.length; i++) {
      if (a[i]['id'] === obj) {
          if (a[i]['recurring'] == rec) {
            return true;
          }
      }
    }
    return false;
  }

  const addToCart = (event) => {
    event.preventDefault();

    let amountToAdd = event.target.amount.value;
    let causeToAddID = event.target.cause_id.value;
    let causeToAddName = event.target.cause_name.value;
    let eligibleInt = parseInt(event.target.eligible.value);
    let recurringValue = event.target.recurring.checked;

    let eligible; 
    let recurring;

    if (eligibleInt == 1) {
      eligible = true;
    } else {
      eligible = false;
    }

    if (recurringValue) {
      recurring = true;
    } else {
      recurring = false;
    }

    let newItem = {
      id: causeToAddID,
      name: causeToAddName,
      amount: parseFloat(amountToAdd),
      eligible: eligible,
      recurring: recurring,
    }

    let state = checkForItem(cart, causeToAddID, recurring)

    if (state == false) {
      cart.push(newItem);
    } else {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i]['id'] === newItem['id']) {
          cart[i]['amount'] = (parseFloat(cart[i]['amount']) + parseFloat(amountToAdd));
        }
      }
    }

    setCart(cart)
    localStorage.setItem('kinship_cart', JSON.stringify(cart));

  }

  const removeFromCart = (obj, rec) => {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i]['id'] === obj) {
          if (cart[i]['recurring'] == rec) {
            cart.splice(i, 1)
          }
      }
    }
    setCart(cart)
    localStorage.setItem('kinship_cart', JSON.stringify(cart));
  }
  return (
    <div>
      <Navbar/>


      <div className="relative bg-gray-100 overflow-hidden">
      <div className="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="currentColor" />
            </pattern>
          </defs>
          <rect width={364} height={384} fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        

        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <a
                    href="#"
                    className="inline-flex items-center text-gray-800 bg-white rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-900 border"
                  >
                    <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-blue-600 rounded-full">
                      Campaign
                    </span>
                    <span className="ml-4 text-sm">View the Muharram Campaign</span>
                    <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                  </a>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-800 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">Charity in it&apos;s purest essence</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    All proceeds go directly to those who need it - Kinship pays any fees involved. Manage your tax receipts, get proof of donation, and more.
                  </p>
                  <Link href = '/donate'>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Make a donation <ArrowRightIcon className = 'ml-2 w-5 h-5' />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="border bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <div className="px-4 py-8 sm:px-10">
                    <div>
                      <h2 className="text-lg font-medium text-gray-700">Quick General Donation</h2>
                      <p className = 'text-sm font-medium mt-3'>Use this form to make a quick general donation. If you have a specific cause you&apos;d like to contribute to, click <Link href = '/donate'>here</Link>.</p>
                    </div>

                    <div className="mt-6 mb-6 relative">
                      <div className=" inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                    </div>

                    <div className="mt-6">
                      <form action="#" method="POST" className="space-y-6">
                        <div>
                          <label htmlFor="name" className="sr-only">
                            Amount
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            placeholder="Amount to donate (CAD)"
                            required
                            className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="recurring"
                              aria-describedby="candidates-description"
                              name="candidates"
                              type="checkbox"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="recurring" className="font-medium text-gray-700 flex">
                              Make this a monthly donation{' '}
                              <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"  data-tip="This donation will be made each month automatically. You can manage your recurring donations in your dashboard">
                                <span className="sr-only">Learn more about how tax is calculated</span>
                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                              </a>
                              <ReactTooltip place="top" type="dark" effect="float"/>
                            </label>
                            <span id="" className="text-gray-500 flex flex-row">
                              <span className="sr-only">Make this a monthly donation 
                              </span>
                              
                            </span>

                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Give general donation
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500">
                      This form will take you directly to checkout. To be able to manage recurring donations, please{' '}
                      <a href="#" className="font-medium text-gray-900 hover:underline">
                        sign in
                      </a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    
    {/* INCENTIVES SECTION */}
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 sm:px-2 sm:py-24 lg:px-4">
        <div className="max-w-2xl mx-auto px-4 grid grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3">
          {incentives.map((incentive) => (
            <div key={incentive.name} className="text-center sm:flex sm:text-left lg:block lg:text-center">
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <img className="w-28 h-24 mx-auto" src={incentive.imageSrc} alt="" />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


      <h1 className = 'font-bold text-2xl'>Kinship Canada</h1>
      <Link href = '/donate'><a>Donate</a></Link>
      <form onSubmit = {addToCart}>
        <input 
          type='text'
          id='amount'
          placeholder='amount'
          className='border border-gray-600 p-2'
        />
        <input
          type = 'text'
          id = 'cause_id'
          hidden
          value = '882s-ash2-asdas'
        />
        <input
          type = 'text'
          id = 'cause_name'
          hidden
          value = 'Donation In Syria'
        />
        <input
          type = 'number'
          id = 'eligible'
          hidden
          value = '1'
        />
        <input
          type = 'checkbox'
          id = 'recurring'
        />
        <label htmlFor = 'recurring'>Recurring?</label>
        <input
          type='submit'
          className='p-2 bg-blue-600 text-white'
          value='donate'
        />
      </form>
      
      <div>
        {cart.map((item)=>(
          <div key = {item.id}>
            <p>Name: {item.name}</p>
            <p>Amount: {item.amount}</p>
            <p>Recurring: {item.recurring ? 'True' : 'False'}</p>
            <button className = 'p-2 bg-blue-600 text-white' onClick={()=>{removeFromCart(item.id, item.recurring)}}>Remove</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}


