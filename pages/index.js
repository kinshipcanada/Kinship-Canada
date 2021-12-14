import Navbar from '../components/Root/Navbar.js'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react';
import { ArrowRightIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { ChevronRightIcon, QuestionMarkCircleIcon, SpeakerphoneIcon } from '@heroicons/react/solid'
import ReactTooltip from 'react-tooltip';
import Footer from '../components/Root/Footer'
import Features from '../components/Site/Features'
import Loader from '../components/Root/Loader'
import Head from 'next/head'
import { fetchPostJSON } from '../lib/apiHelpers.ts';
import getStripe from '../lib/getStripe';
import { useRouter } from 'next/router'

const incentives = [
  {
    name: '100% of your donation goes to those who need it',
    description: "Kinship pays for any processing or bank fees out of pocket, unless you opt to contribute it.",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg',
  },
  {
    name: 'Download tax receipts from your dashboard',
    description: 'You can access and download CRA-eligible tax receipts from your dashboard.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg',
  },
  {
    name: 'Receive proof of donation on your dashboard',
    description: "You will receive proof of all donations you make.",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
]

export default function Home() {
  const base = 'Kinship Canada'
  const page = ''

  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const user = supabase.auth.user()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/quickCheckout', {
      amount: parseFloat(e.target.amount.value),
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

    setLoading(false);
  };

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
    let recurring = event.target.recurring.checked;
    let eligible; 
    let interval;

    if (eligibleInt == 1) {
      eligible = true;
    } else {
      eligible = false;
    }

    console.log(recurring)

    if (recurring) {
      interval = 'month'
    } else {
      interval = 'one-time'
    }

    let newItem = {
      id: causeToAddID,
      name: 'General Donation',
      amount: parseFloat(amountToAdd),
      eligible: eligible,
      recurring: recurring,
      interval: interval,
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
    setLoading(true)
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

  /* CHECK FOR PASSWORD RESET LINK */

  const router = useRouter()
  const query = router.query
  console.log(query)


  return (
    <div>
      <Head>
        <title>{base}{page}</title>
      </Head>
      <Banner />
      <Navbar/>

      <div className="relative bg-white overflow-hidden">
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
                  <Link href = '/campaigns/tuition'>
                    <a
                      href="#"
                      className="inline-flex items-center text-gray-800 bg-white rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-900 border hover:border-gray-600 transition duration-200"
                    >
                      <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-blue-600 rounded-full">
                        Campaign
                      </span>
                      <span className="ml-4 text-sm">View the Africa Tuition Campaign</span>
                      <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                    </a>
                  </Link>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-800 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">Charity in its purest essence</span>
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
                  <Link href = '/about'>
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      About Kinship
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="border bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <div className="px-4 py-8 sm:px-10">
                    <div>
                      <h2 className="text-lg font-medium text-gray-700">Quick General Donation</h2>
                      <p className = 'text-sm font-medium mt-3'>Use this form to make a quick general donation. If you have a specific cause you&apos;d like to contribute to, click <Link href = '/donate'><a className = 'text-blue-600'>here</a></Link>.</p>
                    </div>

                    <div className="mt-6 mb-6 relative">
                      <div className=" inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                    </div>

                    <div className="mt-6">
                      <form  onSubmit = {handleSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="name" className="sr-only">
                            Amount
                          </label>
                          <input
                            type="text"
                            id="amount"
                            placeholder="Amount to donate (CAD)"
                            required
                            className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <input
                          id="cause_id"
                          value="85228d9b-0a25-42ed-bc67-8e8c16210ddf"
                          hidden
                        />
                        <input
                          type = 'number'
                          id = 'eligible'
                          hidden
                          value = '1'
                        />
                        <input
                          type = 'number'
                          id = 'cause_name'
                          hidden
                          value = 'General Donation'
                        />
                        <div className="relative items-start flex">

                        
                        { user ?

                          <>
                            <div className="flex items-center h-5">
                              <input
                                id="recurring"
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
                            </>

                          :

                          <></>
                        }
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            {loading ? <span className = 'flex text-center justify-center items-center'><Loader />Redirecting you to checkout...</span> : 'Give general donation'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
                    {user ?
                    
                      <p className="text-xs leading-5 text-gray-500">
                        This form will take you directly to checkout.
                      </p>

                      :

                      <p className="text-xs leading-5 text-gray-500">
                        This form will take you directly to checkout. To be able to make recurring donations, please{' '}
                        <Link href = '/login'>
                          <a href="#" className="font-medium text-gray-900 hover:underline">
                            sign in
                          </a>
                        </Link>.
                      </p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    
    {/* INCENTIVES SECTION */}
    <div className="bg-gray-50">
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

      
      <Features />
      <div className = "flex justify-center">
        <p className = "text-sm font-medium">Live Chat Powered By: </p>
        <a href="https://www.livechat.com/"><img src="https://cdn.livechatinc.com/website/media/img/resources/logos/livechat-color.svg" alt="LiveChat" className = "w-48 h-24" /></a>
      </div>
      <Footer />
    </div>
  )
}





export const Banner = () => {

  const [hidden, setHidden] = useState(false);

  const checkStatus = () => {
    if (JSON.parse(localStorage.getItem('kinship_orphans_banner') != null)) {
      console.log("banner is hidden")
      setHidden(true)
    } else {
      console.log("banner is not hidden")
      setHidden(false)
    }
  }

  const hideBanner = () => {
    localStorage.setItem('kinship_orphans_banner', true)
    setHidden(true)
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <div className={hidden ? "hidden" : "bg-blue-600"}>
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-blue-800">
              <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">Donate To The 12 Orphans Campaign</span>
              <span className="hidden md:inline">Please contribute to our 12 Orphans Campaign in the name of Sayyida Fatema (A.S.).</span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link href = "/campaigns/orphans">
              <a
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
              >
                Learn more
              </a>
            </Link>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={() => {hideBanner()}}
              className="-mr-1 flex p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

