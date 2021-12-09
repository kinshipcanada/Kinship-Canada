import Navbar from '../../components/Root/Navbar.js'
import Subnav from '../../components/Root/Subnav.js'
import Loader from '../../components/Root/Loader.js'
import LoginRequired from '../../components/Root/LoginRequired.js'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient.js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { QuestionMarkCircleIcon, DownloadIcon } from '@heroicons/react/solid'
import ReactTooltip from 'react-tooltip';
import Head from 'next/head'

export default function AppIndex() {

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [profile, setProfile] = useState(null)
	const [donations, setDonations] = useState(null)
	const userLoggedIn = supabase.auth.user()

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
		  .eq('user_id', userLoggedIn.id)

		setDonations(data.data)
		setLoading(false)
	}

	useEffect(()=>{
		fetchUser()
	},[])

	if (loading) {
		return (
			<div>
				<Head>
					<title>Kinship Canada · Donation History</title>
				</Head>
				<Navbar />
				<div className="relative min-h-screen">
			      <main className="max-w-7xl mx-auto pb-10 pl-8 pr-8 pt-10">
			        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
			          <Subnav />

			          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
			            <div className = 'flex items-center justify-center'>
			            	<Loader />
			            </div>
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
					<Head>
						<title>Kinship Canada · Donation History</title>
					</Head>
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
						          <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
						            <table className="min-w-full divide-y divide-gray-200">
						              {
										  donations.length == 0 ?

										  <NoDonations />

										  :

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
												<div className = 'flex items-center'>
													Receipt
													<a className = 'normal-case' data-tip="This is the Stripe (payment) receipt, not your CRA eligible tax receipt.">
														<QuestionMarkCircleIcon className = 'ml-1 w-5 h-5' />
														<ReactTooltip place="top" type="dark" effect="float"/>
													</a>
												</div>
											</th>
											</tr>
										</thead>
									  }
						              <tbody>
						                {donations.map((donation, donationIdx) => (
						                  <tr key={donation.donationIdx} className={donationIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
						                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
						                    	Causes Coming Soon...{/* {donation.causes.map((cause) => (
						                    		<div key = {cause.id}>{cause.cause}</div>
						                    	))} */}
						                    </td>
						                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.date}</td>
						                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${parseFloat(donation.amount).toFixed(2)}</td>
						                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
						                    	<span className={donation.proof_available ? "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800" : "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"}>
											        {donation.proof_available ? 'Available' : 'In Transit'}
											    </span>
						                    </td>
						                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
						                      {
												donation.direct ?

												<button
													type="button"
													href={donation.stripe_receipt_url}
													className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
												>
													<DownloadIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
													Download Receipt
												</button>

												:

												<div className = 'flex items-center'>
													<p className = ''>Ineligible</p>
												</div>
											  }
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
					<Head>
						<title>Kinship Canada · Donation History</title>
					</Head>
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

export const NoDonations = () => {

	return (
		<div className="bg-gray-50 sm:rounded-lg border">
			<div className="px-4 py-5 sm:p-6">
				<h3 className="text-lg leading-6 font-medium text-gray-900">No Donations</h3>
				<div className="mt-2 text-sm text-gray-500">
					<p>It looks like you have no tax receipts available yet. If you just made a donation, please give up to 5 minutes for the details to appear here. If the issue persists, please <Link href = 'mailto:info@kinshipcanada.com'><a className = 'font-semibold text-gray-800'>contact us</a></Link>.</p>
				</div>
				<div className="mt-5">
					<Link href='/donate'>
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
						>
							Make a donation
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}