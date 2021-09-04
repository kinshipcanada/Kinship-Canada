import Navbar from '../../components/Root/Navbar.js'
import Subnav from '../../components/Root/Subnav.js'
import FullPageLoad from '../../components/Root/FullPageLoad.js'
import LoginRequired from '../../components/Root/LoginRequired.js'

import { supabase } from '../../lib/supabaseClient.js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Welcome() {

	const [loading, setLoading] = useState(true)
	const [updateLoading, setUpdateLoading] = useState(false)
	const [user, setUser] = useState(null)
	const [firstName, setFirstName] = useState(null)
	const [lastName, setLastName] = useState(null)
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
		  .update({ first_name: firstName, 'last_name': lastName })
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
					<Subnav />
					<div className = 'flex flex-col'>
						<h1>Welcome to Kinship.</h1>
						<p>Finish setting up your account:</p>
						<form className = 'flex flex-col' onSubmit={setupProfile}>
							<label>First Name</label>
							<input
								type='text'
								placeholder='Bashar'
								className='border border-gray-600 p-2 mb-2'
								onChange={(e)=>{setFirstName(e.target.value)}}
							/>
							<label>Last Name</label>
							<input
								type='text'
								placeholder='Assad'
								className='border border-gray-600 p-2 mb-2'
								onChange={(e)=>{setLastName(e.target.value)}}
							/>
							<button
								type='submit'
								className='p-2 bg-blue-600 text-white flex items-center justify-center'
							>
								{updateLoading ? 'Setting up your profile...' : 'Continue'}
							</button>
							{error ? <p className='text-md font-semibold text-red-600'>{error}</p> : ''}
						</form>
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