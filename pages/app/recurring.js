import Navbar from '../../components/Root/Navbar.js'
import Subnav from '../../components/Root/Subnav.js'
import Head from 'next/head'

export default function Recurring() {
	return (
		<div>
			<Head>
				<title>Kinship Canada · Recurring Donations</title>
			</Head>
			<Navbar />
			<div className="relative min-h-screen">
		      <main className="max-w-7xl mx-auto pb-10 pl-8 pr-8 pt-10">
		        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
		          <Subnav />
		          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
				  	<div className="flex-1 min-w-0">
						<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Recurring Donation Management Coming Soon...</h2>
					</div>
					
		          </div>
		        </div>
		      </main>
		    </div>
		</div>
	)
}