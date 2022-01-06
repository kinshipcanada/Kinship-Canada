import Navbar from "../../components/Root/Navbar"
import Footer from "../../components/Root/Footer"
import Link from "next/link"
import { ExternalLinkIcon } from "@heroicons/react/outline"
import { useState, useEffect, useRef, Fragment } from "react"
import { CheckIcon } from "@heroicons/react/outline"
import { Dialog, Transition } from '@headlessui/react'

export default function Orphans() {

    const [open, setOpen] = useState(false)
    const [cart, setCart] = useState([]);
    const [customAmount, setCustomAmount] = useState(null);
    const [error, setError] = useState(null);
    const cancelButtonRef = useRef(null)

    const handleSubmit = () => {
        if (customAmount == null) {
            setError("Please enter an amount")
        } else {
            setError(null)
            addToCart(customAmount, "campaign_orphans_iraq", "12 Orphans Campaign", true, false, "Rraq", "one-time")
            setOpen(true)
        }
    }

    useEffect(async ()=>{
        let cart = JSON.parse(localStorage.getItem('kinship_cart'))
        
        if (cart) {
        setCart(cart)
        } else {
        setEmpty(true)
        }
    },[])

    const addToCart = (amount, causeId, causeName, eligibleVal, recurringVal, regionVal, intervalVal) => {

		let amountToAdd = amount;
		let causeToAddID = causeId;
		let causeToAddName = causeName;
		let eligible = eligibleVal; 
		let recurring = recurringVal;
		let region = regionVal;
		let interval = intervalVal

		let newItem = {
			id: causeToAddID,
			name: causeToAddName,
			amount: parseFloat(amountToAdd).toFixed(2),
			eligible: eligible,
			recurring: recurring,
			region: region,
			interval: intervalVal,
		}

		let state = checkForItem(cart, causeToAddID, recurring)

		if (state == false) {
			cart.push(newItem);
		} else {
			for (var i = 0; i < cart.length; i++) {
				if (cart[i]['id'] === newItem['id']) {
				cart[i]['amount'] = (parseFloat(cart[i]['amount']) + parseFloat(amountToAdd));
				}
			}
		}

		setCart(cart)
		localStorage.setItem('kinship_cart', JSON.stringify(cart));

	}

    const checkForItem = (a, obj, rec) => {
		for (var i = 0; i < a.length; i++) {
		if (a[i]['id'] === obj) {
			if (a[i]['recurring'] == rec) {
				return true;
			}
		}
		}
		return false;
	}

    return (
        <div>
            <Navbar />
            <div className = "p-8">
                <h1 className = "font-medium text-2xl mb-3">Help Support An Orphan</h1>
                <p className = "font-regular text-lg">Kinship Canada is raising for a campaign to try and sponser 12 children this month, in the name of Sayyida Fatema (A.S.). Please contribute as much as you can. All proceeds from this campaign will go to the Al-Anwar Foundation, in Najaf, Iraq.</p>
                <div className = "flex justify-center mt-4">
                    <Link href='https://buy.stripe.com/00geVg5ktcO8bmM6or'>
                        <a className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                            Donate $150 Per Month
                            <ExternalLinkIcon className = "ml-2 w-5 h-5"/>
                        </a>
                    </Link>
                    <Link href='https://buy.stripe.com/5kAfZk8wF5lG2QgdQU'>
                        <a className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                            Donate $1800 For A Year
                            <ExternalLinkIcon className = "ml-2 w-5 h-5"/>
                        </a>
                    </Link>
                </div>
                <div className = "flex justify-center mt-4 text-sm font-medium">
                <p>or:</p>
                </div>
                <div className = "flex justify-center mt-4">
                    <input
                        type="text"
                        name="price"
                        id="amount"
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="focus:ring-blue-500 w-1/3 focus:border-blue-500 block  pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        aria-describedby="price-currency"
                    />
                    <button onClick = {handleSubmit} className = "ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">Donate Custom Amount</button>
                </div>
                {error ? 
                
                <div className = "flex justify-center mt-4 text-sm font-medium text-red-600">
                    <p>{error}</p>
                </div>
                
                : 
                
                <></>
                
                }

                <div className = "mt-4 flex items-center justify-center">
                    <img src = "/campaigns/orphans/main.jpeg" className = "mt-4 w-1/2" />
                </div>
            </div>
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
						<div>
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
							<CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
							</div>
							<div className="mt-3 text-center sm:mt-5">
							<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
								Thanks for adding to your bag!
							</Dialog.Title>
							<div className="mt-2">
								<p className="text-sm text-gray-500">
								Thanks for adding your donation. Please go to your cart to checkout. After this, you will receive a tax receipt and confirmation by email.
								</p>
							</div>
							</div>
						</div>
						<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
							<Link href = '/cart'>
								<button
								type="button"
								className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-500 sm:col-start-2 sm:text-sm"
								>
									Go to cart
								</button>
							</Link>
							<button
							type="button"
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
							onClick={() => setOpen(false)}
							>
								Close Popup
							</button>
						</div>
						</div>
					</Transition.Child>
					</div>
				</Dialog>
				</Transition.Root>
            <Footer />
        </div>
    )
}