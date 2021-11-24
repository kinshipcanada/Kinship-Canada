import { PlusIcon, DocumentIcon, ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function PartnerProofModal() {

	const details = [
		{
			name: ''
		}
	]

	return (
		<div className="bg-white overflow-hidden border border-gray-300 rounded-lg" >
	      <div className="px-4 py-5 sm:px-6">
	        <h3 className="text-lg leading-6 font-medium text-gray-900">Upload proof of donation</h3>
	        <p className = 'text-sm mt-2'>Once Kinship releases funds to you, you can upload proof that the donation has been processed here. Find the donation below and upload proof.</p>
	      </div>
	      <div className="bg-gray-50 px-4 py-5 sm:p-6">
	      	<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
	      		{details.map((detail)=>(
	      			<StatusCard details = {detail} />
	      		))}
	      	</div>
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
        <div className={details.complete ? "flex-shrink-0 text-green-600" : "flex-shrink-0 text-yellow-600"}>
          <DocumentIcon className = 'h-5 w-5'/>
        </div>
        <div className="flex-1 min-w-0">
          <div href="#" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className = 'flex flex-row items-center'>
              <p className="text-sm font-medium text-gray-900">{details.name}</p>
              <span className={details.complete ? "ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" : "ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"}>
		        {details.status}
		      </span>
	      </div>
          </div>
        </div>
      </div>
	)
}