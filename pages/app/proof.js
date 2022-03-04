import Navbar from '../../components/Root/Navbar.js'
import Subnav from '../../components/Root/Subnav.js'
import Loader from '../../components/Root/Loader.js'
import LoginRequired from '../../components/Root/LoginRequired.js'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient.js'
import { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip';
import { QuestionMarkCircleIcon, DownloadIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import toast from 'react-hot-toast'

export default function AppIndex() {

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [onTheWay, setOnTheWay] = useState([])
	const [profile, setProfile] = useState(null)
	const [proof, setProof] = useState([])
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
			fetchProofs()
		} else {
			setLoading(false)
		}
	}

	const fetchProofs = async () => {
		const data = await supabase
		  .from('proof')
		  .select(`
		  	id (
				amount,
				logged
			),
			created_at,
			proof_link,
			email
		  `)
		  .eq('email', userLoggedIn.email)
		

		try {
			console.log(data.data)
			setProof(data.data)
			setLoading(false)
		} catch (error) {
			toast.error("Couldn't fetch proof - please try again later.")
		}
	}

	useEffect(()=>{
		fetchUser()
	},[])

	if (loading) {
		return (
			<div>
				<Head>
					<title>Kinship Canada · Proof Of Donation</title>
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
						<title>Kinship Canada · Proof Of Donation</title>
					</Head>
					<Navbar />
					<div className="relative min-h-screen">
				      <main className="max-w-7xl mx-auto pb-10 pl-8 pr-8 pt-10">
				        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
				          <Subnav />
				          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
				          	<div className="md:flex md:items-center md:justify-between">
						      <div className="flex-1 min-w-0">
						        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Proof of donation, {profile.first_name}</h2>
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

						    <div className="md:flex">
						      <div className="flex-1 min-w-0">
						        <h2 className="text-lg font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">Available</h2>
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
							                    Amount
							                  </th>
							                  <th
							                    scope="col"
							                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							                  >
							                    Date Donated
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
								                    Proof
													<span data-tip="A folder, PDF, or image with the proof of where your donation went.">
														<QuestionMarkCircleIcon className = 'ml-1 w-4 h-4' />
													</span>
													<ReactTooltip place="top" type="dark" effect="float"/>
							                    </div>
							                  </th>
							                </tr>
							              </thead>
							              <tbody>
							                {proof.map((donation, donationIdx) => (
							                  <tr key={donation.created_at} className={donationIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
							                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							                    	${parseFloat(donation.id.amount/100).toFixed(2)} Donated
							                    </td>
							                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(donation.created_at).toLocaleString().split(',')[0]}</td>
							                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							                    	<span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
												        Available
												    </span>
							                    </td>
							                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													<a href = {donation.proof_link} target = "_blank" rel = "noopener noreferrer">
														<button
															type="button"
															className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
														>
															<DownloadIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
															Download Proof
														</button>
													</a>
							                    </td>
							                  </tr>
							                ))}
							              </tbody>
							            </table>
							          </div>
							        </div>
							      </div>
							    </div>



							    <div className="md:flex">
							      <div className="flex-1 min-w-0">
							        <h2 className="text-lg font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">On The Way</h2>
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
							                    Details
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
							                    Status
							                  </th>
							                  
							                </tr>
							              </thead>
							              <tbody>
							                {onTheWay.length === 0 ? 

												<>
													<tr className='bg-white'>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
															No Donations Currently On The Way.
														</td>
													</tr>
												</>

												:

												<>
												{onTheWay.map((donation, donationIdx) => (
													<tr key={donation.created_at} className={donationIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(donation.created_at).toLocaleString()}</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															<span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
																{donation.status}
															</span>
														</td>
														
													</tr>
												))}
												</>
											}
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
						<title>Kinship Canada · Proof Of Donation</title>
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