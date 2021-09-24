import { useState } from 'react'
import Navbar from '../components/Root/Navbar.js'

export default function Home() {

    const [custom, setCustom] = useState(false)

  return (
    <div>
      <Navbar />
      <form className = 'p-4'>
          <label>India Povery Relief</label>
          {
              custom ?

              <input placeholder = 'Choose a custom amount to donate' className = 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md' type = 'text'/>

            :

            <select
                id="amount"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue="select"
                onChange={(e)=>{let value = e.target.value; if (value == 'custom') {setCustom(true)}}}
            >
                <option value = 'select'>Select one</option>
                <option value = '500'>$500 - Fruit Cart</option>
                <option value = '850'>$850 - Rickshaw</option>
                <option value = '999'>$999 - Motorcycle</option>
                <option value = 'custom'>Custom Amount</option>
            </select>
          }
      </form>
    </div>
  )
}
