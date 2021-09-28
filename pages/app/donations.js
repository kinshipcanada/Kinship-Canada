import Navbar from '../../components/Root/Navbar.js'
import Subnav from '../../components/Root/Subnav.js'
import FullPageLoad from '../../components/Root/FullPageLoad.js'
import LoginRequired from '../../components/Root/LoginRequired.js'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient.js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { QuestionMarkCircleIcon, DownloadIcon } from '@heroicons/react/solid'

export default function AppIndex() {

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [profile, setProfile] = useState(null)
	const [donations, setDonations] = useState(null)
	const userLoggedIn = supabase.auth.user()

	const people = [
	  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
	  { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
	]

	const fetchUser = async () => {
		const userLoggedIn = supabase.auth.user()

		if (userLoggedIn) {
			setUser(userLoggedIn)
			const profile = await supabase
			  .from('profiles')
			  .select()
			  .eq('id', userLoggedIn.id)
			setProfile(profile.data[0])
			fetchDonations()
		} else {
			setLoading(false)
		}
	}

	const fetchDonations = async () => {
		const userLoggedIn = supabase.auth.user()

		const data = await supabase
		  .from('donations')
		  .select()

		setDonations(data.data)
		setLoading(false)
	}

	useEffect(()=>{
		fetchUser()
	},[])

	if (loading) {
		return (
			<div>
				<Navbar />
				<div className="relative min-h-screen">
			      <main className="max-w-7xl mx-auto pb-10 pl-8 pr-8 pt-10">
			        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
			          <Subnav />
			          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
			            <FullPageLoad />
			          </div>
			        </div>
			      </main>
			    </div>
			</div>
		)
	} else {
		if (user) {
			return (
				<div>
					<Navbar />
					<div className="relative min-h-screen">
				      <main className="max-w-7xl mx-auto pb-10 pl-8 pr-8 pt-10">
				        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
				          <Subnav />
				          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
				          	<div className="md:flex md:items-center md:justify-between">
						      <div className="flex-1 min-w-0">
						        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Your Donation History, {profile.first_name}</h2>
						      </div>
						      <div className="mt-4 flex md:mt-0 md:ml-4">
							  	<Link href = '/support'>
									<button
									type="button"
									className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
									>
									Support
									</button>
								</Link>
						      </div>
						    </div>

							<div className="flex flex-col">
						      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						            <table className="min-w-full divide-y divide-gray-200">
						              <thead className="bg-gray-50">
						                <tr>
						                  <th
						                    scope="col"
						                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						                  >
						                    Causes
						                  </th>
						                  <th
						                    scope="col"
						                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						                  >
						                    Date
						                  </th>
						                  <th
						                    scope="col"
						                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						                  >
						                    Amount
						                  </th>
						                  <th
						                    scope="col"
						                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						                  >
						                    Status
						                  </th>
						                  <th
						                    scope="col"
						                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						                  >
						                  	<div className = 'flex'>
							                    Receipt
							                    <QuestionMarkCircleIcon className = 'ml-1 w-4 h-4' />
						                    </div>
						                  </th>
						                </tr>
						              </thead>
						              <tbody>
						                {donations.map((donation, donationIdx) => (
						                  <tr key={donation.donationIdx} className={donationIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
						                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
						                    	{donation.causes.causes.map((cause) => (
						                    		<div key = {cause.id}>{cause.cause}: ${cause.amount}</div>
						                    	))}
						                    </td>
						                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.created_at}</td>
						                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${parseFloat(donation.amount).toFixed(2)}</td>
						                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						                    	<span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
											        {donation.status}
											    </span>
						                    </td>
						                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
						                      <button
										        type="button"
										        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										      >
										      	<DownloadIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
										        Download Receipt
										      </button>
						                    </td>
						                  </tr>
						                ))}
						              </tbody>
						            </table>
						          </div>
						        </div>
						      </div>
						    </div>


				          </div>
				        </div>
				      </main>
				    </div>
				</div>
			)
		} else {
			return (
				<div>
					<Navbar />
					<div className="relative min-h-screen">
				      <main className="max-w-7xl mx-auto pb-10 pl-8 pr-8 pt-10">
				        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
				          <Subnav />
				          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
				            <LoginRequired />
				          </div>
				        </div>
				      </main>
				    </div>
				</div>
			)
		}
	}
}