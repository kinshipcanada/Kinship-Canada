import Navbar from '../../components/Root/Navbar.js'
import Subnav from '../../components/Root/Subnav.js'

export default function Recurring() {
	return (
		<div>
			<Navbar />
			<div className="relative min-h-screen">
		      <main className="max-w-7xl mx-auto pb-10 pl-8 pr-8 pt-10">
		        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
		          <Subnav />
		          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
		            Recurring Donations
		          </div>
		        </div>
		      </main>
		    </div>
		</div>
	)
}