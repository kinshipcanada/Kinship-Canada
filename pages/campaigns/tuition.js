import Navbar from '../../components/Root/Navbar.js'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Footer from '../../components/Root/Footer'
import {
  AcademicCapIcon,
  ArrowCircleDownIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import { CheckCircleIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/solid'
import Loader from '../../components/Root/Loader'
import toast from 'react-hot-toast';
import Image from 'next/image'

const stats = [
  { label: 'Businesses Founded', value: '20' },
  { label: 'Students', value: '6' },
  { label: 'IDK some stat', value: '521' },
  { label: 'Raised', value: '$25M' },
]

const causes = [
  {
    id: 1,
    name: 'Anuary',
    age: 20,
    degree: "Communication Technology",
    college: "College of Business Education",
    city: "Mwanza",
    amount: 1800,
    blurb: "Anuary is a partially disabled 20 year old from Mwanza. He is currently helping his mother sell vegetables, but worked hard to gain acceptance to a diploma in Communication Technology at the College of Business Education in Mwanza.",
    looking_for: "Anuary is looking for a sponsorship for his 3-year diploma. A donation of $1800 would cover one year of tuition, hostel, and food.",
    covers: ["Tuition", "Hostel", "Food"]
  },


]

export default function Home() {
    
    // Initialize cart variable
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)

    // Fetch and fill cart
    useEffect(()=>{
		if (JSON.parse(localStorage.getItem('kinship_cart')) != null) {
		setCart(JSON.parse(localStorage.getItem('kinship_cart')))
		} 
	},[])

    const addToCart = (amount, causeId, causeName, eligibleVal, recurringVal, regionVal, intervalVal) => {

		try {
            let amountToAdd = amount;
            let causeToAddID = causeId;
            let causeToAddName = causeName;
            let eligible = eligibleVal; 
            let recurring = recurringVal;
            let region = regionVal;
            let interval = intervalVal

            let newItem = {
                id: causeToAddID,
                name: causeToAddName,
                amount: parseFloat(amountToAdd).toFixed(2),
                eligible: eligible,
                recurring: recurring,
                region: region,
                interval: intervalVal,
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

            return true
        } catch(e) {
            console.log(e)
            return false
        }
	}

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

  return (
    <div>
      <Navbar/>

      <div className = 'p-10'>
        
      <main>
        {/* Hero section */}
        <div className="overflow-hidden lg:relative">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="mt-20">
                <div>
                  <a href="#" className="inline-flex space-x-4">
                    <span className="font-semibold bg-blue-100 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-white border border-blue-600 border-2 text-blue-600 uppercase">
                      Campaign
                    </span>
                    <span className="font-semibold bg-green-50 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-white border border-green-600 border-2 text-green-600 uppercase">
                      <svg className="animate-ping delay-75 -ml-1 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                      Tax receipt eligible
                    </span>
                    <span className="inline-flex items-center text-sm font-medium text-blue-600 space-x-1">
                      {/* <span>Just shipped version 0.1.0</span> */}
                      {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
                    </span>
                  </a>
                </div>
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Kinship Africa Tuition Campaign
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Help deserving students cover their tuition and get their degrees.
                  </p>
                </div>
                <div className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                  <a href='#causes'>
                    <button
                      
                      type="submit"
                      className="block w-full rounded-md border border-transparent px-5 py-3 bg-blue-600 text-base font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:px-10"
                    >
                      <span className = 'flex justify-center items-center w-full'>
                        View Available Students
                        <ArrowCircleDownIcon className = 'ml-2 w-6 h-6'/>
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6 z-10">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                </svg>
              </div>
              <div className="relative z-10 pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12 z-10">
                <div className="ring-opacity-5 lg:w-auto lg:max-w-none h-96 -mt-40 z-10">
                  <img
                    src="/campaigns/india-globe.png"
                    priority='true'
                    alt="globe centered on africa"
                    loading='eager'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial/stats section */}
        <div className="relative mt-20">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
            <div className="relative sm:py-16 lg:py-0">
              <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
                <svg
                  className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
                </svg>
              </div>
              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                {/* Testimonial card*/}
                <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                  <img
                    className="absolute inset-0 h-full w-full object-cover opacity-50"
                    src="/campaigns/tuition/math.jpeg"
                    alt=""
                  />
                  {/* <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-600 opacity-90" /> */}
                  <div className="relative px-8">
                    <blockquote className="mt-8">
                      <div className="relative text-lg font-medium text-gray-800 md:flex-grow">
                        <svg
                          className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-800"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                        >
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="ml-6 relative">
                        Those who give their wealth by night and day, secretly and openly, they shall have their reward near their Lord, and they will have no fear, nor will they grieve.
                        </p>
                      </div>

                      <footer className="mt-4">
                        <p className="text-base font-semibold  text-gray-800">Holy Qur&apos;an, 2:274</p>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
              {/* Content area */}
              <div className="pt-12 sm:pt-16 lg:pt-20">
                <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                  Break the cycle of poverty
                </h2>
                <div className="mt-6 text-gray-500 space-y-6">
                    <p className="text-lg">
                        Kinship Canada&apos;s Africa tuition campaign aims to support deserving students enrolled in higher education programs
                        cover their tuition, food, and housing needs. 
                    </p>
                    <p className="text-lg">
                        We believe that the best way to break the cycle of poverty is to help provide those in need with the opportunities
                        needed to sustain themselves and their community.
                    </p>
                    <p className="text-lg">
                        These are students that have worked hard to be accepted into programs, and just need a bit of help to pay for the 
                        costs of attending.
                    </p>
                </div>
              </div>

              {/* Stats section */}
              <div className="mt-10">
                {/* <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                      <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                      <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{stat.value}</dd>
                    </div>
                  ))}
                </dl> */}
                <div className="mt-10">
                  <a href="#causes" className="text-base font-medium text-blue-600">
                    Make a donation &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud section */}
        <div className="mt-32">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Partners you can trust
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
                  Kinship works with partners on the ground to make sure your donation gets to those who need it most. Our partners find those in need on the ground and help them with your contribution - your donation has real impact on the ground breaking the cycle of poverty.
                </p>
                <div className="mt-6">
                  <a href="#causes" className="text-base font-medium text-blue-600">
                    Make a donation &rarr;
                  </a>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 flex justify-center items-center">
                <img
                    src = '/campaigns/tuition/partner-logos.png'
                    className = 'w-4/5 h-4/5'
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="relative mt-12 sm:py-16">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className = 'grid grid-cols-1' id = 'causes'>
              {
                causes.map((cause)=>(
                  <div key = {cause.id} className="bg-white overflow-hidden border rounded-lg divide-y divide-gray-200 mb-4">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className = "text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">{cause.name} needs ${cause.amount} for a diploma in {cause.degree}</h2>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className = 'text-lg font-medium flex items-center mb-1'>
                            <UserIcon className = 'w-5 h-5 text-blue-600 mr-2' />
                            About {cause.name}
                        </h3>
                        <p className = 'text-base'>{cause.blurb}</p>
                        <h3 className = 'text-lg font-medium mt-2 flex items-center mb-1'>
                            <AcademicCapIcon className = 'w-6 h-6 text-blue-600 mr-2' />
                            What {cause.name} is looking for
                        </h3>
                        {cause.looking_for}
                        <h3 className = 'text-lg font-medium mt-2'>What your donation will cover</h3>
                        <div className = ''>
                            {cause.covers.map((covered)=>(
                                <div key = {covered} className = 'flex items-center mt-1 mb-1'>
                                    <CheckCircleIcon className = 'w-5 h-5 text-green-600' />
                                    <span className = 'ml-2 text-base font-semibold'>{covered}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="px-4 py-4 sm:px-6">
                        <form action="#" className="sm:w-full sm:flex" onSubmit = {(e)=>{
                            e.preventDefault()
                            setLoading(true)

                            const name = "$" + e.target.amount.value + " to help " + cause.name + " pay for their education"
                            const status = addToCart(e.target.amount.value, cause.id, name, e.target.amount.value, false, null, null)

                            if (status == true) {
                                setLoading(false)
                                toast.success('Successfully added to cart', {position: 'top-right'})
                            } else {
                                toast.error("Something went wrong. We're on it", {position: 'top-right'})
                                setLoading(false)
                            }
                        }}>
                            <div className="min-w-0 flex-1">
                                <div className="relative rounded-md shadow-sm w-full">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="text"
                                        id="amount"
                                        required
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 px-5 py-3 border sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0.00"
                                        aria-describedby="price-currency"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm" id="price-currency">
                                            CAD
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-3">
                                <button
                                type="submit"
                                className="block w-full rounded-md border border-transparent px-5 py-2.5 bg-blue-600 text-base font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:px-10"
                                >
                                    {loading ? <Loader /> : <>Add To Basket &rarr;</>}
                                </button>
                            </div>
                        </form>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </main>

      </div>
      <Footer />
    </div>
  )
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
