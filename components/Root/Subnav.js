import Link from 'next/link'

import { supabase } from '../../lib/supabaseClient.js'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { Disclosure, Menu, RadioGroup, Switch, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon, SearchIcon } from '@heroicons/react/solid'
import {
  FolderIcon,
  DocumentDuplicateIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  LoginIcon,
  HomeIcon,
  RefreshIcon
} from '@heroicons/react/outline'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SubNav() {
	const router = useRouter()
	let pathname = router.pathname
	let asPath = router.asPath

	pathname.indexOf(1);
	pathname.toLowerCase();
	pathname = pathname.split("/")[2];

	let home, receipts, proof, donations, recurring, account = false;

	if (pathname == undefined) {

		home = true;

	} else if (pathname == 'receipts') {

		receipts = true;

	} else if (pathname == 'proof') {

		proof = true;

	} else if (pathname == 'donations') {

		donations = true;

	} else if (pathname == 'recurring') {

		recurring = true;

	} else if (pathname == 'account') {

		account = true;

	}

	const subNavigation = [
	  { name: 'Dashboard Home', href: '/app', icon: HomeIcon, current: home },
	  { name: 'Tax Receipts', href: '/app/receipts', icon: DocumentDuplicateIcon, current: receipts },
	  { name: 'Proof Of Donation', href: '/app/proof', icon: PaperAirplaneIcon, current: proof },
	  { name: 'Donation History', href: '/app/donations', icon: FolderIcon, current: donations },
	  { name: 'Recurring Donations', href: '/app/recurring', icon: RefreshIcon, current: recurring },
	  { name: 'Account & Billing', href: '/app/account', icon: UserCircleIcon, current: account },
	]

	const signOut = async () => {
		const { error } = await supabase.auth.signOut()
		router.push('/')
	}

  	return (
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="space-y-1">
          {subNavigation.map((item) => (
          	<Link href = {item.href}>
	            <a
	              key={item.name}
	              className={classNames(
	                item.current
	                  ? 'text-blue-600 hover:text-blue-700'
	                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
	                'group rounded-md px-3 py-2 hover:text-gray-900 hover:bg-gray-50 flex items-center text-sm font-medium'
	              )}
	              aria-current={item.current ? 'page' : undefined}
	              href = {item.href}
	            >
	              <item.icon
	                className={classNames(
	                  item.current ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
	                  'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	                )}
	                aria-hidden="true"
	              />
	              <span className="truncate">{item.name}</span>
	            </a>
            </Link>
          ))}
          <a
	          onClick={signOut}
	          className='cursor-pointer text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium'
	        >
	          <LoginIcon
	            className='text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	          />
	          <span className="truncate">Sign Out</span>
        	</a>
        </nav>
      </aside>
  )
}

