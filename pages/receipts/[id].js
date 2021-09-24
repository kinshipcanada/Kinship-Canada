import Loader from '../../components/Root/Loader.js'
import Head from 'next/head'

import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import {
    PrinterIcon,
    DownloadIcon
} from '@heroicons/react/outline'

export default function Receipt(props) {

    const [loading, setLoading] = useState(true)
    const [receipt, setReceipt] = useState(null)
    const [id, setId] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter();
    const ref = router.query.id;
    // FIX TO PASS VARIABLE UUID

    const fetchReceipt = async (reference) => {
        
        const { data, error } = await supabase
            .from('ayn')
            .select()
            .eq('id', reference)
        
        if(error) {
            console.log(error.message)
            setError(error.message)
            setLoading(false)
        } else {
            setReceipt(data[0])
            setLoading(false)
        }
    }

    const downloadReceipt = async (event) => {
        
        event.preventDefault();

        router.push('https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/receipts/' + ref + '.png');
        
    }

    const printReceipt = async (event) => {

        event.preventDefault()

        window.open('https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/receipts/' + ref + '.png').print()
    }

    const fetchId = () => {
        setId(ref)
    }

    useEffect(()=>{

        fetchId()
        
        if (ref) {
            fetchReceipt(ref)
        } else {
            setLoading(true)
        }

    },[id])

    if (loading) {
        return (
            <div className = 'w-screen h-screen flex items-center justify-center'>
                <Loader />
            </div>
        )
    } else {
        if (error) {
            return (
                <p>
                    Something went wrong in fetching the receipt. Please try again in 5 minutes. If the issue persists, contact us at info@kinshipcanada.com
                </p>
            )
        } else {
            return (
                <div className = 'w-screen h-screen bg-gray-50 sm:p-12 p-8'>
                    <div className="md:flex md:items-center md:justify-between flex">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{receipt.name}'s receipt from {receipt.date}</h2>
                        </div>
                        <div className="sm:mt-4 flex md:mt-0 md:ml-4">
                            <form onSubmit={downloadReceipt}>
                                <button
                                    type='submit'
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Download
                                    <DownloadIcon className = 'ml-1 w-4 h-4'/>
                                </button>
                            </form>
                            <form onSubmit={downloadReceipt}>
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                
                                >
                                    Print
                                    <PrinterIcon className = 'ml-1 w-4 h-4'/>
                                </button>
                            </form>
                        </div>
                    </div>

                    <main className="mt-8 bg-white overflow-hidden border border-gray-400 rounded-lg divide-y divide-gray-300">
                    <div className="px-4 py-5 sm:px-6">
                        <h1 className = 'text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate mb-2'>Your Kinship Canada Tax Receipt</h1>
                        <p className="font-medium text-gray-700 mb-1">Kinship Canada is a registered charity</p>
                        <p className="font-medium text-gray-700">Registration Number 855070728 RR 0001</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <p className="font-medium text-gray-800 mb-2">Thank you for donating with Kinship Canada. This is your CRA-Eligible Tax Receipt. You donated a total amount of ${receipt.amount} CAD.</p>
                        <span className = 'flex mb-1'>
                            <p  className="font-bold text-gray-800  mr-1">Kinship Receipt ID:</p> 
                            <p className="font-medium text-gray-800">{receipt.id}</p>
                        </span>
                        <span className = 'flex mb-1'>
                            <p  className="font-bold text-gray-800 mr-1">Location Issued: </p>
                            <p className="font-medium text-gray-800 mb-1">43 Matson Drive, Bolton, Ontario, L7E0B1, Canada</p>
                        </span>

                        <h2 className="mb-2 mt-3 text-md font-bold leading-7 text-gray-900 sm:text-lg sm:truncate">Donor Details</h2>
                        <span className = 'flex mb-1'>
                            <p  className="font-bold text-gray-800 mr-1">Donor Name: </p>
                            <p className="font-medium text-gray-800 mb-1">{receipt.name}</p>
                        </span>
                        <span className = 'flex mb-1'>
                            <p  className="font-bold text-gray-800 mr-1">Donor Address: </p>
                            <p className="font-medium text-gray-800 mb-1">{receipt.address.trim() + ', ' + receipt.city + ', ' + receipt.state + ', ' + receipt.country}</p>
                        </span>

                        <h2 className="mb-2 mt-3 text-md font-bold leading-7 text-gray-900 sm:text-lg sm:truncate">Donation Details</h2>
                        <span className = 'flex mb-1'>
                            <p  className="font-bold text-gray-800 mr-1">Total Amount Donated:</p>
                            <p className="font-medium text-gray-800 mb-1">${receipt.amount}</p>
                        </span>
                        <span className = 'flex mb-1'>
                            <p  className="font-bold text-gray-800 mr-1">Causes: </p>
                            <p className="font-medium text-gray-800 mb-1">{receipt.causes.map((cause)=>(<div>{cause}</div>))}</p>
                        </span>
                        <span className = 'flex mb-1'>
                            <p  className="font-bold text-gray-800 mr-1">Total Amount Eligible: </p>
                            <p className="font-medium text-gray-800 mb-1">${receipt.eligible}</p>
                        </span>
                    </div>
                    </main>
                </div>
            )
        }
    }
    
}
