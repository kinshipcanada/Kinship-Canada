import Navbar from '../components/Root/Navbar.js'

import { supabase } from '../lib/supabaseClient'
import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { AcademicCapIcon, UserGroupIcon, BriefcaseIcon, GlobeIcon, HeartIcon, HomeIcon, CashIcon, GiftIcon, BookOpenIcon, CurrencyDollarIcon } from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const causes = [
	{
		id: 239023,
		name: 'Orphans',
		icon: UserGroupIcon,
		regions: [
			{
				name: 'Iraq',
				options: [
					{
						amount: 500,
						interval: 'year'
					}
				]
			},
			{
				name: 'India',
				options: []
			},
			{
				name: 'Al-Ayn',
				options: [
					{
						amount: 150,
						interval: 'month'
					}
				]
			}
		],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 432341,
		name: 'Poverty Relief',
		icon: BriefcaseIcon,
		regions: ['Africa', 'India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 255432,
		name: 'Education',
		icon: AcademicCapIcon,
		regions: ['Africa', 'India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 849272,
		name: 'Widows',
		regions: ['India'],
		icon: GlobeIcon,
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 119372,
		name: 'Medical Aid',
		icon: HeartIcon,
		regions: ['Africa', 'India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 989387,
		name: 'Housing',
		icon: HomeIcon,
		regions: ['India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 421152,
		name: 'Khums',
		icon: CashIcon,
		regions: ['Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 782923,
		name: 'Qadha',
		icon: GiftIcon,
		regions: ['India'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 391038,
		name: 'Quran',
		icon: BookOpenIcon,
		regions: ['India'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 471937,
		name: 'Microfinancing',
		icon: CurrencyDollarIcon,
		regions: ['India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},

]

export default function Home() {

	const [causeList, setCauseList] = useState([])
	const [step, setStep] = useState(1);
	const [cart, setCart] = useState([])
	const [userCauses, setUserCauses] = useState([])
	
	const [stepThreeError, setStepThreeError] = useState(null);

	useEffect(()=>{
		if (JSON.parse(localStorage.getItem('cart')) != null) {
		setCart(JSON.parse(localStorage.getItem('cart')))
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

	const addToCart = (event) => {
		event.preventDefault();

		let amountToAdd = event.target.amount.value;
		let causeToAddID = event.target.cause_id.value;
		let causeToAddName = event.target.cause_name.value;
		let eligibleInt = parseInt(event.target.eligible.value);
		let recurringValue = event.target.recurring.checked;

		let eligible; 
		let recurring;

		if (eligibleInt == 1) {
		eligible = true;
		} else {
		eligible = false;
		}

		if (recurringValue) {
		recurring = true;
		} else {
		recurring = false;
		}

		let newItem = {
		id: causeToAddID,
		name: causeToAddName,
		amount: parseFloat(amountToAdd),
		eligible: eligible,
		recurring: recurring,
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
		localStorage.setItem('cart', JSON.stringify(cart));

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
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	const submitStepOne = (event) => {
		event.preventDefault();
		setStep(2);
	}

	const submitStepTwo = (event) => {
		event.preventDefault();

		for (let i = 0; i < userCauses.length; i++) {
			if (userCauses[i]['region'] == undefined) {
				setStepThreeError('Please select a region')
			} else {
				setStep(3);
			}
		}
	}

	const submitStepThree = (event) => {
		event.preventDefault();
		
		setStep(4)
	}

  	return (
    <div>
      <Navbar />
      <div className = 'p-10'>

      	<div className = 'w-full'>

			    <div className="md:flex md:items-center md:justify-between">
			      <div className="flex-1 min-w-0">
			        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Choose A Cause</h2>
			      </div>
			    </div>

				<div className = 'flex mt-4 mb-4'>
					{
						step == 1 ?

						<form onSubmit = {submitStepOne}>
							<div className = 'grid grid-cols-6 gap-4' >
								{causes.map((cause)=>(
									<div className = 'flex flex-row flex border border-gray-300 rounded-md items-center justify-between'> 
										<div className = 'bg-blue-600 p-4 rounded-l-md text-white'>
											<cause.icon className = 'w-6 h-6'/>
										</div>
										<div key = {cause.name} className = 'flex  p-4 items-center justify-end'>
											<label htmlFor = {cause.id} className = 'text-sm font-md'>{cause.name}</label>
											<input type = 'checkbox' id = {cause.id} 
												onChange = {(e)=>{
													let status = e.target.checked;

													if (status) {
														causeList.push(cause);
														let temp = {
															name: cause.name,
															id: cause.id,
															region: undefined,
														}
														userCauses.push(temp);
														console.log(userCauses);
													} else {
														let index = causeList.indexOf(cause.id);
														causeList.splice(index, 1);
														let user_index = userCauses.indexOf(cause.id);
														userCauses.splice(user_index, 1);
														console.log(userCauses);
													}
												}}
												className = 'ml-3 rounded-md'
											/>
										</div>
									</div>
								))}
							</div>

							
							<div className = 'p-4 flex justify-center'>
								<button type = 'submit' className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Continue</button>
							</div>

						</form>

							:

							<form className = 'opactiy-50'>
							<div className = 'grid grid-cols-6 gap-4' >
								{causes.map((cause)=>(
									<div className = 'flex flex-row flex border border-gray-300 rounded-md items-center justify-between'> 
										<div className = 'bg-blue-600 p-4 rounded-l-md text-white'>
											<cause.icon className = 'w-6 h-6'/>
										</div>
										<div key = {cause.name} className = 'flex  p-4 items-center justify-end'>
											<label htmlFor = {cause.id} className = 'text-sm font-md'>{cause.name}</label>
											<input type = 'checkbox' id = {cause.id} 
												onChange = {(e)=>{
													let status = e.target.checked;

													if (status) {
														causeList.push(cause);
														let temp = {
															name: cause.name,
															id: cause.id,
															region: undefined,
														}
														userCauses.push(temp);
														console.log(userCauses);
													} else {
														let index = causeList.indexOf(cause.id);
														causeList.splice(index, 1);
														let user_index = userCauses.indexOf(cause.id);
														userCauses.splice(user_index, 1);
														console.log(userCauses);
													}
												}}
												className = 'ml-3 rounded-md'
											/>
										</div>
									</div>
								))}
							</div>

							
							<div className = 'p-4 flex justify-center'>
								<button type = 'submit' className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Continue</button>
							</div>

						</form>
					}

				</div>
			</div>
      		{
		    	step == 2 ?

		    		<div>

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
										{cause.regions.map((region)=>(
											<>
												<input type = 'radio' value = {region.name} name = {cause.id} id = {region.name + cause.id} onClick = {(e)=>{
													let regionVal = e.target.value;
													let causeVal = cause.id;
													let status = e.target.checked;
													console.log(region)

													for (let i = 0; i < userCauses.length; i++) {
														if (userCauses[i]['id'] == causeVal) {
															userCauses[i]['region'] = regionVal;
														}
													}
										
													console.log(userCauses)
												}}/>
												<label htmlFor = {region.name + cause.id}>{region.name}</label>
											</>
										))}
									</div>
									
								</div>
							))}
							{
								stepThreeError ? 

								<p className = 'text-red-600 font-semibold'>{stepThreeError}</p>

								:

								''
							}
							<button type = 'submit'>Continue</button>
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
								<div>
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

		    		<div>

					    <div className="md:flex md:items-center md:justify-between">
					      <div className="flex-1 min-w-0">
					        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Choose An Amount</h2>
					      </div>
					    </div>

			      	<div className = 'flex justify-between mt-4 mb-4'>
						<form onSubmit = {submitStepThree}>
							{causeList.map((cause)=>(
								<div>
									<h1>{cause.name}</h1>
									{console.log(cause.regions[0].options)}

									<select>
										{
											cause.regions.map((region)=>(
												<>
													{region.options.map((option)=>(
														<option>${option.amount} per {option.interval}</option>
													))}
												}</>
											))
										}
										<option value = 'custom'>Choose a custom amount (we will pool funds until we can provide one full donation)</option>
									</select>
									<input id = {cause.id} className = 'p-2 border border-gray-300'/>
									
								</div>
							))}
							<button type = 'submit'>Add to cart</button>
						</form>
			      	</div>
			      </div>

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
							{causeList.map((cause)=>(
								<div>
									<h1>{cause.name}</h1>
									<input id = {cause.id} className = 'p-2 border border-gray-300'/>
									<input type = 'checkbox'/><label>Recurring?</label>
								</div>
							))}
							<button type = 'submit'>Added to cart</button>
						</form>
			      	</div>
			      </div>
		    }
      	

      </div>
    </div>
  )
}
