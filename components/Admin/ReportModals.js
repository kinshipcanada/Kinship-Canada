import Link from 'next/link'
import { DocumentIcon, FolderIcon, DownloadIcon } from '@heroicons/react/outline'
import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { LinkIcon, PlusSmIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'

export function ReportModal() {

	const [loading, setLoading] = useState(true)
	const [reports, setReports] = useState([])
	const [open, setOpen] = useState(false)

	return (
		<div className="bg-white overflow-hidden border rounded-lg">
	      <div className="px-4 py-5 sm:px-6">
	        <h3 className="text-lg leading-6 font-medium text-gray-900">Reports</h3>
	      
	        {
				reports.length > 0 ?

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
					
				</div>

				:

				<div>
					<p className = 'text-sm font-medium mt-4'>No reports to display.</p>
				</div>
			}
	      </div>
	      <div className="bg-gray-50 px-4 py-5 sm:p-6">
	      	<div className = 'flex items-center'>
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>	
					<DocumentIcon className="mr-2 h-5 w-5" aria-hidden="true" />
					Create New Report
				</button>
				<Link href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'>
			      	<button
			          download
			          href='https://ugpxhhdljfbaswjteasm.supabase.in/storage/v1/object/public/partners/Resources/template.csv'
			          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
			        >
			        	<FolderIcon className="mr-2 h-5 w-5" aria-hidden="true" />
			        	Download All Reports
			        </button>
			    </Link>
		    </div>
	      </div>
		  <NewReport open = {open} setOpen = {setOpen} />
	    </div>
	)
}

export function ReportCard({details}) {
	return (
		<div
          key={details.email}
          className="relative rounded-lg border border-gray-300 bg-white px-5 py-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
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

export function NewReport({ open, setOpen }) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-2xl">
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">New report</Dialog.Title>
                          <p className="text-sm text-gray-500">
                            Get started by filling in the information below to generate a new report.
                          </p>
                        </div>
                        <div className="h-7 flex items-center focus:outline-none">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={() => setOpen(false)}
                          >
                            <XIcon className="h-6 w-6 focus:outline-none" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Divider container */}
                    <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                        <div>
                          <label
                            htmlFor="project-name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Report name
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            name="project-name"
                            id="project-name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      {/* Project description */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                        <div>
                          <label
                            htmlFor="project-description"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Start Date
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input 
						  	type = 'datetime-local'
							className="items-center text-center block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
						  />
                        </div>
                      </div>

                      {/* Privacy */}
                      <fieldset>
                        <div className="space-y-2 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:px-6 sm:py-5">
                          <div>
                            <legend className="text-sm font-medium text-gray-900">Privacy</legend>
                          </div>
                          <div className="space-y-5 sm:col-span-2">
                            <div className="space-y-5 sm:mt-0">
                              <div className="relative flex items-start">
                                <div className="absolute flex items-center h-5">
                                  <input
                                    id="public-access"
                                    name="privacy"
                                    aria-describedby="public-access-description"
                                    type="radio"
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                    defaultChecked
                                  />
                                </div>
                                <div className="pl-7 text-sm">
                                  <label htmlFor="public-access" className="font-medium text-gray-900">
                                    All Details
                                  </label>
                                  <p id="public-access-description" className="text-gray-500">
                                    Spreadsheet containing full amount information, including sums of who donated what.
                                  </p>
                                </div>
                              </div>
                              <div className="relative flex items-start">
                                <div className="absolute flex items-center h-5">
                                  <input
                                    id="restricted-access"
                                    name="privacy"
                                    aria-describedby="restricted-access-description"
                                    type="radio"
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                  />
                                </div>
                                <div className="pl-7 text-sm">
                                  <label htmlFor="restricted-access" className="font-medium text-gray-900">
                                    Fee Differences
                                  </label>
                                  <p id="restricted-access-description" className="text-gray-500">
								  	Details on the amount we are required to disburse, and how much we&apos;ve collected. The difference is the gain or loss based on the fees.
                                  </p>
                                </div>
                              </div>
                              <div className="relative flex items-start">
                                <div className="absolute flex items-center h-5">
                                  <input
                                    id="private-access"
                                    name="privacy"
                                    aria-describedby="private-access-description"
                                    type="radio"
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                  />
                                </div>
                                <div className="pl-7 text-sm">
                                  <label htmlFor="private-access" className="font-medium text-gray-900">
                                    Category Sums
                                  </label>
                                  <p id="private-access-description" className="text-gray-500">
                                    Sum of how much to send from each category
                                  </p>
                                </div>
                              </div>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex flex-col space-between space-y-4 sm:flex-row sm:items-center sm:space-between sm:space-y-0">
                              <div className="flex-1">
                                <a
                                  href="#"
                                  className="group flex items-center text-sm text-blue-600 hover:text-blue-900 font-medium space-x-2.5"
                                >
                                  <LinkIcon
                                    className="h-5 w-5 text-blue-500 group-hover:text-blue-900"
                                    aria-hidden="true"
                                  />
                                  <span>Copy link</span>
                                </a>
                              </div>
                              <div>
                                <a
                                  href="#"
                                  className="group flex items-center text-sm text-gray-500 hover:text-gray-900 space-x-2.5"
                                >
                                  <QuestionMarkCircleIcon
                                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <span>Learn more about sharing</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                    <div className="space-x-3 flex justify-start">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}