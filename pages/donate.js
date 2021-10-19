import Navbar from '../components/Root/Navbar.js'
import { supabase } from '../lib/supabaseClient'
import { useState, useEffect, useRef, Fragment } from 'react'
import { FocusTrap, RadioGroup } from '@headlessui/react'
import { AcademicCapIcon, CheckIcon, UserGroupIcon, BriefcaseIcon, GlobeIcon, HeartIcon, HomeIcon, CashIcon, GiftIcon, BookOpenIcon, CurrencyDollarIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import Footer from '../components/Root/Footer'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Note: This page is currently a bit of a mess and will be undergoing cleanup

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
				  "buys": "Basic needs for one orphan for one year - provided by Al Anwar Iraq"
				},
				{
					"amount": 150,
					"interval": "month",
					"buys": "Complete care for one orphan for one month - provided by Al Ayn Iraq"
				}
			  ]
			},
			{
			  "name": "India",
			  "options": [
				{
					"amount": 1500,
					"interval": "year",
					"buys": "Housing support, education, and food for one year"
				},
				{
					"amount": 125,
					"interval": "month",
					"buys": "Housing support, education, and food for one month"
				}
			  ]
			},
			
		],
		eligible: true,
		blurb: 'Covers basic housing, education, and food for orphans'
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
				"name": "Africa",
				"options": []
			},
			{
				"name": "Canada",
				"options": []
			}
		  ],
		eligible: true,
		blurb: "Help cover a family or an area's basic needs such as water pumps, food banks, food rations, and more."
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
				  "amount": 150,
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
					"interval": "year",
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
		blurb: "Educate the next generation. Covers a student's tuition, books, and stationery."
	},
	{
		id: "5",
		name: 'Widows',
		icon: AcademicCapIcon,
		bgColor: 'bg-yellow-600',
		regions: [
			{
			  "name": "India",
			  "options": [
			  {
				"amount": 150,
				"interval": "month",
				"buys": "housing support and food rations"
			  }
			  ]
			},
		],
		eligible: true,
		blurb: "Support for food and shelter for widows."
	},
	{
		id: "6",
		name: 'Medical Aid',
		icon: AcademicCapIcon,
		bgColor: 'bg-blue-600',
		regions: [
			{
			  "name": "India",
			  "options": [
				{
					"amount": 225,
					"interval": "one-time",
					"buys": "wheelchair"
				}
			  ]
			},
			{
				"name": "Africa",
				"options": []
			},
			{
			"name": "Iraq",
			"options": [
				{
					"amount": 150,
					"interval": "one-time",
					"buys": "wheelchair"
				}
			]
			},
		],
		eligible: true,
		blurb: "Contribute towards medical aid such as wheelchairs, surgeries, medication, etc."
	},
	{
		id: "7",
		name: 'Housing',
		icon: AcademicCapIcon,
		bgColor: 'bg-red-600',
		regions: [
			{
			  "name": "India",
			  "options": [
				{
					"amount": 5400,
					"interval": "one-time",
					"buys": "one bedroom home"
				},
				{
					"amount": 6500,
					"interval": "one-time",
					"buys": "two bedroom home"
				}
			  ]
			},
			{
			"name": "Iraq",
				"options": []
			},
		],
		eligible: true,
		blurb: "Help build a basic home with one or two bedrooms, kitchen, and a bathroom"
	},
	{
		id: "8",
		name: "Qur'an",
		icon: BookOpenIcon,
		bgColor: 'bg-green-600',
		regions: [
			{
			  "name": "India",
			  "options": [
					{
						"amount": 25,
						"interval": "one-time",
						"buys": "one quran read in the name of your marhum"
					},
			  ]
			},
		],
		eligible: false,
		blurb: "Recitation of the Holy Quran in the name of your marhum."
	},
	{
		id: "9",
		name: 'Qadha Salah and Fasting',
		icon: BookOpenIcon,
		bgColor: 'bg-yellow-600',
		regions: [
			{
			  "name": "India",
			  "options": [
					{
						"amount": 300,
						"interval": "one-time",
						"buys": "one year of missed prayers"
					},
					{
						"amount": 200,
						"interval": "one-time",
						"buys": "one month of fasting"
					},
			  ]
			},
		],
		eligible: false,
		blurb: "A person in need will perform one year of salah or fasting in the name of your marhum"
	},

]

export default function Home() {

	const [causeList, setCauseList] = useState([])
	const [step, setStep] = useState(1);
	const [cart, setCart] = useState([])
	const [userCauses, setUserCauses] = useState([])
	const [basketableCauses, setBasketableCauses] = useState([])
	const [dropdownAmounts, setDropdownAmounts] = useState([])
	const [addToBasketButton, setAddToBasketButton] = useState('Add to basket')

	const [stepOneComplete, setStepOneComplete] = useState(false)
	const [stepTwoComplete, setStepTwoComplete] = useState(false)
	const [stepThreeComplete, setStepThreeComplete] = useState(false)

	const [stepOneError, setStepOneError] = useState(null);
	const [stepFourError, setStepFourError] = useState(null)
	const [stepThreeError, setStepThreeError] = useState(null);

	const [open, setOpen] = useState(false)

	const cancelButtonRef = useRef(null)

	useEffect(()=>{
		if (JSON.parse(localStorage.getItem('kinship_cart')) != null) {
		setCart(JSON.parse(localStorage.getItem('kinship_cart')))
		} 
	},[])

	const steps = [
		{ id: 'Step 1', name: 'Choose your causes', href: '#StepOne', status: stepOneComplete },
		{ id: 'Step 2', name: 'Choose regions to donate to', href: '#StepTwo', status: stepTwoComplete },
		{ id: 'Step 3', name: 'Choose an amount', href: '#StepThree', status: stepThreeComplete },
	] 

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
			setStepOneComplete(true)
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
				setStepTwoComplete(true)

			}
		}
	}

	const submitStepThree = (event) => {
		event.preventDefault();
		
		if (basketableCauses.length != userCauses.length) {
			setStepFourError('Please choose an amount to donate')
		} else {
			for (let i = 0; i < basketableCauses.length; i++) {
				let item = basketableCauses[i]
				addToCart(item['amount'], item['id'], item['cause'], item['eligible'], item['recurring'], item['region'], item['interval'])
			}

			setAddToBasketButton('Added to basket succesfully!')
			setStepThreeComplete(true)
			setOpen(true)
		}
		
	}

  	return (
    <div>
      <Navbar />
      <div className = 'p-10'>
		{/* Progress bar */}
		<nav aria-label="Progress" className = {step == 1 ? 'mb-8 sticky top-0 bg-white pb-4 opacity-100 z-10' : 'mb-8 sticky top-0 bg-white pb-4 opacity-100 z-10'}>
			<ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
			{steps.map((step) => (
				<li key={step.name} className="md:flex-1">
				{step.status == true ? (
					<a
					href={step.href}
					className="group pl-4 py-2 flex flex-col border-l-4 border-blue-600 hover:border-blue-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-8"
					>
					<span className="text-xs text-blue-600 font-semibold tracking-wide uppercase group-hover:text-blue-800">
						{step.id}
					</span>
					<span className="text-sm font-medium">{step.name}</span>
					</a>
				) : (
					<a
					href={step.href}
					className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-8"
					>
					<span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
						{step.id}
					</span>
					<span className="text-sm font-medium">{step.name}</span>
					</a>
				)}
				</li>
			))}
			</ol>
		</nav>
		<>
	  	<form  onSubmit = {submitStepOne} id = 'StepOne' className = {step == 1 ? '' : 'opacity-50'}>
		  	<div className="md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
				<h2 className={step == 1 ? "text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate" : "text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate opacity-50"}>Step One: Choose Which Causes You Would Like To Contribute To{' '}{/* <a>How does this work?</a> */}</h2>
				</div>
			</div>
			<div className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
				{causes.map((cause) => (
					<label htmlFor = {cause.id} key = {cause.id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col self-stretch">
						<div className="px-4 py-5 sm:px-6 flex self-stretch h-full">
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
											<span key = {regionIdx} className = 'font-normal'>{region.name}{regionIdx != (cause.regions.length - 1) ? ' | ' : ''}</span>
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
					</label>
				))}
				<div className="bg-white overflow-hidden shadow rounded-lg flex flex-col self-stretch">
					<div className="px-4 py-5 sm:px-6 flex self-stretch h-full">
						<div className = 'flex flex-col'>
							<div className = 'flex'>
								<div
									className='bg-green-600 text-white p-3 rounded mb-3 w-auto h-auto'
								>
									<CashIcon className = 'w-6 h-6'/>
								</div>
							</div>
							<div>
								<label className="text-gray-900 font-medium hover:text-gray-600">Microfinancing</label>
								<p className="text-gray-500 text-sm">Help finance a small business and lift a family out of poverty. Help a generation get off the ground and break the cycle.</p>
								<p className = 'text-sm font-semibold mt-2'>Availiable anywhere
								</p>
							</div>
						</div>
					</div>
					<div className="bg-gray-50">
						<label className = 'w-full h-full flex items-center cursor-pointer px-4 py-5 sm:p-6'>
							<Link href = '/campaigns/microfinancing'>
								<p className = 'text-md font-medium flex items-center'>
									View Microfinancing Campaign
									<ArrowRightIcon className = 'w-4 h-4 ml-2' />
								</p>
							</Link>
						</label>
					</div>
					</div>


					<div className="bg-white overflow-hidden shadow rounded-lg flex flex-col self-stretch">
						<div className="px-4 py-5 sm:px-6 flex self-stretch h-full">
							<div className = 'flex flex-col'>
								<div className = 'flex'>
									<div
										className='bg-yellow-600 text-white p-3 rounded mb-3 w-auto h-auto'
									>
										<CurrencyDollarIcon className = 'w-6 h-6'/>
									</div>
								</div>
								<div>
									<label className="text-gray-900 font-medium hover:text-gray-600 items-center mb-2">
										Khums
										<span className="ml-2 border border-yellow-800 inline-flex items-center px-2 py-0.25 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
											Coming Soon...
										</span>
									</label>
									<p className="text-gray-500 text-sm">Pay your Sehme Imam and Sehme Sadat khums through Kinship Canada. Coming soon...</p>
									<p className = 'text-sm font-semibold mt-2'>Availiable anywhere
									</p>
								</div>
							</div>
						</div>
						<div className="bg-gray-50">
							<label className = 'w-full h-full flex items-center cursor-pointer px-4 py-5 sm:p-6'>
								<Link href = '#'>
									<p className = 'text-md font-medium flex items-center cursor-not-allowed'>
										Khums Page Coming Soon
										{/* <ArrowRightIcon className = 'w-4 h-4 ml-2' /> */}
									</p>
								</Link>
							</label>
						</div>
					</div>

					<div className="bg-white overflow-hidden shadow rounded-lg flex flex-col self-stretch">
						<div className="px-4 py-5 sm:px-6 flex self-stretch h-full">
							<div className = 'flex flex-col'>
								<div className = 'flex'>
									<div
										className='bg-blue-600 text-white p-3 rounded mb-3 w-auto h-auto'
									>
										<CurrencyDollarIcon className = 'w-6 h-6'/>
									</div>
								</div>
								<div>
									<label className="text-gray-900 font-medium hover:text-gray-600 items-center mb-2">
										Sadaqah
										<span className="ml-2 border border-yellow-800 inline-flex items-center px-2 py-0.25 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
											Coming Soon...
										</span>
									</label>
									<p className="text-gray-500 text-sm">Pay your full Sadaqah obligations with Kinship Canada. Choose among a variety of causes. Coming soon...</p>
									<p className = 'text-sm font-semibold mt-2'>Availiable anywhere
									</p>
								</div>
							</div>
						</div>
						<div className="bg-gray-50">
							<label className = 'w-full h-full flex items-center cursor-pointer px-4 py-5 sm:p-6'>
								<Link href = '#'>
									<p className = 'text-md font-medium flex items-center cursor-not-allowed'>
										Khums Page Coming Soon
										{/* <ArrowRightIcon className = 'w-4 h-4 ml-2' /> */}
									</p>
								</Link>
							</label>
						</div>
					</div>
				
					
			</div>

			<div className = 'p-4 flex justify-center'>
				<button
					type="submit"
					className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
						{step == 1 ? 'Next Step: ' : ''}Choose Regions
					<ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
				</button>
			</div>

			{
				stepOneError && step == 1 ? 

				<p className = 'text-red-600 font-semibold'>{stepOneError}</p>

				:

				''
			}
		</form>
		</>

      	
      		{
		    	step >= 2 ?

		    		<div>

					    <div className={step == 2 ? "md:flex md:items-center md:justify-between" : "md:flex md:items-center md:justify-between opacity-25"}>
					      <div className="flex-1 min-w-0">
					        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Choose A Region</h2>
					      </div>
					    </div>

			      	<div className = {step == 2 ? 'mt-4 mb-4' : 'mt-4 mb-4 opacity-50'}>
					  	<form onSubmit = {submitStepTwo} id = 'StepTwo'>
							{causeList.map((cause)=>(
								<div key = {cause.id}>
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
								<button
									type="submit"
									className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
										{step == 2 ? 'Next Step: ' : ''}Choose Amount To Donate
									<ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
								</button>
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
				
				<form className="md:flex md:items-center md:justify-between" onSubmit = {submitStepThree} id = 'StepThree'>

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

													let amount = obj_input.value
													
												} else {
													let details = e.target.value.split('__');
													
													for (let i = 0; i < userCauses.length; i++) {
														if (userCauses[i]['id'] == cause.id) {
															let amount = parseFloat(details[0]).toFixed(2)
															let interval = details[1]
															let region = details[2]
															let cause = userCauses[i]['name']
															let eligible = userCauses[i]['eligible']
															let id = userCauses[i]['id']
															let recurring

															if (interval == 'one-time') {
																recurring = false 
															} else {
																recurring = true
															}
															
															let causeDetails = {
																amount: amount,
																interval: interval,
																region: region, 
																cause: cause,
																eligible: eligible,
																id: id,
																recurring: recurring
															}

															basketableCauses.push(causeDetails)
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
										<option value = 'null'>Select One</option>
										{
											userCauses.map((causeVal)=>(
												<>	
													{
														causeVal.id == cause.id ?

														<>
															{causeVal.options.options.map((option)=>(
																<option key = {option.amount} value = {option.amount + '__' + option.interval + '__' + causeVal.region}>${option.amount} {option.interval == 'one-time' ? ' once ' : ' per ' + option.interval} buys {option.buys}</option>
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
									
									<div className="mt-1 relative rounded-md shadow-sm hidden" id = {cause.id + '_custom'} >
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<span className="text-gray-500 sm:text-sm">$</span>
										</div>
										<input
											className="mb-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
											placeholder="0.00"
											type = 'text'
											onChange = {(e)=>{
												for (let i = 0; i < userCauses.length; i++) {
													if (userCauses[i]['id'] == cause.id) {
														let amount = e.target.value;
														let interval = 'one-time';
														let recurring = false
														let region = userCauses[i]['region']
														let cause = userCauses[i]['name']
														let eligible = userCauses[i]['eligible']
														let id = userCauses[i]['id']
														let z = 0;

														let causeDetails = {
															amount: amount,
															interval: interval,
															region: region, 
															cause: cause,
															eligible: eligible,
															id: id,
															recurring: recurring
														}

														for (let x = 0; x < basketableCauses.length; x++) {
															if (basketableCauses[x]['id'] == id) {
																basketableCauses[x] = causeDetails
															} else {
																z+=1
															}
														}

														console.log(z)

														if (z == basketableCauses.length) {
															basketableCauses.push(causeDetails)
														}

													}
												}

											}}
										/>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<span className="text-gray-500 sm:text-sm" id="price-currency">
											CAD
											</span>
										</div>
									</div>
									
								</div>
							))}
							{
								stepFourError ? 

								<p className = 'text-red-600 font-semibold'>{stepFourError}</p>

								:

								''
							}
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
							onClick={() => {
								setCauseList([])
								setStep(1);
								setUserCauses([])
								setBasketableCauses([])
								setDropdownAmounts([])
								setAddToBasketButton('Add to basket')
							
								setStepOneComplete(false)
								setStepTwoComplete(false)
								setStepThreeComplete(false)
								
								setStepOneError(null);
								setStepFourError(null)
								setStepThreeError(null);
								setOpen(false);
							}}
							ref={cancelButtonRef}
							>
								Donate More
							</button>
						</div>
						</div>
					</Transition.Child>
					</div>
				</Dialog>
				</Transition.Root>
      </div>
	  <Footer />
    </div>
  )
}
