import Navbar from '../components/Root/Navbar.js'

import { supabase } from '../lib/supabaseClient'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const plans = [
  { name: 'Africa', ram: '8GB', cpus: '4 CPUs', disk: '160 GB SSD disk', price: '$40' },
  { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256 GB SSD disk', price: '$80' },
  { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512 GB SSD disk', price: '$160' },
  { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1024 GB SSD disk', price: '$240' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

	const [selected, setSelected] = useState(plans[0])

	const regions = [
	    { name: 'Africa' },
	    { name: 'Global' },
	    { name: 'India' },
	    { name: 'Canada' },
	]

	const causes = [
	    { name: 'Orphans' },
	    { name: 'Food Relief' },
	    { name: 'Education' },
	]


    return (
	    <div>
	      <Navbar />
	      <h1 className = 'font-bold text-2xl'>Donate</h1>
	      <form className = 'p-10'>

		    <div className="md:flex md:items-center md:justify-between">
		      <div className="flex-1 min-w-0">
		        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Choose A Region</h2>
		      </div>
		    </div>

	      	<div className = 'flex justify-between mt-4 mb-4'>
		      	<RadioGroup value={selected} onChange={setSelected}>
			      <RadioGroup.Label className="sr-only">Choose a region</RadioGroup.Label>
			      	<div className="flex justify-between">
				        {plans.map((plan) => (
				          <RadioGroup.Option
				            key={plan.name}
				            value={plan}
				            className={({ active }) =>
				              classNames(
				                active ? 'ring-blue-500' : '',
				                'm-1 relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
				              )
				            }
				          >
				            {({ checked }) => (
				              <>
				                <div className="flex items-center">
				                  <div className="text-sm">
				                    <RadioGroup.Label as="p" className="font-medium text-gray-900">
				                      {plan.name}
				                    </RadioGroup.Label>
				                    <RadioGroup.Description as="div" className="text-gray-500">
				                      <p className="sm:inline">
				                        {plan.ram} / {plan.cpus}
				                      </p>{' '}
				                      <span className="hidden sm:inline sm:mx-1" aria-hidden="true">
				                        &middot;
				                      </span>{' '}
				                      <p className="sm:inline">{plan.disk}</p>
				                    </RadioGroup.Description>
				                  </div>
				                </div>
				                <RadioGroup.Description as="div" className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
				                  <div className="font-medium text-gray-900">{plan.price}</div>
				                  <div className="ml-1 text-gray-500 sm:ml-0">/mo</div>
				                </RadioGroup.Description>
				                <div
				                  className={classNames(
				                    checked ? 'border-blue-500' : 'border-transparent',
				                    'absolute -inset-px rounded-lg border-2 pointer-events-none'
				                  )}
				                  aria-hidden="true"
				                />
				              </>
				            )}
				          </RadioGroup.Option>
				        ))}
			    	</div>
			    </RadioGroup>
	      	</div>
	      	<h1 className = 'font-bold text-2xl'>Choose A Cause</h1>
	      	<div className = 'flex justify-between'>
		      	{causes.map((region)=>(
		      		<div className = 'p-4 border border-gray-300'>{region.name}</div>
		      	))}
	      	</div>
	      	<h1 className = 'font-bold text-2xl'>Choose An Amount</h1>
	        <input 
	          type='text'
	          placeholder='amount'
	          className='border border-gray-600 p-2'
	        />
	        <input
	          type='submit'
	          className='p-2 bg-blue-600 text-white'
	          value='donate'
	        />
	      </form>
	    </div>
    )
}
