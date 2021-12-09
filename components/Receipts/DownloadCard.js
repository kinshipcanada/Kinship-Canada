import Link from 'next/link'

export default function DownloadCard({receipt}) {
	console.log(receipt)

	return (
		<section>
	        <div className="border border-gray-300 sm:rounded-md sm:overflow-hidden mb-4">
	          <div className="bg-white py-6 px-4 sm:p-6">
	            <div className = 'flex justify-between'>
	            	<div>
		              <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
		                Tax Receipt For Donation On {new Date(Date.parse(receipt.logged)).toLocaleDateString()}
		              </h2>
		              <p className="mt-1 text-sm text-gray-500">
			             CRA Eligible tax receipt for your donation of {(receipt.amount/100).toFixed(2)} on {new Date(Date.parse(receipt.logged)).toLocaleDateString()}
		              </p>
		            </div>
					<div>
						{/*<span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
					    	Proof Of Donation Available
					    </span>*/}

					    {
					    	receipt.proof_available ? 

					    	<Link href = '/app/proof'>
						    	<a
			                        href="#"
			                        className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5"
			                    >
			                        <div className="absolute flex-shrink-0 flex items-center justify-center">
			                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
			                        </div>
			                        <div className="ml-3.5 text-sm font-medium text-gray-900">Proof Available</div>
			                    </a>
			                </Link>



					    	: 

					    	<a
		                        href="#"
		                        className="cursor-pointer relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5"
		                    >
		                        <div className="absolute flex-shrink-0 flex items-center justify-center">
		                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
		                        </div>
		                        <div className="ml-3.5 text-sm font-medium text-gray-900">Proof Not Available Yet</div>
		                    </a>
					    }
					</div>
	            </div>

	            <div className="mt-6 grid grid-cols-4 gap-6">
	              <div className="col-span-4 sm:col-span-2">
	                <label className="block text-sm font-medium text-gray-800">
	                  Amount Donated
	                </label>
	                <p className="block text-md font-medium text-black">
	                  ${parseFloat(receipt.amount/100).toFixed(2)}
	                </p>
	              </div>

	              <div className="col-span-4 sm:col-span-2">
	                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
	                  Amount Eligible For Receipt
	                </label>
	                <p className="block text-md font-medium text-black">
	                  ${parseFloat(receipt.eligible/100).toFixed(2)}
	                </p>
	              </div>

	              <div className="col-span-4 sm:col-span-2">
	                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
	                  Date Donated
	                </label>
	                <p className="block text-md font-medium text-black">
						{new Date(Date.parse(receipt.logged)).toLocaleDateString()}
	                </p>
	              </div>

	              <div className="col-span-4 sm:col-span-2">
	                <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
	                  Donation Details
	                </label>
	               	<p className="text-md font-medium text-black">
	                  Issued to {receipt.name} at {receipt.address}, {receipt.city}, {receipt.postal_code}
	                </p>
	              </div>

	            </div>
	          </div>
	          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
	          	{
					receipt.proof_available ?

					<Link href = {"/app/proof#" + receipt.id}>
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
						Proof Of Donation
						</button>
					</Link>

					:

					<></>
				}
	            <Link href = {"https://receipts.kinshipcanada.com/" + receipt.id} >
					<a
						target="_blank"
						className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
					>
						View And Download &rarr;
					</a>
				</Link>
	          </div>
	        </div>
	    </section>
	)
}