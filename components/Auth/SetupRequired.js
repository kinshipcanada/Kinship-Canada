import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SetupRequired(profile) {

    const [setUp, setSetUp] = useState(profile.profile.set_up)
    console.log(setUp)

    return (
        <>
        {
            setUp ?

            <>
            </>

            :

            <div className = 'h-screen w-full fixed bg-white p-6 sm:p-12'>
            <div className="bg-gray-50 sm:rounded-lg border flex justify-between items-center">
                <div className="px-4 py-5 sm:p-6 ">
                <h3 className="text-lg leading-6 font-medium text-gray-900">To access your dashboard, you need to finish setting up your account.</h3>
                </div>
                <div className="px-4 py-5 sm:p-6 ">
                    <Link href = '/app/welcome'>
                        <button
                            type="button"
                            className=" items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        >
                            Continue Setup &rarr;
                        </button>
                    </Link>
                </div>
            </div>    
        </div>
        }
        </>
        
    )
}