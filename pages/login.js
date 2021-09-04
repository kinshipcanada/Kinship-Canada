import { supabase } from '../lib/supabaseClient'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register() {

	const router = useRouter()

	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [error, setError] = useState(null)

	const login = async (event) => {
		event.preventDefault()
		setLoading(true)

		const { user, session, error } = await supabase.auth.signIn({
			email: email,
			password: password,
		})

		if (error) {
			setError(error.message)
		} else {
			router.push('/app')
		}

		setLoading(false)
	}

	return (
		<div className = 'flex flex-col items-center justify-center p-4'>
			<h1 className = 'text-lg font-bold'>Login to Kinship</h1>
			<form className = 'flex flex-col p-2' onSubmit={login}>
				<label>Enter your email</label>
				<input
					type='email'
					placeholder='ayatollah@sistani.com'
					className='border border-gray-600 p-2 mb-2'
					onChange={(e)=>{setEmail(e.target.value)}}
				/>
				<label>Enter a password</label>
				<input
					type='password'
					placeholder='Your Password'
					className='border border-gray-600 p-2 mb-2'
					onChange={(e)=>{setPassword(e.target.value)}}
				/>
				<button
					type='submit'
					className='p-2 bg-blue-600 text-white'
				>
					{loading ? 'Logging you in...' : 'Login'}
				</button>
			</form>
			{error ? <p className='text-md font-semibold text-red-600'>{error}</p> : ''}
		</div>
	)
}