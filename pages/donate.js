import Navbar from '../components/Root/Navbar.js'
import { supabase } from '../lib/supabaseClient'
import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { AcademicCapIcon, UserGroupIcon, BriefcaseIcon, GlobeIcon, HeartIcon, HomeIcon, CashIcon, GiftIcon, BookOpenIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import { DotsVerticalIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const causes = [
	{
		id: 239023,
		name: 'Orphans',
		icon: UserGroupIcon,
		bgColor: 'bg-blue-600',
		regions: [
			{
				name: 'Iraq',
				options: [
					{
						amount: 500,
						interval: 'year',
						buys: 'food, housing, and education'
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
		eligible: true,
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 432341,
		name: 'Poverty Relief',
		icon: BriefcaseIcon,
		bgColor: 'bg-red-600',
		regions: ['Africa', 'India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 255432,
		name: 'Education',
		bgColor: 'bg-green-600',
		icon: AcademicCapIcon,
		regions: ['Africa', 'India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 849272,
		name: 'Widows',
		bgColor: 'bg-indigo-600',
		regions: ['India'],
		icon: GlobeIcon,
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 119372,
		name: 'Medical Aid',
		icon: HeartIcon,
		bgColor: 'bg-pink-600',
		regions: ['Africa', 'India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 989387,
		name: 'Housing',
		bgColor: 'bg-purple-600',
		icon: HomeIcon,
		regions: ['India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 421152,
		name: 'Khums',
		icon: CashIcon,
		bgColor: 'bg-yellow-600',
		regions: ['Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 782923,
		name: 'Qadha',
		icon: GiftIcon,
		bgColor: 'bg-green-600',
		regions: ['India'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 391038,
		name: 'Quran',
		icon: BookOpenIcon,
		bgColor: 'bg-blue-600',
		regions: ['India'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},
	{
		id: 471937,
		name: 'Microfinancing',
		icon: CurrencyDollarIcon,
		bgColor: 'bg-red-600',
		regions: ['India', 'Iraq'],
		blurb: 'Donate to orphans, help pay for school, etc etc'
	},

]

export default function Home() {

	const [causeList, setCauseList] = useState([])
	const [step, setStep] = useState(1);
	const [cart, setCart] = useState([])
	const [userCauses, setUserCauses] = useState([])
	const [dropdownAmounts, setDropdownAmounts] = useState([])

	const [stepOneError, setStepOneError] = useState(null);
	const [stepThreeError, setStepThreeError] = useState(null);

	const [stateSample, setStateSample] = useState('hello');

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

		if (userCauses.length == 0) {
			setStepOneError('Please select at least one cause')
		} else {
			setStep(2);
		}
	}

	const submitStepTwo = (event) => {
		event.preventDefault();

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
						id: id,
						options: options,
						region: region,
					}
					dropdownAmounts.push(temp);
					let new_dropdown = [...dropdownAmounts];
					setDropdownAmounts(new_dropdown);
					setStep(3);
				}
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
		
	}

  	return (
    <div>
      <Navbar />
      <div className = 'p-10'>
	  	<form  onSubmit = {submitStepOne} className = {step == 1 ? '' : 'opacity-50'}>
		  	<div className="md:flex md:items-center md:justify-between">
				<div className="flex-1 min-w-0">
				<h2 className={step == 1 ? "text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate" : "text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate opacity-50"}>Choose A Cause</h2>
				</div>
			</div>
			<div className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{causes.map((cause) => (
				<li key={cause.name} className="col-span-1 flex shadow-sm rounded-md">
					<div
					className={classNames(
						cause.bgColor,
						'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
					)}
					>
						<cause.icon className = 'w-6 h-6'/>
					</div>
					<div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
					<div className="flex-1 px-4 py-2 text-sm truncate">
						<label htmlFor = {cause.id} className="text-gray-900 font-medium hover:text-gray-600">{cause.name}</label>
						<p className="text-gray-500">{cause.blurb}</p>
					</div>
					<div className="flex-shrink-0 pr-2">
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
									console.log(temp)
								} else {
									let index = causeList.indexOf(cause.id);
									causeList.splice(index, 1);
									let user_index = userCauses.indexOf(cause.id);
									userCauses.splice(user_index, 1);
								}
							}}
							className = 'ml-3 mr-2 rounded-md'
						/>
					</div>
					</div>
				</li>
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
		    	step == 2 ?

		    		<div>

					    <div className="md:flex md:items-center md:justify-between">
					      <div className="flex-1 min-w-0">
					        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Choose A Region</h2>
					      </div>
					    </div>

			      	<div className = 'mt-4 mb-4'>
					  	<form onSubmit = {submitStepTwo}>
							{causeList.map((cause)=>(
								<div>
									<h1>{cause.name}</h1>
									<div key = {cause.id}>
										<div className = 'grid grid-cols-4 gap-6'>
											{cause.regions.map((region)=>(
												<div className = 'col-span-1 p-4 shadow-md'>
													<input type = 'radio' value = {region.name} name = {cause.id} id = {region.name + cause.id} onClick = {(e)=>{
														let regionVal = e.target.value;
														let causeVal = cause.id;
														let status = e.target.checked;

														for (let i = 0; i < userCauses.length; i++) {
															if (userCauses[i]['id'] == causeVal) {
																userCauses[i]['region'] = regionVal;
															}
														}
											
													}}/>
													<label htmlFor = {region.name + cause.id}>{region.name}</label>
												</div>
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
							{console.log(dropdownAmounts)}
							{causeList.map((cause)=>(
								<div>
									<h1>{cause.name}</h1>

									<select 
										id = {cause.id + '_select'}
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
															console.log(userCauses)
														}
													}
												}
											}
										}
									>
										<option>Select One</option>
										{
											dropdownAmounts.map((cause)=>(
												<>
													{
														cause.options.options.map((option)=>(
															<option value = {option.amount + '_' + option.interval}>${option.amount} {option.interval == 'one-time' ? 'one time' : 'per ' + option.interval} for {option.buys} </option>
														))
													}
												</>
											))
										}
										<option value = 'custom'>Choose a custom amount (we will pool funds until we can provide one full donation)</option>
									</select>
									<input placeholder = 'Choose a custom amount to donate' id = {cause.id + '_custom'} className = 'hidden p-2 border border-gray-300'/>
									
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
						{console.log(dropdownAmounts)}
						<form onSubmit = {submitStepThree}>
							{dropdownAmounts.map((cause)=>(
								<div>
									<h1>{cause.id}</h1>
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
