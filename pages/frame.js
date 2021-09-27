import Navbar from '../components/Root/Navbar.js'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Footer from '../components/Root/Footer'

export default function Home() {

  return (
    <div>
      <Navbar/>

      <div className = 'p-10'>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            bruh
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:p-6">
            <div className = 'w-full h-full'>
              <input type = 'checkbox'/>
              <p>Select cause</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
