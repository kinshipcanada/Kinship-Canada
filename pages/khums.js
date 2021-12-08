import Navbar from '../components/Root/Navbar.js'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Footer from '../components/Root/Footer'
import Head from 'next/head'
import { toast } from 'react-hot-toast';

export default function Home() {

  const [cart, setCart] = useState([]);

  useEffect(async ()=>{
    let cart = JSON.parse(localStorage.getItem('kinship_cart'))
    
    if (cart) {
      setCart(cart)
    } else {
      setEmpty(true)
    }
  },[])

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
    <div>
      <Navbar/>
        <div className="bg-white">


        <div className="mx-auto py-16 px-6 sm:py-12 sm:px-8 ">
            <h2 className="text-3xl font-bold text-gray-900">Sehme Sadat Donations</h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <>
                  {
                    product.sehme_sadat == true ?

                    <div key={product.id} className = "flex flex-col min-h-full">
                      <div className="relative flex flex-col inset-0">
                        <div className="relative w-full h-72 rounded-lg overflow-hidden">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="relative mt-4 mb-2">
                          <div className = 'flex justify-between w-full items-center'>
                            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{product.sehme_imam ? 'Sehme Imam' : ''}</p>
                          </div>
                        </div>
                        <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                          />
                          <p className="relative text-lg font-semibold text-white">{product.price}</p>
                        </div>
                      </div>
                      <p className = 'text-sm font-medium'>{product.description}</p>
                      <div className = 'mt-6'>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="price"
                            id={product.id + "_price"}
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                              CAD
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <a
                          className="relative flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
                        >
                          <button className = "text-base font-medium w-full h-full" onClick={()=>{
                            let amount = document.getElementById(product.id + "_price").value;
                            let causeToAddID = product.id;
                            let causeToAddName = product.name;
                            let eligible = true;
                            let recurring = false;
                            let region = product.region;
                            let interval = 'one-time';

                            try {
                              addToCart(amount, causeToAddID, causeToAddName, eligible, recurring, region, interval)
                              toast.success(`Donation to ${product.name} added to cart!`, { position: 'top-right' });
                            } catch (error) {
                              toast.error(`Error adding ${product.name} to cart!`, { position: 'top-right' });
                              console.log(error)
                            }
                          }}>
                            Add to basket &rarr;
                          </button>
                        </a>
                      </div>
                    </div>

                    :

                    <></>
                  }
                </>
              ))}
            </div>
          </div>


          
          <div className="mx-auto py-16 px-6 sm:py-12 sm:px-8 ">
            <h2 className="text-3xl font-bold text-gray-900">Sehme Imam Donations</h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <>
                  {
                    product.sehme_imam == true ?

                    <div key={product.id} className = "flex flex-col min-h-full">
                      <div className="relative flex flex-col inset-0">
                        <div className="relative w-full h-72 rounded-lg overflow-hidden">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="relative mt-4 mb-2">
                          <div className = 'flex justify-between w-full items-center'>
                            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{product.sehme_imam ? 'Sehme Imam' : ''}</p>
                          </div>
                        </div>
                        <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                          />
                          <p className="relative text-lg font-semibold text-white">{product.price}</p>
                        </div>
                      </div>
                      <p className = 'text-sm font-medium'>{product.description}</p>
                      <div className = 'mt-6'>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="price"
                            id={product.id + "_price"}
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                              CAD
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <a
                          className="relative flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
                        >
                          <button className = "text-base font-medium w-full h-full" onClick={()=>{
                            let amount = document.getElementById(product.id + "_price").value;
                            let causeToAddID = product.id;
                            let causeToAddName = product.name;
                            let eligible = true;
                            let recurring = false;
                            let region = product.region;
                            let interval = 'one-time';

                            try {
                              addToCart(amount, causeToAddID, causeToAddName, eligible, recurring, region, interval)
                              toast.success(`Donation to ${product.name} added to cart!`, { position: 'top-right' });
                            } catch (error) {
                              toast.error(`Error adding ${product.name} to cart!`, { position: 'top-right' });
                              console.log(error)
                            }
                          }}>
                            Add to basket &rarr;
                          </button>
                        </a>
                      </div>
                    </div>

                    :

                    <></>
                  }
                </>
              ))}
            </div>
          </div>



          
        </div>
      <Footer />
    </div>
  )
}

const products = [
  {
    id: "khums-2-sadat",
    name: 'Al-Imam Foundation',
    sehme_imam: false,
    sehme_sadat: true,
    href: '#',
    region: 'India',
    imageSrc: 'https://s7d2.scene7.com/is/image/TWCNews/060320-oh-prayerhandsjpg',
    price: 'Tax Receipt Eligible',
    description: <>Provides support to impoverished in India, including food, housing, empowerment, education, and medical care.</>
  },
  {
    id: "khums-4-sadat",
    name: 'Imam Ridha Foundation',
    sehme_imam: false,
    sehme_sadat: true,
    href: '#',
    region: 'Iraq',
    imageSrc: 'https://media.mehrnews.com/d/2020/04/11/4/3424038.jpg',
    price: 'Tax Receipt Eligible',
    description: <>Provides support to impoverished in Iraq, including food, housing, education, and medical care.</>
  },
  {
    id: "khums-6-ridha",
    name: 'Imam Ridha Foundation',
    sehme_imam: true,
    sehme_sadat: false,
    href: '#',
    region: 'Iraq',
    imageSrc: 'https://media.mehrnews.com/d/2020/04/11/4/3424038.jpg',
    price: 'Tax Receipt Eligible',
    description: <>Provides support to impoverished in Iraq, including food, housing, education, and medical care.</>
  },

  // More products...
]

