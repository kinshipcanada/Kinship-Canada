import { InstantSearch, RangeInput, connectHits, NumericMenu, connectSearchBox, Configure, connectRange, connectRefinementList, connectPagination } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch"
import { MailIcon } from "@heroicons/react/solid";
import { ArrowsExpandIcon, InformationCircleIcon, SearchIcon } from "@heroicons/react/outline";
const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
);
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { supabase } from "../../lib/supabaseClient";
  
export default function ReceiptModal() {
    return (
        <div>
            <InstantSearch searchClient={searchClient} indexName="donations">
                <CustomSearchBox />
                <CustomHits />
            </InstantSearch>
      </div>
    )
}
  
export function SearchBox({ currentRefinement, isSearchStalled, refine }) {
    return (
        <form noValidate action="" role="search" className = 'w-full mr-2 mb-3'>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon className="h-6 w-6 text-gray-400 mr-4" aria-hidden="true" />
                </div>
                <input
                    type="search"
                    value={currentRefinement}
                    onChange={event => refine(event.currentTarget.value)}
                    placeholder = 'Search for a donation ID, donor, etc'
                    className = "block w-full bg-white border border-gray-300 rounded-md py-2 pl-12 pr-3 text-lg placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                </div>
            {isSearchStalled ? 'Loading...' : ''}
        </form>
    );
}

const CustomSearchBox = connectSearchBox(SearchBox);

const Hits = ({ hits }) => {
    const [open, setOpen] = useState(false)
    const [donationId, setDonationId] = useState('')

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="border border-gray-200 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Name
                        </th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Status
                        </th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Amount
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {hits.map((hit) => (
                            <tr key={hit.email}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                    <div className="">
                                        <div className="text-sm font-medium text-gray-900">{hit.email}</div>
                                    </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={hit.live_mode == "true" ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"}>
                                        {hit.live_mode == "true" ? "Live" : "Test"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${parseFloat(hit.amount/100)} CAD</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="items-center justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <MailIcon className="w-4 h-4 mr-1" />
                                            Upload Proof
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <MailIcon className="w-4 h-4 mr-1" />
                                            Send Receipt
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div 
                                        className="cursor-pointer p-2 hover:bg-gray-50 transition-200 items-center flex justify-center rounded-md"
                                        onClick={() => {
                                            setDonationId(hit.id)
                                            setOpen(true)
                                        }}
                                    >
                                        <ArrowsExpandIcon className="w-4 h-4" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
            <Information open={open} setOpen={setOpen} donation_id={donationId} />
        </div>
);
}
const CustomHits = connectHits(Hits);

/* This example requires Tailwind CSS v2.0+ */


export function Information({ donation_id, open, setOpen }) {

    const [loading, setLoading] = useState(true)
    const [donation, setDonation] = useState([])
    const cancelButtonRef = useRef(null)

    useEffect(async () => {
        const { data, error } = await supabase
            .from('donations')
            .select(`
                amount,
                amount_eligible,
                causes,
                currency,
                date,
                direct,
                email,
                fees_paid,
                live_mode,
                logged,
                payment_method,
                proof_available,
                stripe_donor_id,
                stripe_payment_id,
                user_id (
                    id,
                    first_name,
                    last_name,
                    address,
                    city,
                    country,
                    state,
                    postal_code
                )
            `)
            .eq('id', donation_id)

        if (error) {
            console.error(error)
        } else {
            console.log(data)
            setDonation(data[0])
            setLoading(false)
        }
    }, [donation_id])

    return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Donation Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Details for the donation {donation_id}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        {loading ? "Loading..." : 
                        
                        <div className="grid grid-cols-1 gap-2">
                            <p>
                                <span className="font-bold">Created At: </span>
                                {new Date(Date.parse(donation.logged)).toLocaleDateString()}
                            </p>

                            <p>
                                <span className="font-bold">From: </span>
                                {donation.user_id.first_name} {donation.user_id.last_name}
                            </p>

                            <p>
                                <span className="font-bold">Donor Address: </span>
                                {donation.user_id.address}, {donation.user_id.city}, {donation.user_id.state}, {donation.user_id.postal_code}
                            </p>

                            <p>
                                <span className="font-bold">Amount: </span>
                                ${parseFloat(donation.amount/100).toFixed(2)} {donation.currency}
                            </p>

                            <p>
                                <span className="font-bold">Eligible: </span>
                                ${parseFloat(donation.amount/100).toFixed(2)} {donation.currency}
                            </p>

                            <div className="text-center items-center">
                                <span className="font-bold">Paid with {donation.payment_method.card_brand.toUpperCase()}</span>
                                **** **** **** {donation.payment_method.card_last_four}
                            </div>
                        </div>
                        }
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Issue Receipt
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
