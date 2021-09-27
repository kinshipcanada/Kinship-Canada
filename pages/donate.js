import Navbar from '../components/Root/Navbar.js'
import { supabase } from '../lib/supabaseClient'
import { useState, useEffect, useRef, Fragment } from 'react'
import { RadioGroup } from '@headlessui/react'
import { AcademicCapIcon, CheckIcon, UserGroupIcon, BriefcaseIcon, GlobeIcon, HeartIcon, HomeIcon, CashIcon, GiftIcon, BookOpenIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const causes = [
	{
		id: "1f9856db-d3f4-4d82-ae9b-0c343998d512",
		name: 'Orphans',
		icon: UserGroupIcon,
		bgColor: 'bg-blue-600',
		regions: [
			{
			  "name": "Iraq",
			  "options": [
				{
				  "amount": 500,
				  "interval": "year",
				  "buys": "Education for one orphan for one year"
				}
			  ]
			},
			{
			  "name": "India",
			  "options": []
			},
			{
			  "name": "Al-Ayn",
			  "options": [
				{
				  "amount": 150,
				  "interval": "month",
				  "buys": "Complete care for one orphan for one month"
				}
			  ]
			}
		],
		eligible: true,
		blurb: 'Cover housing, education, and food for an orphan'
	},
	{
		id: "90c7ced8-db3b-49fd-83bf-2e9502b5089f",
		name: 'Poverty Relief',
		icon: BriefcaseIcon,
		bgColor: 'bg-red-600',
		regions: [
			{
			  "name": "Iraq",
			  "options": []
			},
			{
			  "name": "India",
			  "options": [
				{
				  "amount": 250,
				  "interval": "one-time",
				  "buys": "Basic hand pump"
				},
				{
				  "amount": 650,
				  "interval": "one-time",
				  "buys": "Deluxe hand pump"
				}
			  ]
			},
			{
			  "name": "Al-Ayn",
			  "options": []
			}
		  ],
		eligible: true,
		blurb: "Help cover a family's basic needs, including housing and food."
	},
	{
		id: "cd610320-4978-4c63-a5dd-bd6bc26e5553",
		name: 'Education',
		icon: AcademicCapIcon,
		bgColor: 'bg-green-600',
		regions: [
			{
			  "name": "Iraq",
			  "options": [
				{
				  "amount": 142,
				  "interval": "month",
				  "buys": "schooling, books, and supplies for one child"
				}
			  ]
			},
			{
			  "name": "India",
			  "options": [
			  {
				"amount": 550,
				"interval": "month",
				"buys": "schooling, books, and supplies for one child"
			  }
			  ]
			},
			{
			  "name": "Africa",
			  "options": []
			}
		],
		eligible: true,
		blurb: "Educate the next generation. Covers a student's tuition, books, and stationary."
	},
	

]

export default function Home() {

	const [causeList, setCauseList] = useState([])
	const [step, setStep] = useState(1);
	const [cart, setCart] = useState([])
	const [userCauses, setUserCauses] = useState([])
	const [dropdownAmounts, setDropdownAmounts] = useState([])
	const [addToBasketButton, setAddToBasketButton] = useState('Add to basket')

	const [stepOneError, setStepOneError] = useState(null);
	const [stepThreeError, setStepThreeError] = useState(null);

	const [stateSample, setStateSample] = useState('hello');
	const [open, setOpen] = useState(false)

	const cancelButtonRef = useRef(null)
	useEffect(()=>{
		if (JSON.parse(localStorage.getItem('kinship_cart')) != null) {
		setCart(JSON.parse(localStorage.getItem('kinship_cart')))
		} 
	},[])

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

	const addToCart = (amount, causeId, causeName, eligibleVal, recurringVal, regionVal) => {

		let amountToAdd = amount;
		let causeToAddID = causeId;
		let causeToAddName = causeName;
		let eligible = eligibleVal; 
		let recurring = recurringVal;
		let region = regionVal;

		let newItem = {
			id: causeToAddID,
			name: causeToAddName,
			amount: parseFloat(amountToAdd),
			eligible: eligible,
			recurring: recurring,
			region: region,
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

	const removeFromCart = (obj, rec) => {
		for (var i = 0; i < cart.length; i++) {
		if (cart[i]['id'] === obj) {
			if (cart[i]['recurring'] == rec) {
				cart.splice(i, 1)
			}
		}
		}
		setCart(cart)
		localStorage.setItem('kinship_cart', JSON.stringify(cart));
	}

	const submitStepOne = (event) => {
		event.preventDefault();

		if (userCauses.length == 0) {
			setStepOneError('Please select at least one cause')
		} else {
			setStep(2);
		}
	}

	const submitStepTwo = (event) => {
		event.preventDefault();

		let new_userCauses = []


		for (let i = 0; i < userCauses.length; i++) {
			if (userCauses[i]['region'] == undefined) {
				setStepThreeError('Please select a region')
			} else {

				

				for (let i = 0; i < userCauses.length; i++) {
					let id = userCauses[i]['id'];
					let region = userCauses[i]['region'];
					let options;

					for (let x = 0; x < causes.length; x++) {
						if (causes[x]['id'] == id) {
							let region_full_list = causes[x]['regions'];
							
							for (let n = 0; n < region_full_list.length; n++) {
								if (region_full_list[n]['name'] == region) {
									options = region_full_list[n];
								
								}
							}
						}
					}

					let temp = {
						id: userCauses[i]['id'],
						eligible: userCauses[i]['eligible'],
						name: userCauses[i]['name'],
						region: userCauses[i]['region'],
						options: options,
					}

					userCauses[i]['options'] = options;
				}

				setStep(3);

			}
		}
	}

	const submitStepThree = (event) => {
		event.preventDefault();
		

		for (let i = 0; i < userCauses.length; i++) {
			console.log(userCauses[i]);
			let amountToAdd = userCauses[i]['amount'];
			let causeToAddID = userCauses[i]['id'];
			let causeToAddName = userCauses[i]['name'];
			let eligible = userCauses[i]['eligible'];
			let recurring = userCauses[i]['recurring'];
			let region = userCauses[i]['region'];
			
			addToCart(amountToAdd, causeToAddID, causeToAddName, eligible, recurring, region)
		}

		setAddToBasketButton('Added to basket succesfully!')
		setOpen(true)
	}

  	return (
    <div>
      <Navbar />
      <div className = 'p-10'>
	  	<form  onSubmit = {submitStepOne} className = {step == 1 ? '' : 'opacity-50'}>
		  	<div className="md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
				<h2 className={step == 1 ? "text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate" : "text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate opacity-50"}>Step One: Choose A Cause</h2>
				</div>
			</div>
			<div className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{causes.map((cause) => (
					<div key = {cause.id} className="bg-white overflow-hidden shadow rounded-lg">
						<div className="px-4 py-5 sm:px-6">
							<div className = 'flex flex-col'>
								<div className = 'flex'>
									<div
										className={cause.bgColor +  ' text-white p-3 rounded mb-3 w-auto h-auto'}
									>
										<cause.icon className = 'w-6 h-6'/>
									</div>
								</div>
								<div>
									<label htmlFor = {cause.id} className="text-gray-900 font-medium hover:text-gray-600">{cause.name}</label>
									<p className="text-gray-500 text-sm">{cause.blurb}</p>
									<p className = 'text-sm font-semibold mt-2'>Availiable in:{' '}
										{cause.regions.map((region, regionIdx)=>(
											<span key = {regionIdx} className = 'font-normal'>{region.name} | </span>
										))}
									</p>
								</div>
							</div>
						</div>
						<div className="bg-gray-50">
							<label className = 'w-full h-full flex items-center cursor-pointer px-4 py-5 sm:p-6'>
							<input type = 'checkbox' id = {cause.id} 
								onChange = {(e)=>{
									let status = e.target.checked;

									if (status) {
										causeList.push(cause);
										let temp = {
											name: cause.name,
											id: cause.id,
											region: undefined,
											eligible: cause.eligible,
										}
										userCauses.push(temp);
									} else {
										let index = causeList.indexOf(cause.id);
										causeList.splice(index, 1);
										let user_index = userCauses.indexOf(cause.id);
										userCauses.splice(user_index, 1);
									}
								}}
								className = 'text-lg ml-3 mr-2 rounded-md'
							/>
							<p className = 'text-md font-medium'>Select {cause.name}</p>
							</label>
						</div>
						</div>
				))}
			</div>

			<div className = 'p-4 flex justify-center'>
				<button type = 'submit' className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Continue</button>
			</div>

			{
				stepOneError && step == 1 ? 

				<p className = 'text-red-600 font-semibold'>{stepOneError}</p>

				:

				''
			}
		</form>

      	
      		{
		    	step >= 2 ?

		    		<div>

					    <div className={step == 2 ? "md:flex md:items-center md:justify-between" : "md:flex md:items-center md:justify-between opacity-25"}>
					      <div className="flex-1 min-w-0">
					        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Choose A Region</h2>
					      </div>
					    </div>

			      	<div className = {step == 2 ? 'mt-4 mb-4' : 'mt-4 mb-4 opacity-50'}>
					  	<form onSubmit = {submitStepTwo}>
							{causeList.map((cause)=>(
								<div key = {cause.id}>
									{console.log(cause)}
									<h3 className="text-xl font-semibold leading-7 text-gray-900 sm:text-xl sm:truncate">Cause: {cause.name}</h3>
									<div key = {cause.id}>
										<div className = 'grid grid-cols-4 gap-6 mt-4 mb-4'>
											{cause.regions.map((region)=>(
												<label key = {region.name} className = 'col-span-1 p-4 border rounded flex justify-between items-center' htmlFor = {region.name + cause.id}>
													<div className = 'flex flex-row items-center'>
														<input type = 'radio' className = 'mr-2' value = {region.name} name = {cause.id} id = {region.name + cause.id} onClick = {(e)=>{
															let regionVal = e.target.value;
															let causeVal = cause.id;
															let status = e.target.checked;

															for (let i = 0; i < userCauses.length; i++) {
																if (userCauses[i]['id'] == causeVal) {
																	userCauses[i]['region'] = regionVal;
																}
															}
												
														}}/>
														<p className = 'text-lg font-semibold' >{region.name}</p>
													</div>
													<div>
														{
															region.name == 'Africa'

															?

															<div>
																<Image src = '/regions/africa.png' width = '60' height = '60' />
															</div>

															:

															region.name == 'India'

															?

															<div>
																<Image src = '/regions/india.png' width = '60' height = '60' />
															</div>

															:

															region.name == 'Iraq' 
														
															?

															<div>
																<Image src = '/regions/iraq.png' width = '60' height = '60' />
															</div>

															:

															''
														}
													</div>
												</label>
											))}
										</div>
									</div>
								</div>
							))}
							{
								stepThreeError ? 

								<p className = 'text-red-600 font-semibold'>{stepThreeError}</p>

								:

								''
							}
							<div className = 'p-4 flex justify-center'>
								<button type = 'submit' className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Continue</button>
							</div>
						</form>
			      	</div>
			      </div>

		    	: step < 2 ?
				
				''

				: 

		    	<div className = 'opacity-50'>

					    <div className="md:flex md:items-center md:justify-between">
					      <div className="flex-1 min-w-0">
					        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Choose A Region</h2>
					      </div>
					    </div>

			      	<div className = 'flex justify-between mt-4 mb-4'>
					  <form onSubmit = {submitStepTwo}>
							{causeList.map((cause)=>(
								<div key = {cause.id}>
									<h1>{cause.name}</h1>
									<div>
										Regions selected
									</div>
									
								</div>
							))}
							<button type = 'submit'>Continue</button>
						</form>
			      	</div>
			      </div>
		    }

			{
		    	step == 3 ?
				
				<form className="md:flex md:items-center md:justify-between" onSubmit = {submitStepThree}>

		    		<div>

					    <div className="md:flex md:items-center md:justify-between">
					      <div className="flex-1 min-w-0">
					        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Choose An Amount</h2>
					      </div>
					    </div>

			      	<div className = 'flex justify-between mt-4 mb-4'>
						<div onSubmit = {submitStepThree}>
							{causeList.map((cause)=>(
								<div key = {cause.id}>
									<h1 className="text-xl font-semibold leading-7 text-gray-900 sm:text-xl sm:truncate">Cause: {cause.name}</h1>

									<select 
										id = {cause.id + '_select'}
										className="mt-2 mb-2 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
										onChange = {
											(e)=>{
												let value = e.target.value;

												if (value == 'custom') {
													let obj_select = document.getElementById(cause.id + '_select');
													let obj_input = document.getElementById(cause.id + '_custom');

													obj_select.classList.add('hidden');
													obj_input.classList.remove('hidden');
												} else {
													let details = e.target.value.split('_');
													
													for (let i = 0; i < userCauses.length; i++) {
														if (userCauses[i]['id'] == cause.id) {
															userCauses[i].amount = details[0];
															userCauses[i].interval = details[1];

															if (details[1] == 'one-time') {
																userCauses[i].recurring = false;
															} else {
																userCauses[i].recurring = true;
															}
														}
													}
												}
											}
										}
									>
										<option>Select One</option>
										{
											userCauses.map((causeVal)=>(
												<>	
													{
														causeVal.id == cause.id ?

														<>
															{causeVal.options.options.map((option)=>(
																<option key = {option.amount}>${option.amount} {option.interval == 'one-time' ? ' once ' : ' per ' + option.interval} buys {option.buys}</option>
															))}
														</>

														:

														<></>
													}
												</>
											))
										}
										<option value = 'custom'>Choose a custom amount (we will pool funds until we can provide one full donation)</option>
									</select>
									<input 
										placeholder = 'Choose a custom amount to donate' 
										id = {cause.id + '_custom'} 
									    type = 'text'
										className="mt-2 mb-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 hidden"
									/>
									
								</div>
							))}
							
						</div>
			      	</div>
					  
			      </div>
				  <div className = 'p-4 flex justify-center'>
						<button type = 'submit' className="inline-flex items-center px-6 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{addToBasketButton}</button>
					</div>
				</form>
		    	: step < 3 ?
				
				''

				: 

		    	<div className = 'opacity-50'>

					    <div className="md:flex md:items-center md:justify-between">
					      <div className="flex-1 min-w-0">
					        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Choose An Amount</h2>
					      </div>
					    </div>

			      	<div className = 'flex justify-between mt-4 mb-4'>
						{console.log(dropdownAmounts)}
						<form onSubmit = {submitStepThree}>
							<div className = 'p-4 flex justify-center'>
								<button type = 'submit' className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add to cart</button>
							</div>
						</form>
			      	</div>
			      </div>
		    }
      	
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
								Thanks for adding your donation. You can go to your cart now if you&apos;d like, but make sure you are logged in to manage any recurring donations. You will receive tax receipts whether or not you are logged in.
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
							ref={cancelButtonRef}
							>
							Close message
							</button>
						</div>
						</div>
					</Transition.Child>
					</div>
				</Dialog>
				</Transition.Root>
      </div>
    </div>
  )
}
