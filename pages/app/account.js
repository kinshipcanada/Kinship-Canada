import Navbar from '../../components/Root/Navbar.js'
import Subnav from '../../components/Root/Subnav.js'
import FullPageLoad from '../../components/Root/FullPageLoad.js'
import Loader from '../../components/Root/Loader.js'
import LoginRequired from '../../components/Root/LoginRequired'

import { supabase } from '../../lib/supabaseClient.js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { TaxReceiptPackage } from '../../components/DashboardModals.js'

export default function AppIndex() {

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [profile, setProfile] = useState([])
	const userLoggedIn = supabase.auth.user()

	const fetchUser = async () => {
		const userLoggedIn = supabase.auth.user()

		if (userLoggedIn) {
			setUser(userLoggedIn)
			const profile = await supabase
			  .from('profiles')
			  .select()
			  .eq('id', userLoggedIn.id)

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

	if (loading) {
		return (
			<div>
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
					<Navbar />
					<div className="relative min-h-screen">
				      <main className="max-w-7xl mx-auto pb-10 pl-8 pr-8 pt-10">
				        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
				          <Subnav />
				          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
						  <div className="md:flex md:items-center md:justify-between">
						      <div className="flex-1 min-w-0">
						        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Manage your account</h2>
						      </div>
						      <div className="mt-4 flex md:mt-0 md:ml-4">
						        <button
						          type="button"
						          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
						        >
						          Support
						        </button>
						      </div>
						    </div>

							<div className="space-y-6">
						
								<div className="bg-white border border-gray-400 px-4 py-5 sm:rounded-lg sm:p-6">
								<div className="md:grid md:grid-cols-3 md:gap-6">
									<div className="md:col-span-1">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
									<p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
									</div>
									<div className="mt-5 md:mt-0 md:col-span-2">
									<form action="#" method="POST">
										<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
											First name
											</label>
											<input
												type="text"
												defaultValue={profile.first_name}
												name="first-name"
												id="first-name"
												autoComplete="given-name"
												className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
						
										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
											Last name
											</label>
											<input
												type="text"
												name="last-name"
												defaultValue={profile.last_name}
												id="last-name"
												autoComplete="family-name"
												className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
						
										<div className="col-span-full">
											<div className = 'w-full flex justify-between'>
												<label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
													<p>Email address</p>
													
												</label>
												<span className="border border-yellow-800 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
													Warning: this changes your account email
												</span>
											</div>
											<input
												type="text"
												name="email-address"
												id="email-address"
												defaultValue={user.email}
												autoComplete="email"
												className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
						
										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="country" className="block text-sm font-medium text-gray-700">
											Country / Region
											</label>
											<select
											id="country"
											name="country"
											autoComplete="country"
											className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											>
												<option>Canada</option>
												<option>United States</option>
												<option>United Kingdom</option>
												<option>-</option>
											</select>
										</div>
						
										<div className="col-span-6">
											<label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
											Street address
											</label>
											<input
											type="text"
											name="street-address"
											id="street-address"
											defaultValue={profile.address}
											autoComplete="street-address"
											className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
						
										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label htmlFor="city" className="block text-sm font-medium text-gray-700">
											City
											</label>
											<input
											type="text"
											name="city"
											defaultValue={profile.city}
											id="city"
											className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
						
										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label htmlFor="state" className="block text-sm font-medium text-gray-700">
											State / Province
											</label>
											<input
											type="text"
											name="state"
											defaultValue={profile.state}
											id="state"
											className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
						
										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
											ZIP / Postal
											</label>
											<input
											type="text"
											name="postal-code"
											id="postal-code"
											defaultValue={profile.postal_code}
											autoComplete="postal-code"
											className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
										</div>
									</form>
									</div>
								</div>
								</div>
						
								<div className="bg-white border border-gray-400 px-4 py-5 sm:rounded-lg sm:p-6">
								<div className="md:grid md:grid-cols-3 md:gap-6">
									<div className="md:col-span-1">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
									<p className="mt-1 text-sm text-gray-500">Decide which communications you&apos;d like to receive and how.</p>
									</div>
									<div className="mt-5 md:mt-0 md:col-span-2">
									<form className="space-y-6" action="#" method="POST">
										<fieldset>
										<legend className="text-base font-medium text-gray-900">By Email</legend>
										<div className="mt-4 space-y-4">
											<div className="flex items-start">
											<div className="h-5 flex items-center">
												<input
												id="comments"
												name="comments"
												checked
												type="checkbox"
												className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label htmlFor="comments" className="font-medium text-gray-700">
												Tax Receipts
												</label>
												<p className="text-gray-500">Get tax receipts for your donations by email/SMS.</p>
											</div>
											</div>
											<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
												id="candidates"
												name="candidates"
												type="checkbox"
												checked
												className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label htmlFor="candidates" className="font-medium text-gray-700">
												Proof Of Donation
												</label>
												<p className="text-gray-500">Get notified when there is new proof availiable for your donation.</p>
											</div>
											</div>
											<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
												id="offers"
												name="offers"
												checked
												type="checkbox"
												className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label htmlFor="offers" className="font-medium text-gray-700">
												Charges
												</label>
												<p className="text-gray-500">Get notified about charges, including donations and recurring donations.</p>
											</div>
											</div>
										</div>
										</fieldset>
									</form>
									</div>
								</div>
								</div>
						
								<div className="flex justify-end">
								<button
									type="button"
									className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Save
								</button>
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






