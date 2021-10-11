import Link from 'next/link'
import { DocumentIcon, FolderIcon, DownloadIcon } from '@heroicons/react/outline'

export function ReportModal() {

	const months = [
		{
			name: 'September',
			link: '#',
			status: 'Ready',
			complete: true
		},
		{
			name: 'October',
			link: '#',
			status: 'Incomplete',
			complete: false
		}
	]

	return (
		<div className="bg-white overflow-hidden border rounded-lg">
	      <div className="px-4 py-5 sm:px-6">
	        <h3 className="text-lg leading-6 font-medium text-gray-900">Reports</h3>
	        <p className = 'text-md mt-1'>Download monthly Kinship reports, including for donations made, where donations were sent, and more.</p>
	      
	        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">

	      		{months.map((details)=>(
	      			<ReportCard details = {details} key = {details.name}/>
	      		))}

	      	</div>
	      </div>
	      <div className="bg-gray-50 px-4 py-5 sm:p-6">
	      	<div className = 'flex items-center'>
				<button
					type="button"
					className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>	
					<DocumentIcon className="mr-2 h-5 w-5" aria-hidden="true" />
					Download Latest Report
				</button>
				<Link href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'>
			      	<a
			          type="button"
			          download
			          href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'
			          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
			        >
			        	<FolderIcon className="mr-2 h-5 w-5" aria-hidden="true" />
			        	Download All Reports
			        </a>
			    </Link>
		    </div>
	      </div>
	    </div>
	)
}

export function ReportCard({details}) {
	return (
		<div
          key={details.email}
          className="relative rounded-lg border border-gray-300 bg-white px-5 py-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
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
          <div>
          	<Link href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'>
		      	<a
		          type="button"
		          download
		          href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'
		          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
		        >
		        	Download
		        	<DownloadIcon className="ml-2 h-5 w-5" aria-hidden="true" />
		        </a>
		    </Link>
          </div>
        </div>
	)
}