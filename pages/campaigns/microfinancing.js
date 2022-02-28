import Navbar from '../../components/Root/Navbar.js'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Footer from '../../components/Root/Footer'
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid'

const stats = [
  { label: 'Businesses Founded', value: '20' },
  { label: 'Employees', value: '5' },
  { label: 'IDK some stat', value: '521' },
  { label: 'Raised', value: '$25M' },
]
const logos = [
  { name: 'Desk And Chair Foundation', url: '/campaigns/partner-logos/desk-and-chair-foundation.png' },
  { name: 'Kinship Canada', url: '/campaigns/partner-logos/kinship-canada.png' },
  { name: 'Laravel', url: 'https://tailwindui.com/img/logos/laravel-logo-gray-400.svg' },
  { name: 'StaticKit', url: 'https://tailwindui.com/img/logos/statickit-logo-gray-400.svg' },
  { name: 'Workcation', url: 'https://tailwindui.com/img/logos/workcation-logo-gray-400.svg' },
]

const causes = [
  {
    name: 'Hi'
  },
  {
    name: 'Hi'
  },
  {
    name: 'Hi'
  },
  {
    name: 'Hi'
  },
  {
    name: 'Hi'
  },
]


const actions = [
  {
    title: 'Tea Stall',
    href: '#',
    icon: ClockIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'Benefits',
    href: '#',
    icon: BadgeCheckIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'Schedule a one-on-one',
    href: '#',
    icon: UsersIcon,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  { title: 'Payroll', href: '#', icon: CashIcon, iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
  {
    title: 'Submit an expense',
    href: '#',
    icon: ReceiptRefundIcon,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    title: 'Training',
    href: '#',
    icon: AcademicCapIcon,
    iconForeground: 'text-blue-700',
    iconBackground: 'bg-blue-50',
  },
]

export default function Home() {

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
                    Kinship Microfinancing Campaign
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Provide loans to help people get on their feet. Help break the cycle of poverty.
                  </p>
                </div>
                <form action="#" className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="hero-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="hero-email"
                      type="text"
                      className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                      placeholder="Choose an amount"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      className="block w-full rounded-md border border-transparent px-5 py-3 bg-blue-600 text-base font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:px-10"
                    >
                      Donate
                    </button>
                  </div>
                </form>
                {/* <div className="mt-6">
                  <div className="inline-flex items-center divide-x divide-gray-300">
                    <div className="flex-shrink-0 flex pr-5">
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1 pl-5 py-1 text-sm text-gray-500 sm:py-3">
                      <span className="font-medium text-gray-900">Rated 5 stars</span> by over{' '}
                      <span className="font-medium text-blue-600">500 beta users</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
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
              <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                <img
                  className="ring-opacity-5 lg:w-auto lg:max-w-none h-96 -mt-20"
                  src="/campaigns/india-globe.png"
                  alt=""
                />
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
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/campaigns/microfinancing/sewing-machine.jpeg"
                    alt=""
                  />
                  {/* <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-600 opacity-90" /> */}
                  <div className="relative px-8">
                    <blockquote className="mt-8">
                      <div className="relative text-lg font-medium text-white md:flex-grow">
                        <svg
                          className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-50"
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
                        <p className="text-base font-semibold text-blue-200">Holy Qur&apos;an, 2:274</p>
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
                    Kinship Canada&apos;s microfinancing campaign aims to break the cycle of poverty by providing loans 
                    and mentorship to help those in need get businesses off the ground. When they are living comfortably, 
                    they will pay back the loan which will then be used to help others in the same position start businesses.
                  </p>
                  <p className="text-lg">
                    The loans come with both enough money to start the business, as well as guidance from established business 
                    owners and entrepreneurs, who help the donee as they take control of their life.
                  </p>
                </div>
              </div>

              {/* Stats section */}
              <div className="mt-10">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                      <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                      <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10">
                  <a href="#" className="text-base font-medium text-blue-600">
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
                  <a href="#" className="text-base font-medium text-blue-600">
                    Make a donation &rarr;
                  </a>
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                {logos.map((logo) => (
                  <div key={logo.name} className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <img className="max-h-12" src={logo.url} alt={logo.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="relative mt-12 sm:py-16">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className = 'grid grid-cols-1'>
              {
                causes.map((cause)=>(
                  <div key = {cause.name} className="bg-white overflow-hidden border rounded-lg divide-y divide-gray-200 mb-4">
                    <div className="px-4 py-5 sm:px-6">
                      {cause.name} needs ${cause.amount} for {cause.business_name}
                    </div>
                    <div className="px-4 py-5 sm:p-6">{/* Content goes here */}</div>
                    <div className="px-4 py-4 sm:px-6">
                      {/* Content goes here */}
                      {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
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
