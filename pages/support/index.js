import Navbar from '../../components/Root/Navbar.js'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Footer from '../../components/Root/Footer'
import { Switch } from '@headlessui/react'
import Head from 'next/head'
import { fetchPostJSON } from '../../lib/apiHelpers';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

    const user = supabase.auth.user();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState(null)
    const [buttonMessage, setButtonMessage] = useState('Send support ticket')


    const submitTicket = async (e) => {
        e.preventDefault();
        
        const details = {
            email: email,
            phone: phoneNumber,
            message: message,
            first_name: firstName,
            last_name: lastName
        }

        response = 500;

        const response = await fetchPostJSON('/api/support', {
            details: details,
        });
    
        if (response.statusCode === 500) {
            setButtonMessage('Something went wrong. Please try again later')
            console.error(response.message);
            return;
        }
    
        if (response.statusCode == 200) {
            setButtonMessage('Sent, thanks!')

            if (user) {
                const { data, error } = await supabase
                    .from('tickets')
                    .insert([
                        { user: user.id, email: user.email, message: message, phone: phoneNumber, first_name: firstName, last_name: lastName }
                    ])
                
                if (error) {
                    setButtonMessage("Something went wrong. Please try again later.")
                } else {
                    setButtonMessage("Thanks! We'll get back to you shortly")
                }
    
            } else {
                const { data, error } = await supabase
                    .from('tickets')
                    .insert([
                        { email: email, message: message, phone: phoneNumber, first_name: firstName, last_name: lastName }
                    ])
    
                if (error) {
                    setButtonMessage("Something went wrong. Please try again later.")
                } else {
                    setButtonMessage("Thanks! We'll get back to you shortly")
                }
                
            }
        }
    };

    return (
    <div>
        <Head>
            <title>Kinship Canada · Get Support</title>
        </Head>
        <Navbar />
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
            <div className="relative max-w-xl mx-auto">
                <svg
                className="absolute left-full transform translate-x-1/2"
                width={404}
                height={404}
                fill="none"
                viewBox="0 0 404 404"
                aria-hidden="true"
                >
                <defs>
                    <pattern
                    id="85737c0e-0916-41d7-917f-596dc7edfa27"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                    >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <svg
                className="absolute right-full bottom-0 transform -translate-x-1/2"
                width={404}
                height={404}
                fill="none"
                viewBox="0 0 404 404"
                aria-hidden="true"
                >
                <defs>
                    <pattern
                    id="85737c0e-0916-41d7-917f-596dc7edfa27"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                    >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Get Support</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Want to ask about how your donations are sent or need help with tax receipts? Fill out this form and we&apos;ll get back to you as soon as we can.
                </p>
                </div>
                <div className="mt-12">
                <form onSubmit = {submitTicket} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        required
                        autoComplete="given-name"
                        onChange = {(e)=>{setFirstName(e.target.value)}}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                    </div>
                    </div>
                    <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        required
                        autoComplete="family-name"
                        onChange = {(e)=>{setLastName(e.target.value)}}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                    </div>
                    </div>
                    <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        defaultValue = {user ? user.email : ''}
                        autoComplete="email"
                        onChange = {(e)=>{setEmail(e.target.value)}}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                    </div>
                    </div>
                    <div className="sm:col-span-2">
                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                        Phone Number (optional)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                        <label htmlFor="country" className="sr-only">
                            Country
                        </label>
                        <select
                            id="country"
                            name="country"
                            className="h-full py-0 pl-4 pr-8 border-transparent bg-transparent text-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                            <option>CA</option>
                            <option>US</option>
                            <option>EU</option>
                        </select>
                        </div>
                        <input
                            type="text"
                            name="phone-number"
                            id="phone-number"
                            autoComplete="tel"
                            onChange = {(e)=>{setPhoneNumber(e.target.value)}}
                            className="py-3 px-4 block w-full pl-20 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                            placeholder="+1 (555) 987-6543"
                        />
                    </div>
                    </div>
                    <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <div className="mt-1">
                        <textarea
                        id="message"
                        name="message"
                        rows={4}
                        onChange = {(e)=>{setMessage(e.target.value)}}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                        defaultValue={''}
                        />
                    </div>
                    </div>
                    <div className="sm:col-span-2">
                    </div>
                    <div className="sm:col-span-2">
                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {buttonMessage}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>

      <Footer />
    </div>
  )
}
