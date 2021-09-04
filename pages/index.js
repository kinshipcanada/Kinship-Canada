import Navbar from '../components/Root/Navbar.js'
import Link from 'next/link'

import { supabase } from '../lib/supabaseClient'

export default function Home() {

  return (
    <div>
      <Navbar />
      <h1 className = 'font-bold text-2xl'>Kinship Canada</h1>
      <Link href = '/donate'><a>Donate</a></Link>
      <form>
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
