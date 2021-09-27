import Link from 'next/link'
import { numItems, getCart } from '../../lib/functions'
import { supabase } from '../../lib/supabaseClient.js'
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
  ShoppingBagIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
	const user = supabase.auth.user()
  const [numCart, setNumCart] = useState(0)
  const [gottenNum, setGottenNum] = useState(false)
  const [cart, setCart] = useState([])
  const [gottenCart, setGottenCart] = useState(false)

  const getNumberOfItemsInCart = () => {

    if (gottenNum) {
      let bruh = true;
    } else {
      let num = numItems(JSON.parse(localStorage.getItem('kinship_cart')))
      setNumCart(num);
      setGottenNum(true)
    }
    
  }

  const getCartDetails = () => {
    if (gottenCart) {
      let bruh = true;
    } else {
      let cart = getCart(JSON.parse(localStorage.getItem('kinship_cart')))
      setCart(cart)
      setGottenCart(true)
    }
  }

  useEffect(()=>{
    getNumberOfItemsInCart()
    getCartDetails()
  })

  return (
    <Popover className="relative bg-white">
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10 border border-gray-300">
        <div>
          <a href="#" className="flex">
            <span className="sr-only">Kinship Canada</span>
            <img
              className="h-8 w-auto sm:h-10"
              src="/logo.png"
              alt=""
            />
          </a>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none ">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
          <Popover.Group as="nav" className="flex space-x-10">
          	<Link href="/">
	            <a className="text-base font-medium text-gray-500 hover:text-gray-900">
	              Home
	            </a>
            </Link>
            
            <Link href="/khums">
	            <a className="text-base font-medium text-gray-500 hover:text-gray-900">
	              Khums Donations
	            </a>
            </Link>

            <Link href="/support">
	            <a className="text-base font-medium text-gray-500 hover:text-gray-900">
	              Support
	            </a>
            </Link>
            
            <Link href="https://hobble.notion.site/Improvements-0c3c044ed21241dd8a124927b68c846e">
	            <a className="text-base font-medium text-gray-500 hover:text-gray-900">
	              Improvements
	            </a>
            </Link>
            
          </Popover.Group>
          <div className="flex items-center md:ml-12">
            <Popover className="mr-4 flow-root text-sm lg:relative lg:ml-8 focus:outline-none">
                <Popover.Button className="group -m-2 p-2 flex items-center focus:outline-none">
                  <ShoppingBagIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-base font-medium text-gray-500">{numCart}</span>
                  <span className="sr-only">items in cart, view bag</span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute z-10  top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                    <h2 className="sr-only">Shopping Cart</h2>

                    <form className="max-w-2xl mx-auto px-4">
                      {
                        numCart == 0 ?

                        <p className = 'mt-6'>Your cart is empty. Click <Link href = '/donate'><a className = 'font-semibold text-blue-600'>here</a></Link> to donate.</p>

                        :
                        
                        <>
                        <ul role="list" className="divide-y divide-gray-200">
                        {cart.map((product) => (
                          <li key={product.id} className="py-6 flex items-center">
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="flex-none w-16 h-16 rounded-md border border-gray-200"
                            />
                            <div className="ml-4 flex-auto">
                              <h3 className="font-medium text-gray-900">
                                <p>{product.name}</p>
                              </h3>
                              <p className="text-gray-500">{product.amount} · {product.recurring && product.interval == 'year' ? 'Annual' : product.recurring && product.interval == 'month' ? 'Monthly' : 'One Time'} </p>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <Link href = '/cart'>
                        <button
                          className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          Checkout
                        </button>
                      </Link>

                      <p className="mt-4 text-center">
                        <Link href = '/cart'>
                          <a className="text-sm font-medium text-blue-600 hover:text-blue-500">
                            View Donation Bag
                          </a>
                        </Link>
                      </p>
                      </>
                      }
                    </form>
                  </Popover.Panel>
                </Transition>
              </Popover>

              {
        				user ?

          				<Link href='/app'>
          					<a className="text-base font-medium text-gray-500 hover:text-gray-900">
    		              Dashboard
    		            </a>
                	</Link>

        				:

        				<Link href='/login'>
        					<a className="text-base font-medium text-gray-500 hover:text-gray-900">
  		              Login
  		            </a>
              	</Link>
        			}
        			<Link href='/donate'>
        				<a className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
  	              Donate
  	            </a>
        	    </Link>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-6">
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Pricing
                </a>

                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Docs
                </a>

                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Enterprise
                </a>
                
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
