import Navbar from '../../components/Root/Navbar.js'
import Subnav from '../../components/Root/Subnav.js'
import FullPageLoad from '../../components/Root/FullPageLoad.js'
import LoginRequired from '../../components/Root/LoginRequired.js'
import { MailIcon } from '@heroicons/react/solid'
import { supabase } from '../../lib/supabaseClient.js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ArrowRightIcon } from '@heroicons/react/outline'

export default function Welcome() {

	const [loading, setLoading] = useState(true)
	const [updateLoading, setUpdateLoading] = useState(false)
	const [user, setUser] = useState(null)

	const [firstName, setFirstName] = useState(null)
	const [lastName, setLastName] = useState(null)
	const [address, setAddress] = useState(null)
	const [postalCode, setPostalCode] = useState(null)
	const [state, setState] = useState(null)
	const [city, setCity] = useState(null)
	const [country, setCountry] = useState(null)

	const [error, setError] = useState(null)

	const router = useRouter()

	useEffect(()=>{
		const userLoggedIn = supabase.auth.user();
		setUser(userLoggedIn);
		setLoading(false);
	}, [])

	const setupProfile = async (event) => {
		event.preventDefault()
		setUpdateLoading(true)
		const { data, error } = await supabase
		  .from('profiles')
		  .update({ first_name: firstName, 'last_name': lastName, 'address': address, 'postal_code': postalCode, 'state': state, 'city': city, 'country': country })
		  .match({ id: user.id })

		if (error) {
			setError(error.message)
			setUpdateLoading(false)
		} else {
			router.push('/app')
		}
	}

	if (loading) {
		return (
			<div>
				<Navbar />
				<Subnav />
				<FullPageLoad />
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
							<div className = 'flex flex-col'>
							<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Welcome to Kinship Canada</h2>
									<p className = 'text-lg mb-2 mt-2'>Let&apos;s get your account setup</p>
									<form className = 'flex flex-col' onSubmit={setupProfile}>
										<div className = 'grid grid-cols-2 gap-4 mb-3'>
											<div className = 'col-span-1'>
												<label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
												<input
													type='text'
													placeholder='Tiger'
													className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
													onChange={(e)=>{setFirstName(e.target.value)}}
													required
												/>
											</div>
											<div className = 'col-span-1'>
												<label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
												<input
													type='text'
													placeholder='Woods'
													className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
													onChange={(e)=>{setLastName(e.target.value)}}
													required
												/>
											</div>
										</div>
										<div className = 'grid grid-cols-1 mb-3 '>
											<div className = 'col-span-1'>
												<label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
												<input
													type='text'
													placeholder='123 Main Street'
													className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
													onChange={(e)=>{setAddress(e.target.value)}}
													required
												/>
											</div>
										</div>
										<div className = 'grid grid-cols-2 mb-3 gap-4 '>
											<div className = 'col-span-1'>
												<label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
												<input
													type='text'
													placeholder='A1B2C3'
													className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
													onChange={(e)=>{setPostalCode(e.target.value)}}
													required
												/>
											</div>
											<div className = 'col-span-1'>
												<label className="block text-sm font-medium text-gray-700 mb-1">City</label>
												<input
													type='text'
													placeholder='Richmond Hill'
													className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
													onChange={(e)=>{setCity(e.target.value)}}
													required
												/>
											</div>
											<div className = 'col-span-1'>
												<label className="block text-sm font-medium text-gray-700 mb-1">State</label>
												<input
													type='text'
													placeholder='Ontario'
													className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
													onChange={(e)=>{setState(e.target.value)}}
													required
												/>
											</div>
											<div className = 'col-span-1'>
												<label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
												<select
													className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
													onChange={(e)=>{setCountry(e.target.value)}}
													defaultValue='null'
												>
													<option value = 'null'>Select One</option>
													<option value = 'Canada'>Canada</option>
													<option value = 'United States'>United States</option>
													<option value = 'Other'>Other</option>
												</select>
											</div>
										</div>
										<div className = 'flex items-center w-full justify-center mt-4'>
											<button
												type="submit"
												className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
											>
												{updateLoading ? 'Setting up your profile...' : 'Continue To Dashboard'}
												<ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
											</button>
										</div>
										{error ? <p className='text-md font-semibold text-red-600'>{error}</p> : ''}
									</form>
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
					<Subnav />
					<LoginRequired />
				</div>
			)
		}
	}

}