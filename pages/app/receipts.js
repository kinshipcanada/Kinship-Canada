import Navbar from '../../components/Root/Navbar.js'
import Subnav from '../../components/Root/Subnav.js'
import FullPageLoad from '../../components/Root/FullPageLoad.js'
import Loader from '../../components/Root/Loader.js'
import DownloadCard from '../../components/Receipts/DownloadCard.js'
import LoginRequired from '../../components/Root/LoginRequired'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient.js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AppIndex() {

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [profile, setProfile] = useState(null)
	const [receipts, setReceipts] = useState(null)
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
			fetchReceipts()
		} else {
			setLoading(false)
		}
	}

	const fetchReceipts = async () => {
		const userLoggedIn = supabase.auth.user()

		const { data, error } = await supabase
			.from('receipts')
			.select()
			.eq('user_id', userLoggedIn.id)
		
		if (error) {
			console.log(error)
			setReceipts([])
		} else {
			console.log(data)
			setReceipts(data)
			setLoading(false)
		}
		
	}

	useEffect(()=>{
		fetchUser()
	},[])

	if (loading) {
		return (
			<div>
				<Head>
					<title>Kinship Canada · Tax Receipts</title>
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
						<title>Kinship Canada · Tax Receipts</title>
					</Head>
					<Navbar />
					<div className="relative min-h-screen">
				      <main className="max-w-7xl mx-auto pb-10 pl-8 pr-8 pt-10">
				        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
				          <Subnav />

				          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
						    <div className="md:flex md:items-center md:justify-between">
						      <div className="flex-1 min-w-0">
						        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Your Tax Receipts, {profile.first_name}</h2>
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
							<div>
								{receipts.map((receipt) => (
									<div key = {receipt.id}>
										<DownloadCard receipt = {receipt} />
									</div>
						        ))}
								{
									receipts.length == 0 ?

									<NoReceipts profile = {profile}/>

									:

									<></>
								}
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
						<title>Kinship Canada · Tax Receipts</title>
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

export const NoReceipts = ({profile}) => {

	const country = profile.country

	return (
		<div className="bg-gray-50 sm:rounded-lg border">
			<div className="px-4 py-5 sm:p-6">
				<h3 className="text-lg leading-6 font-medium text-gray-900">No Tax Receipts</h3>
				<div className="mt-2 text-sm text-gray-500">
					{
						country == 'Canada' ?

						<p>It looks like you have no tax receipts available yet. If you just made a donation, please give up to 5 minutes for the receipt to appear here. If the issue persists, please <Link href = 'mailto:info@kinshipcanada.com'><a className = 'font-semibold text-gray-800'>contact us</a></Link>.</p>

						:

						<p>It looks like you have no tax receipts available. This is because your country is not set to Canada, and Kinship can only issue tax receipts to Canadians. If you need to change your region, do so <Link href = '/app/account'><a className = 'font-semibold text-gray-800'>here</a></Link>.</p>
					}
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
