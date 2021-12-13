import { PlusIcon, DocumentIcon, DownloadIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'

export default function PartnerProofModal({partner_id}) {

	const [loading, setLoading] = useState(true)
	const [details, setDetails] = useState([])

	const fetchProcessing = async () => {
		const { data, error } = await supabase
			.from('pending_proofs')
			.select()
			.eq('partner_id', partner_id)
		
		if (error) {
			console.log(error)
		} else {
			console.log(data)
			setDetails(data)
		}
	}

	useEffect(() => {
		fetchProcessing()
			.then(() => setLoading(false))
	}, [])

	return (
		<div className="bg-white overflow-hidden border border-gray-300 rounded-lg" >
	      <div className="px-4 py-5 sm:px-6">
	        <h3 className="text-lg leading-6 font-medium text-gray-900">Upload proof of donation</h3>
	        <p className = 'text-sm mt-2'>Once Kinship releases funds to you, you can upload proof that the donation has been processed here. Find the donation below and upload proof.</p>
			<span className="relative z-0 inline-flex shadow-sm rounded-md mt-4">
				<Link href="/app/partners/proof">
					<button
						type="button"
						className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
					>
						<PlusIcon className="-ml-1 mr-2 h-5 w-5 text-gray-600" aria-hidden="true" />
						Upload New Donations
					</button>
				</Link>

				<span
					className="-ml-px relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
				>
					{loading ? "Loading..." : details.length}
				</span>
			</span>
		  </div>
	      <div className="bg-gray-50 px-4 py-5 sm:p-6">
			{
				loading ?

				<div className = "flex justify-center text-sm font-medium">
					<p>Loading...</p>
				</div>

				: details.length > 0 ?
				
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{details.map((detail)=>(
						<StatusCard details = {detail} key={details.email}/>
					))}
				</div>

				:

				<div className = "flex justify-center text-sm font-medium">
					<p>No donations uploaded.</p>
				</div>

			}
	      </div>
	    </div>
	)
}

export function StatusCard({details}) {
	return (
		<div
			key={details.email}
			className="cursor-default relative rounded-lg border border-gray-300 bg-white px-5 py-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
		>
			{/* <div className="flex-shrink-0 text-green-600">
				<DocumentIcon className = 'h-5 w-5'/>
			</div> */}
			<div className="flex-1 min-w-0">
				<div href="#" className="focus:outline-none">
					<div className = 'flex flex-row items-center'>
						<p className="text-sm font-medium text-gray-900">{details.recipient.replace(/ .*/,'')} received {details.currency == "IQD" ? <span className = "ml-1">ع.د</span> : "$"}{details.amount/100} {details.currency}</p>
						<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
							{details.activity}
						</span>
					</div>
				</div>
			</div>
			<a download href = "https://rulynyeqawfbgkyypkos.supabase.in/storage/v1/object/public/proof/46296dd1-4088-460e-bae9-0fe98bcb57e1.zip" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					<DownloadIcon className = "w-4 h-4" />
			</a>
      	</div>
	)
}