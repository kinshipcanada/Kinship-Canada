import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../../lib/supabaseClient'
import Navbar from '../../../components/Root/Navbar'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NewProof() {

    const [loading, setLoading] = useState(true)
    const [recipient, setRecipient] = useState(null)
    const [amount, setAmount] = useState(null)
    const [currency, setCurrency] = useState('USD')
    const [activity, setActivity] = useState(null)
    const [city, setCity] = useState(null)
    const [fileUrl, setFileUrl] = useState(null)

	const [user, setUser] = useState(null)
	const [profile, setProfile] = useState([])
	const [partner, setPartner] = useState([])

	const fetchUser = async () => {
		const userLoggedIn = supabase.auth.user()

		if (userLoggedIn) {
			setUser(userLoggedIn)
			console.log(userLoggedIn)
			const profile = await supabase
			  .from('profiles')
			  .select()
			  .eq('id', userLoggedIn.id)

			const partner = await supabase
			  .from('partners')
			  .select()
			  .eq('controlling_user', userLoggedIn.id)

			setPartner(partner.data[0])

			if (profile) {
				setProfile(profile.data[0])
				setLoading(false)
			} else {
				setProfile([])
				setLoading(false)
			}
		} else {
			setLoading(false)
		}
	}

	useEffect(()=>{
		fetchUser()
	},[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const uuid = uuidv4()
        const file = document.getElementById('proof-file').files[0]

        const { data, error } = await supabase.storage
            .from('proof')
            .upload(`${uuid}.zip`, file)

        if (error) {
            toast.error(error.message)
            setLoading(false)
            return
        } else {
            uploadProof(uuid, data.Key)
        }
    }

    const uploadProof = async (uuid, fileUrl) => {
        const { data, error } = await supabase
            .from('pending_proofs')
            .insert([
                { id: uuid, recipient: recipient, amount: amount, currency: currency, city: city, file: fileUrl, partner_id: partner.id, activity: activity }
            ])
        
        if (error) {
            toast.error(error.message)
            setLoading(false)
            return
        } else {
            toast.success('Proof submitted!')
            setRecipient(null)
            setAmount(null)
            setCurrency(null)
            setCity(null)
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />

            <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
                <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    
                    <Link href = '/app/partners'>
                        <a className = "flex font-medium text-md">
                            &larr; Go Back
                        </a>
                    </Link>

                    <div>
                    <h1 className="text-lg leading-6 font-medium text-gray-900">Upload New Proof</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Let’s get started by filling in the information below to create your new project.
                    </p>
                    </div>

                    <div>
                    <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                        Recipient Name
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        name="project-name"
                        id="project-name"
                        required
                        onChange={(e) => setRecipient(e.target.value)}
                        className="block w-full shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g. Ali Karim"
                        />
                    </div>
                    </div>

                    <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Activity
                    </label>
                    <div className="mt-1">
                        <select
                            id="location"
                            name="location"
                            onChange={(e) => setActivity(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >   
                            <option>Select</option>
                            <option>Building Houses</option>
                            <option>Sponsor Orphan</option>
                            <option>Food Sponsorship</option>
                        </select>
                    </div>
                    </div>

                    <div>
                    <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                        Cost
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {
                                    currency === 'IQD' ? 
                                    
                                    <span className="text-gray-500 sm:text-sm">ع.د</span> 
                                    
                                    :

                                    <span className="text-gray-500 sm:text-sm">$</span>

                                }
                            </div>
                                <input
                                type="text"
                                name="price"
                                id="price"
                                required
                                onChange={(e) => setAmount(parseInt(e.target.value)*100)}
                                className={currency == "IQD" ? " block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md" : " block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"}
                                placeholder="0.00"
                                />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <label htmlFor="currency" className="sr-only">
                                    Currency
                                </label>
                                <select
                                    id="currency"
                                    name="currency"
                                    className=" h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                    defaultValue="USD"
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value = 'USD'>USD</option>
                                    <option value = 'CAD'>CAD</option>
                                    <option value = 'IQD'>IQD</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                    <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <div className="mt-1">
                        <input
                        type="text"
                        name="project-name"
                        id="project-name"
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="block w-full shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g. Baghdad"
                        />
                    </div>
                    </div>

                    <div>
                        <label htmlFor="proof-file" className="block text-sm font-medium text-gray-700">
                            Add Images
                        </label>
                        <p className = "text-sm font-regular text-gray-600">Please attach only zip folders</p>
                        <input required type="file" id="proof-file" className = "mt-3"
                            accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                        />
                    </div>
                    
                    {/* <div>
                        <button
                            type="button"
                            onClick={uploadFile}
                            className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                            />
                        </svg>
                        <span className="mt-2 block text-sm font-medium text-gray-900">Add a new zip folder of images</span>
                        </button>
                    </div> */}

                    <div className="flex justify-end">
                    <Link href = "/app/partners">
                        <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                        >
                            Cancel
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                    >
                        {

                            loading ?

                            <>
                                Uploading...
                            </>

                            :

                            <>
                                Upload Proof
                            </>
                        
                        }
                    </button>
                    </div>
                </div>
                </form>
            </main>
        </>
    )
}
