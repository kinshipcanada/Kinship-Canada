import Navbar from '../components/Root/Navbar.js'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import Loader from '../components/Root/Loader'
import Link from 'next/link'


export default function Home() {

  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(null)

  const [subtotal, setSubtotal] = useState(0.00);
  const [eligible, setEligible] = useState(0.00);
  const [feesCovering, setFeesCovering] = useState(0.00)
  const [oneTime, setOneTime] = useState(0.00)
  const [recurringAmt, setRecurringAmt] = useState(0.00)

  useEffect(()=>{
    if (JSON.parse(localStorage.getItem('cart')) != null) {
      if (JSON.parse(localStorage.getItem('cart')).length == 0) {
        setEmpty(true)
        setLoading(false)
      } else {
        setCart(JSON.parse(localStorage.getItem('cart')));
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

          setSubtotal(subtotal + amount)
        }
        setLoading(false)
      }
    } else {
      setEmpty(true)
      setLoading(false)
    }
  },[])


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

  const removeFromCart = (obj, rec) => {
    setLoading(true)
    for (var i = 0; i < cart.length; i++) {
      if (cart[i]['id'] === obj) {
          if (cart[i]['recurring'] == rec) {
            cart.splice(i, 1)
          }
      }
    }
    setCart(cart)
    localStorage.setItem('cart', JSON.stringify(cart));
    setLoading(false);
  }




  return (
    <div>
      <Navbar />
      <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Donation Basket</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
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
                <li key={cause.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={cause.imageSrc}
                      alt={cause.imageAlt}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-md">
                            <p className="font-medium text-gray-700 hover:text-gray-800">
                              {cause.name} - {cause.region}
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
                          <button onClick = {()=>{removeFromCart(cause.id, cause.recurring)}} type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        {cause.recurring ?
                          <>
                          <ClockIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                            <span>Recurring Donation</span>
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

              <form onSubmit = {checkout}>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Eligible for tax receipt</dt>
                      <dd className="text-sm font-medium text-gray-900">${eligible.toFixed(2)}</dd>
                    </div>
                  </div>


                  <div className="border-t border-gray-200 pt-4">
                    <div className = 'flex items-center justify-between'>
                      <dt className="flex text-sm text-gray-600">
                        <span>Fees Covering</span>
                        <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Learn more about how tax is calculated</span>
                          <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">${feesCovering.toFixed(2)}</dd>
                    </div>
                    <div>
                      <input type = 'checkbox' id = 'fees_covering' className = 'rounded' onChange = {
                        (e) => {
                          let status = e.target.checked;
                          let amt
                          if (status) {
                            amt = 0.029*subtotal;
                          } else {
                            amt = 0.00
                          }

                          setFeesCovering(amt)

                        }  
                      }
                      />
                      <label className = 'text-sm text-gray-800 ml-2' htmlFor = 'fees_covering'>(Optional) Help Kinship Canada cover credit card processing fees</label>
                    </div>
                  </div>
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
              </form>
              
            }
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
    </div>
  )
}
