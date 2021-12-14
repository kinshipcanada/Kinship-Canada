import Navbar from '../../../components/Root/Navbar.js'
import Subnav from '../../../components/Root/Subnav.js'
import Loader from '../../../components/Root/Loader.js'
import LoginRequired from '../../../components/Root/LoginRequired'
import Link from 'next/link'
import { supabase } from '../../../lib/supabaseClient.js'
import { useState, useEffect } from 'react'

// Import partner specific modals
import UploadProof from '../../../components/Partners/UploadProof.js'
import StatsCard from '../../../components/Partners/StatsCard'

export default function PartnersIndex() {

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [profile, setProfile] = useState([])
	const [partner, setPartner] = useState([])
	const userLoggedIn = supabase.auth.user()

	const fetchUser = async () => {
		const userLoggedIn = supabase.auth.user()

		if (userLoggedIn) {
			setUser(userLoggedIn)
			console.log(userLoggedIn)
			const profile = await supabase
			  .from('profiles')
			  .select()
			  .eq('id', userLoggedIn.id)

			if (profile) {
				setProfile(profile.data[0])
				const partner = await supabase
					.from('partners')
					.select()
					.eq('id', profile.data[0].partner_controlled)

				setPartner(partner.data[0])
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
						        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Your partner dashboard, {partner.name}</h2>
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
							<StatsCard />
						   	<UploadProof partner_id = {partner.id}/>
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