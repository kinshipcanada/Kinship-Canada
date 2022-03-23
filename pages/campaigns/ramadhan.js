import Navbar from '../../components/Root/Navbar.js'
import Footer from '../../components/Root/Footer.js'
import Link from 'next/link'
import { CameraIcon, CashIcon, DocumentDownloadIcon, MoonIcon, PlusCircleIcon, XIcon, CheckCircleIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Home() {

  const [cart, setCart] = useState([]);

  useEffect(async ()=>{
    animateValue("familiesSupported", 0, 282, 2000);
    let cart = JSON.parse(localStorage.getItem('kinship_cart'))
    
    if (cart) {
      setCart(cart)
    } else {
      setCart([])
    }
  },[])

  function animateValue(id, start, end, duration) {
        if (start === end) return;
        var range = end - start;
        var current = start;
        var increment = end > start? 1 : -1;
        var stepTime = Math.abs(Math.floor(duration / range));
        var obj = document.getElementById(id);
        var timer = setInterval(function() {
            current += increment;
            obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }


  const regions = [
    {
      "name": "India",
      "description": "The recommended amount is $100, which will allow a family of 5 to have at least one meal per day for a month.",
      "imageSource": "/regions/india.png",
      "defaultAmount": 100.00
    },

    {
      "name": "Africa",
      "description": "The recommended amount is $100, which will allow a family of 5 to have at least one meal per day for a month.",
      "imageSource": "/regions/africa.png",
      "defaultAmount": 100.00
    },

    {
      "name": "Iraq",
      "description": "The recommended amount is $100, which will allow a family of 5 to have at least one meal per day for a month",
      "imageSource": "/regions/iraq.png",
      "defaultAmount": 100.00
    },

    {
      "name": "Community Center",
      "description": "A donation of $750 will allow a community center to provide meals for people to break their fasts during Ramadhan.",
      "imageSource": "/campaigns/community-center.png",
      "defaultAmount": 750.00
    }

  ]

  return (
    <div>
      <Head>
        <title>Kinship Canada · Ramadhan Campaign</title>
      </Head>
      <Navbar />
      <div className="relative mt-16">
        <div className="absolute inset-x-0 bottom-0 h-1/2" />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl brightness-50 blur-lg sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover brightness-50"
                src="/frontend/hunger.jpg"
                alt="Hunger"
              />
              <div className="absolute inset-0 bg-blue-100 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                
              <h1 className="text-center text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <MoonIcon className="w-4 h-4 mr-2" />
                    Ramadhan Campaign
                </span>
                <span className="block text-white">Hunger is not about a lack of food.</span>
                <span className="block text-white">It&apos;s a terrible injustice.</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                Donate today to help ensure that someone can keep one meal on the table. Donations will be sent on the 20th of Shabaan.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 sm:py-32 sm:px-2 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
            <div className="flex sm:flex-row flex-col justify-between">
                <div className='sm:max-w-2xl'>
                    <h2 className="font-semibold text-gray-500">Where your donation goes</h2>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">What&apos;s actually included?</p>
                    <p className="mt-4 text-gray-500">Amounts shown per region will provide a months worth of basic rations, including oil, flour, rice, and sugar. You can donate either the suggested amount or a custom amount. All donations are tax receipt eligible.
                    <br/>Please donate to a maximum of three causes at a time.
                    </p>
                </div>
                <div className='sm:w-1/3 bg-white shadow-xl border-blue-600 border-4 shadow-blue-600 rounded-lg mt-8'>
                    
                    <div className="p-10 flex flex-col text-center justify-center content-center">
                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Families Supported So Far</dt>
                        <dd  id = "familiesSupported" className="order-1 text-5xl font-extrabold text-blue-600">117</dd>
                    </div>

                </div>
                
            </div>

          
            {regions.map((region)=>(
              <RegionComponent key={region.name} region={region} cart={cart} setCart={setCart}/>
            ))}

            </div>


          <div className = 'mt-8'>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  )
}

const RegionComponent = ({region, cart, setCart}) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [amount, setAmount] = useState(region.defaultAmount)

  return (
    <div key={region.name} className="space-y-16 pt-10 mt-10 border-t border-gray-200 sm:pt-16 sm:mt-16">
      <div
        className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
      >
        <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
          <img src ={region.imageSource} className="w-20 mb-3" />
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {region.name}
          </p>  
          <p className="mt-4 text-md text-gray-500">{region.description}</p>
        </div>
        <div className="flex-auto lg:col-span-7 xl:col-span-8 mt-4 sm:mt-0">

          <div className="bg-white overflow-hidden shadow border rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6 text-semibold font-medium">
              Make a donation in {region.name}
          </div>
          <div className="px-4 py-5 sm:p-6">

              <Form cart={cart} setCart={setCart} region = {region} success={success} setSuccess={setSuccess} loading={loading} setLoading={setLoading} amount={amount} setAmount={setAmount}/>

          </div>
          </div>

        </div>
      </div>
  </div>
  )
}

const Form = ({cart, setCart, region, success, setSuccess, loading, setLoading, amount, setAmount}) => {

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


  return (
    <div className="">
      {
        success ?


          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Thank you! Your donation has been added to cart, please go to cart to checkout.</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <Link href = "/cart">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Go To Cart &rarr;
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>


        :

        <>
        <div className='flex flex-col'>
          <label htmlFor={region.name} className="block text-sm font-medium text-gray-700">
              Choose an amount to donate (recommended: $100)
          </label>
          <div className="mt-2 relative rounded-md shadow-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name={region.name}
                id={region.name}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                defaultValue={amount}
                onChange={setAmount(amount)}
                aria-describedby="price-currency"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                  CAD
              </span>
              </div>
          </div>
          <button
              type="button"
              onClick={()=>{
                setLoading(true)
                let amount = document.getElementById(region.name).value
                let causeToAddID = `ramadhanCampaign${region.name}`;
                let causeToAddName = `Ramadhan Campaign - ${region.name}`;
                let eligible = true;
                let recurring = false;
                let interval = 'one-time';

                try {
                  addToCart(amount, causeToAddID, causeToAddName, eligible, recurring, region.name, interval)
                  toast.success(`Donation to ${region.name} added to cart!`, { position: 'top-right' });
                  setLoading(false)
                  setSuccess(true)
                } catch (error) {
                  toast.error(`Error adding donation to cart!`, { position: 'top-right' });
                  console.error(error)
                  setLoading(false)
                }
              }}
              className="mt-3 flex justify-center text-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                  {
                    loading ?

                    <>
                      Adding to cart...
                    </>

                    :

                    <>
                      <PlusCircleIcon className="w-6 h-6 mr-2" />
                      Add Donation To Cart
                    </>
                    
                  }
              </button>
          </div>
          </>
      }
    </div>
  )
}
