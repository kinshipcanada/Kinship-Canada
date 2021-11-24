import { PlusIcon, DocumentIcon, ArrowRightIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

export default function MainCard({partner}) {

	const [uploadMode, setUploadMode] = useState(false)

	return (
		<>
			{
				uploadMode ? <UploadReceipts partner = {partner} uploadModeToggle = {setUploadMode} /> : <ViewCard partner = {partner} uploadModeToggle = {setUploadMode} />
			}
		</>
	)
}
export function ViewCard(props) {

	const people = [
	  {
	    name: 'List 25',
	    status: 'Processing',
	    complete: false
	  },
	  {
	    name: 'List 28',
	    status: 'Sent',
	    complete: true
	  },
	  // More people...
	]

	return (
		<div className="bg-white overflow-hidden border border-gray-300 rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Upload donations for receipts</h3>
        <p className = 'text-sm mt-2'>You can use this feature to upload new lists of donations. Kinship will review the information, issue tax receipts, and email it to users. Please follow the partner donation template. If you do not have a copy, you can use the Download CSV Template button.</p>
      	<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">

      		{people.map((details)=>(
      			<StatusCard details = {details} key = {details.name}/>
      		))}

      	</div>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:p-6">

		<div className = 'flex items-center'>
			<button
				type="button"
				onClick={()=>{
					props.uploadModeToggle(true)
				}}
				className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
				<PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
				Upload New Donations
			</button>
			<Link href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'>
		      	<button
		          type="button"
		          download
		          href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'
		          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
		        >
		        	Download Template
		        </button>
		    </Link>
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

export const UploadReceipts = (props) => {

	const [targetFileName, setTargetFileName] = useState(null)

	const uploadFile = async (event) => {
		event.preventDefault()
		const uuid = uuidv4();

		const targetFile = event.target.files[0]
		const targetFileName = document.getElementById('file-upload').name
		const extension = getFileExtension(targetFileName)
		const filename = constructFilename(uuid, extension)
		const displayName = targetFileName + '.' + extension
		console.log(displayName, extension)

		toast.success(`Uploaded successfully!`, { position: "top-right"})
		// const { data, error } = await supabase
		//   .storage
		//   .from('donations')
		//   .upload('public/avatar1.png', targetFile, {
		//     cacheControl: '3600',
		//     upsert: false
		//   })
	}

	function constructFilename(uuid, extension) {
		return uuid + '.' + extension
	}

	function getFileExtension(name) {
	  const lastDot = name.lastIndexOf('.');
	  const ext = name.substring(lastDot + 1);

	  return ext
	}

	function getFileName(event) {
	  setTargetFileName(event.target.files[0].name)
	}

	return (
		<form className="bg-white overflow-hidden border border-gray-300 rounded-lg" onSubmit = {uploadFile} enctype="multipart/form-data">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Upload new list of donations</h3>
        <p className = 'text-sm mt-2'>Click choose file below to add your file, and then click Upload. The file should include the list of donations in .xlsx or .csv format according to the official Kinship template. If you do not have the template, you can download it below with the Download Template button below.</p>
      	<div className="mt-4">

					<input 
						id="file-upload" 
						type="file"
						onChange={getFileName}
						accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					/>


      	</div>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:p-6">

		<div className = 'flex items-center'>
			{
				targetFileName != null ?

				<button
					type="submit"
					// onClick={()=>{
					// 	props.uploadModeToggle(false)
					// }}
					className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Upload "{targetFileName}"
					<ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
				</button>

				:

				<a
					href="#"
					className="opacity-60 disabled cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Choose A File To Upload
				</a>
			}
			<Link href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'>
		      	<button
		          type="button"
		          download
		          href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'
		          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
		        >
		        	Download Template
		        </button>
		    </Link>
	    </div>
      </div>
    </form>
	)
}
