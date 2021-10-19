import Navbar from '../components/Root/Navbar.js'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid'
import React, { useState, useEffect } from 'react'
import Loader from '../components/Root/Loader'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip';
import getStripe from '../lib/getStripe.js'
import { fetchPostJSON } from '../lib/apiHelpers';
import { supabase } from '../lib/supabaseClient';
import Footer from '../components/Root/Footer'
import { FingerPrintIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'

export default function Cart() {

  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState([])
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [empty, setEmpty] = useState(null)
  const [error, setError] = useState(null)

  const [subtotal, setSubtotal] = useState(0.00);
  const [eligible, setEligible] = useState(0.00);
  const [feesCovering, setFeesCovering] = useState(0.00)
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
  useEffect(async ()=>{
    let cart = JSON.parse(localStorage.getItem('kinship_cart'))
    
    if (cart) {
      calculateCart(cart)
      setCart(cart)
      setLoading(false)
    } else {
      setEmpty(true)
      setLoading(false)
    }

    const user = supabase.auth.user()

    if (user) {
      const profile = await supabase
			  .from('profiles')
			  .select()
			  .eq('id', user.id)

			if (profile) {
				setProfile(profile.data[0])
			} else {
				setProfile([])
			}

    } else {
      setProfile([])
    }
  },[])

  const checkForRecurring = () => {
    // Check if a user is logged in
    const user = supabase.auth.user()

    if (recurringAmt > 0.00) {
      if (user) {
        return true
      } else {
        false
      }
    } else {
      return true
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheckoutLoading(true);

    const valid = checkForRecurring()
    const user = supabase.auth.user()

    if (valid) {
      if (recurringAmt == 0) {
        const response = await fetchPostJSON('/api/oneTimeCheckout', {
          details: cart,
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


      } else {
        const response = await fetchPostJSON('/api/recurringCheckout', {
          details: cart,
          user_id: user.id,
          profile: profile,
          email: user.email
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
      }

      
    } else {
      setError(<><p>Please log in to make a recurring donation. This is so that you can manage and access this donation in the future.</p><Link href = '/login'><button
      type="button"
      className="mt-4 w-full flex justify-center items-center text-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Click here to log in
    </button></Link></>)
    }
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

  const removeFromCart = (obj, rec, id) => {
    setLoading(true)
    let item = document.getElementById(id);
    for (var i = 0; i < cart.length; i++) {
      if (cart[i]['id'] === obj) {
          if (cart[i]['recurring'] == rec) {
            cart.splice(i, 1)
          }
      }
    }
    setCart(cart)
    localStorage.setItem('kinship_cart', JSON.stringify(cart));
    item.classList.add('hidden')
    calculateCart(cart)
    setError(null)
    setLoading(false);
  }




  return (
    <div>
      {console.log(profile)}
      <Navbar />
      <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Donation Basket</h1>
        <form method = 'POST' action = '/api/checkout_sessions' className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your Donation Basket
            </h2>
            {
              loading ?

              <div className = 'flex justify-center'>
                <Loader />
              </div>

              :

              empty ?

              <p>Your cart is empty. Click <Link href = '/donate'><a className = 'text-blue-600'>here</a></Link> to donate.</p>

              :

              <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {cart.map((cause, causeIdx) => (
                <li key={cause.id} id = {cause.id + '_' + cause.recurring + '_' + cause.region} className="flex py-6 sm:py-10">
                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-md">
                            <p className="font-medium text-gray-700 hover:text-gray-800">
                              {cause.name}{cause.region ? <> - {cause.region}</> : <></>}
                            </p>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{cause.color}</p>
                          {cause.size ? (
                            <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{cause.size}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{cause.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${causeIdx}`} className="sr-only">
                          Quantity, {cause.name}
                        </label>

                        <p className = 'text-base font-medium text-gray-700'>${cause.amount}</p>
                        

                        <div className="absolute top-0 right-0">
                          <button onClick = {()=>{
                            let id = cause.id + '_' + cause.recurring + '_' + cause.region;
                            removeFromCart(cause.id, cause.recurring, id)
                            toast.success("Removed donation for " + cause.name + " from cart", {position: 'top-right'})
                          }} type="button" className="inline-flex text-gray-400 hover:text-gray-500 flex items-center">
                            <span className="">Remove</span>
                            <span className = 'ml-2 p-1 bg-gray-50 rounded'>
                              <XIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        {cause.recurring ?
                          <>
                            <>
                              <ClockIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                              <span>Recurring Donation - Renews Every {cause.interval == 'year' ? 'Year' : cause.interval == 'month' ? 'Month' : cause.interval}</span>
                            </>
                            <span data-tip="Experimental feature" className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Beta
                            </span>
                            <ReactTooltip place="top" type="dark" effect="float"/>
                          </>

                          :

                          <>
                          <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                            <span>One Time Donation</span>
                          </>
                        }
                      </p>
                      <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        {cause.eligible ?
                          <>
                          <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                            <span>Eligible to receive a tax receipt</span>
                          </>

                          :

                          <></>
                        }
                      </p>
                    </div>
                    
                  </div>
                </li>
              ))}
            </ul>
            }
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            {
              loading ?

              <div className = 'flex justify-center'>
                <Loader />
              </div>

              :

              empty ?
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex text-sm text-gray-600">
                      <span>Fees Covering</span>
                      <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Learn more about how tax is calculated</span>
                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Donation Basket Is Empty:</dt>
                    <dd className="text-base font-medium text-gray-900">$0.00</dd>
                  </div>
                </dl>

              :

              <div>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${subtotal}</dd>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Eligible for tax receipt</dt>
                      <dd className="text-sm font-medium text-gray-900">${eligible}</dd>
                    </div>
                  </div>

                  {/* FEES COVERING SECTION TO BE ADDED LATER */}
                  {/* <div className="border-t border-gray-200 pt-4">
                    <div className = 'flex items-center justify-between'>
                      <dt className="flex text-sm text-gray-600">
                        <span>Fees Covering</span>
                        <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"  data-tip="Kinship pays for all expenses out of pocket, including credit card processing fees. If you'd like, you can also cover processing fees for us.">
                          <span className="sr-only">Learn more about how tax is calculated</span>
                          <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">${feesCovering.toFixed(2)}</dd>
                    </div>
                    <div>
                      <input type = 'checkbox' id = 'fees_covering' className = 'rounded' onChange = {
                        (e) => {
                          let status = e.target.checked;
                          let amt
                          if (status) {
                            let obj = JSON.parse(localStorage.getItem('cart'));
                            let subtotalAmt = 0.00; 

                            for (let i = 0; i < obj.length; i++) {
                              let recurringVal = obj[i]['recurring'];
                              let amount = obj[i]['amount'];
                              let eligibleVal = obj[i]['eligible'];

                              if (eligibleVal) {
                                setEligible(eligible + amount);
                              }

                              subtotalAmt += amount;

                              if (recurringVal) {
                                setRecurringAmt((1.029*recurringAmt) + amount)
                              } else {
                                setOneTime((1.029*oneTime) + amount)
                              }

                            }

                            setFeesCovering(0.029*subtotalAmt);


                          } else {
                            let amt = 0.00
                            let obj = JSON.parse(localStorage.getItem('cart'));

                            for (let i = 0; i < obj.length; i++) {
                              let recurringVal = obj[i]['recurring'];
                              let amount = obj[i]['amount'];
                              let eligibleVal = obj[i]['eligible'];

                              if (eligibleVal) {
                                setEligible(eligible + amount);
                              }

                              if (recurringVal) {
                                setRecurringAmt(recurringAmt + amount)
                              } else {
                                setOneTime(oneTime + amount)
                              }

                            }
                            setFeesCovering(amt)
                          }


                        }  
                      }
                      />
                      <label className = 'text-sm text-gray-800 ml-2' htmlFor = 'fees_covering'>(Optional) Help Kinship Canada cover credit card processing fees</label>
                    </div>
                  </div> */}
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Donation Total:</dt>
                    <dd className="text-base font-medium text-gray-900">
                      {
                        oneTime == 0.00 ?

                        <></>

                        :

                        <p>${oneTime} one time payment</p>
                      } 
                      {' '}
                      {
                        recurringAmt == 0.00 ?

                        <></>

                        :

                        <p>${recurringAmt} recurring</p>
                      }
                    </dd>
                  </div>
                </dl>
              </div>
              
            }
            <div className="mt-6" onClick={handleSubmit}>
              <button
                type = 'submit'
                className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
              >
                {checkoutLoading ? <span className = 'flex w-full text-center justify-center'><Loader /></span> : 'Checkout'}
              </button>
            </div>
            {error ?
              <p className = 'text-center mt-4 text-red-600 font-semibold'>{error}</p>

              :

              <></>
            }
          </section>
        </form>
      </div>
    </div>
      <Footer />
    </div>
  )
}
