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

        Khums donations
      <Footer />
    </div>
  )
}


