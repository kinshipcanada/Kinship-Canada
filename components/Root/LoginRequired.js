import Link from 'next/link'

export default function LoginRequired() {
	return (
		<div>
			To access this page, you need to log in.
			<Link href = 'login'><a className = 'text-blue-600'>Login</a></Link>
			<Link href = '/register'><a className = 'text-blue-600'>Register</a></Link>
		</div>
	)
}