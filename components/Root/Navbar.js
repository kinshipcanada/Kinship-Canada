import Link from 'next/link'
import { numItems, getCart } from '../../lib/functions'
import { supabase } from '../../lib/supabaseClient.js'
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
  ShoppingBagIcon,
  MailIcon,
  TicketIcon,
  SupportIcon,
  ArrowRightIcon,
} from '@heroicons/react/outline'
import { UserGroupIcon, GlobeIcon, CashIcon, MoonIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import getStripe from '../../lib/getStripe.js'
import { fetchPostJSON } from '../../lib/apiHelpers';
import { useRouter } from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const router = useRouter()
	const user = supabase.auth.user()

  const path = router.pathname

  const [numCart, setNumCart] = useState(0)
  const [gottenNum, setGottenNum] = useState(false)
  const [cart, setCart] = useState([])
  const [gottenCart, setGottenCart] = useState(false)

  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [empty, setEmpty] = useState(null)

  const [subtotal, setSubtotal] = useState(0.00);
  const [eligible, setEligible] = useState(0.00);
  const [oneTime, setOneTime] = useState(0.00)
  const [recurringAmt, setRecurringAmt] = useState(0.00)

  const calculateCart = (cart) => {

    setRecurringAmt(0.00)
    setOneTime(0.00)
    setSubtotal(0.00)
    setEligible(0.00)

    let eligibleToAdd = 0.00
    let oneTimeToAdd = 0.00
    let recurringToAdd = 0.00
    let subtotalToAdd = 0.00

    for (let i = 0; i < cart.length; i++) {

      let donation = cart[i]
      let amount = parseFloat(donation['amount'])

      if (cart[i]['recurring'] == true) {
        recurringToAdd += amount
      } else {
        oneTimeToAdd += amount
      }

      if (donation['eligible']) {
        eligibleToAdd += amount
        
      }

      subtotalToAdd += amount
    }


    setRecurringAmt(recurringToAdd)
    setSubtotal(subtotalToAdd)
    setOneTime(oneTimeToAdd)
    setEligible(eligibleToAdd)

  }

  useEffect(()=>{
    let cart = JSON.parse(localStorage.getItem('kinship_cart'))
    
    if (cart) {
      calculateCart(cart)
      getNumberOfItemsInCart()
      setCart(cart)
      setLoading(false)
    } else {
      setEmpty(true)
      getNumberOfItemsInCart()
      setLoading(false)
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheckoutLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout', {
      amount: subtotal,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id,
    });

    console.warn(error.message);
    setCheckoutLoading(false);
  };

  const checkout = async (event) => {

    const res = await fetch('/api/checkout_sessions', {
      body: JSON.stringify({
        name: subtotal,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    console.log(res)

  }

  const getNumberOfItemsInCart = () => {

    if (gottenNum) {
      let bruh = true;
    } else {
      let cart = JSON.parse(localStorage.getItem('kinship_cart'))
      if (cart) {
        if (path == '/success') {
          setCart([])
          setNumCart(0)
        } else {
          setNumCart(cart.length)
        }
      } else {
        setNumCart(0)
      }
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

  return (
    <Popover className="relative bg-white">
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10 border border-gray-300">
        <div className=''>
          <a href="#" className="flex items-center">
            <span className="sr-only">Kinship Canada</span>
            <img
              className="h-8 w-auto sm:h-10"
              loading='eager'
              src="/logo.png"
              alt=""
            />
            <Link href = 'https://hobble.notion.site/Kinship-Canada-Alpha-6bb80cea62754c62a8c87e34b13347db'>
              <span className="flex-shrink-0 ml-3 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800 border hover:bg-blue-200 border-blue-600 transition-200">
                Beta V0.2.8
              </span>
            </Link>
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
            
            <Link href="/donate">
	            <a className="text-base font-medium text-gray-500 hover:text-gray-900">
	              Make A Donation
	            </a>
            </Link>

            <Link href="/khums">
	            <a className="text-base font-medium text-gray-500 hover:text-gray-900">
	              Khums
	            </a>
            </Link>

            <Link href="/campaigns/ramadhan">
	            <a className="text-base font-medium text-gray-500 hover:text-gray-900">
	              Ramadhan
	            </a>
            </Link>
            
            <Campaigns />

            <Support />

            
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
                            <div className="flex items-center w-16 h-16 rounded-md ">
                              <div className = 'bg-blue-100  border-blue-600 rounded-lg p-2 border-2 text-blue-600'>
                                <CashIcon className = 'w-8 h-8' />
                              </div>
                            </div>
                            <div className="ml-2 flex-auto">
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
                          <span className = "flex items-center justify-center">
                            <ShoppingBagIcon className = 'w-5 h-5 mr-2'/>
                            View Donation Bag
                          </span>
                        </button>
                      </Link>

                      {/* <p className="mt-4 text-center">
                        <button
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                          onClick={handleSubmit}
                        >
                          {checkoutLoading ? <span className = 'flex text-center justify-center items-center'>Redirecting you to checkout<Loader /></span> : 'Checkout'}
                        </button>
                      </p> */}
                      </>
                      }
                    </form>
                  </Popover.Panel>
                </Transition>
              </Popover>

              {
        				user ?

          				<Link href='/app'>
          					<button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Dashboard
                    </button>
                	</Link>

        				:

        				<Link href='/login'>
        					<button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Login
                  </button>
              	</Link>
        			}
              
        			<Link href='/donate'>
        				<a className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
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
        <Popover.Panel className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="/logo.png"
                    alt="Kinship Canada"
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
                <Link href = '/support'>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Support
                  </a>
                </Link>

                <Link href = '/donate'>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Make Donation
                  </a>
                </Link>

                <Link href = '/login'>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Donor Dashboard
                  </a>
                </Link>

                {/* CAMPAIGN HOME PAGE COMING SOON */}
                <Link href = '/khums'>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Khums
                  </a>
                </Link>

                <Link href = '/khums'>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Ramadhan
                  </a>
                </Link>
                
                
              </div>
              <div className="mt-6">
                <Link href = '/cart'>
                  <a
                    href="#"
                    className="mb-2 w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cart
                  </a>
                </Link>
                <Link href = '/donate'>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Donate
                  </a>
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing donor?{' '}
                  <Link href = '/login'>
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Sign in
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}


import {
  PhoneIcon,
  PlayIcon,
} from '@heroicons/react/outline'
import Loader from './Loader'

const campaigns = [
  {
    name: 'Ramadhan Campaign',
    description: 'Help deserving students in Africa cover their tuition.',
    href: '/campaigns/ramadhan',
    icon: MoonIcon,
    ready: true
  },
  {
    name: 'Africa Tuition Campaign',
    description: 'Help deserving students in Africa cover their tuition.',
    href: '/campaigns/tuition',
    icon: GlobeIcon,
    ready: true
  },
  {
    name: '12 Orphans Campaign',
    description: 'Help support 12 deserving orphans this December',
    href: '/campaigns/orphans',
    icon: UserGroupIcon,
    ready: true
  },
  {
    name: 'Microfinancing Campaign',
    description: 'Break the cycle of poverty with microloans to get businesses off the ground.',
    href: '#',
    icon: CashIcon,
    ready: false
  },
]

const solutions = [
  {
    name: 'Send A Support Ticket',
    description: 'Get support from the Kinship team. We try to respond within 24 hours',
    href: '/support',
    icon: TicketIcon,
  },
  {
    name: 'Frequently Asked Questions',
    description: 'Questions we frequently get. If you have other questions, please send us a support ticket',
    href: '/support/faq',
    icon: SupportIcon,
  }
]
const callsToAction = [
  { name: 'Demo Coming Soon...', href: '#', icon: PlayIcon },
  { name: 'Email Kinship', href: 'mailto:info@kinshipcanada.com', icon: MailIcon },
]


export function Campaigns() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none'
            )}
          >
            <span>Campaigns</span>
            <ChevronDownIcon
              className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500')}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {campaigns.map((item) => {
                    
                    const [loading, setLoading] = useState(false);

                    return (
                      <Link href = {item.href} key = {item.name}>
                      <a
                        key={item.name}
                        href={item.href}
                        onClick = {()=>{setLoading(true)}}
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <item.icon className="flex-shrink-0 h-6 w-6 text-blue-600" aria-hidden="true" />
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900 flex items-center">
                            {item.name}
                            {
                              loading && item.ready ? 

                              <Loader />

                              :

                              null
                            }
                            {
                              item.ready ?

                              <></>

                              :

                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Coming Soon...
                              </span>
                            }
                          </p>
                          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        </div>
                      </a>
                    </Link>
                    )
                  })}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export function Support() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none '
            )}
          >
            <span>Get Support</span>
            <ChevronDownIcon
              className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500')}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {solutions.map((item) => (
                    <Link href = {item.href} key={item.name}>
                      <a
                        href={item.href}
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <item.icon className="flex-shrink-0 h-6 w-6 text-blue-600" aria-hidden="true" />
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">{item.name}</p>
                          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                  {callsToAction.map((item) => (
                    <div key={item.name} className="flow-root">
                      <a
                        href={item.href}
                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150"
                      >
                        <item.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">{item.name}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
