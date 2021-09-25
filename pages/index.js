import Navbar from '../components/Root/Navbar.js'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react';

export default function Home() {

  const [cart, setCart] = useState([])

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
  return (
    <div>
      <Navbar/>

      <>
        <div className = 'relative'>
      <div aria-hidden="true" className="hidden absolute w-1/2 h-full bg-gray-100 lg:block" />
            <div className="relative bg-gray-100 lg:bg-transparent">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
                <div className="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
                  <div className="lg:pr-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                      Focus on what matters
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                      All the charts, datepickers, and notifications in the world can't beat checking off some items on
                      a paper card.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="inline-block bg-indigo-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-indigo-700"
                      >
                        Shop Productivity
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-02-hero-half-width.jpg"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
      </>




      <h1 className = 'font-bold text-2xl'>Kinship Canada</h1>
      <Link href = '/donate'><a>Donate</a></Link>
      <form onSubmit = {addToCart}>
        <input 
          type='text'
          id='amount'
          placeholder='amount'
          className='border border-gray-600 p-2'
        />
        <input
          type = 'text'
          id = 'cause_id'
          hidden
          value = '882s-ash2-asdas'
        />
        <input
          type = 'text'
          id = 'cause_name'
          hidden
          value = 'Donation In Syria'
        />
        <input
          type = 'number'
          id = 'eligible'
          hidden
          value = '1'
        />
        <input
          type = 'checkbox'
          id = 'recurring'
        />
        <label htmlFor = 'recurring'>Recurring?</label>
        <input
          type='submit'
          className='p-2 bg-blue-600 text-white'
          value='donate'
        />
      </form>
      
      <div>
        {cart.map((item)=>(
          <div>
            <p>Name: {item.name}</p>
            <p>Amount: {item.amount}</p>
            <p>Recurring: {item.recurring ? 'True' : 'False'}</p>
            <button className = 'p-2 bg-blue-600 text-white' onClick={()=>{removeFromCart(item.id, item.recurring)}}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
