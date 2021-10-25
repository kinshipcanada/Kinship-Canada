import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient.js'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, RadioGroup, Switch, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon, SearchIcon } from '@heroicons/react/solid'
import {
  FolderIcon,
  DocumentDuplicateIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  LoginIcon,
  HomeIcon,
  RefreshIcon,
  DocumentReportIcon,
  AdjustmentsIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const adminOptions = [
	{ name: 'Home', href: '/app/admin' },
	{ name: 'Reports', href: '/app/admin/reports' },
	{ name: 'Campaigns', href: '/app/admin/campaigns' },
	{ name: 'Settings', href: '#' },
]

export default function SubNav({partner}) {
	const router = useRouter()
	let pathname = router.pathname
	let asPath = router.asPath

	pathname.indexOf(1);
	pathname.toLowerCase();
	pathname = pathname.split("/")[2];

	// Limit access
	const [partnerAccess, setPartnerAccess] = useState(false)
	const [adminAccess, setAdminAccess] = useState(false)
	const [profile, setProfile] = useState([])

	const fetchProfile = async (id) => {

		const { data, error } = await supabase
			.from('profiles')
			.select()
			.eq('id', id)
		
		if (data) {
			setProfile(data[0])
			try {
				setAdminAccess(data[0].admin)
			} catch {
				setAdminAccess(false)
			}
			setPartnerAccess(data[0].partner)
		} else {
			console.log(error)
		}
	}

	useEffect(()=>{
		const user = supabase.auth.user()
		fetchProfile(user.id)
	})

	let home, receipts, proof, donations, recurring, account, partners, admin = false;

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

	} else if (pathname == 'partners') {

		partners = true;

	} else if (pathname == 'admin') {

		admin = true

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
          	<Link href = {item.href} key={item.name}>
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
          
          {
			partnerAccess ?

			<Link href = '/app/partners'>
				<a
				className={classNames(
					partners
					? 'text-blue-600 hover:text-blue-700'
					: 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
					'group rounded-md px-3 py-2 hover:text-gray-900 hover:bg-gray-50 flex items-center text-sm font-medium'
				)}
				href = '#'
				>
				<DocumentReportIcon
					className={classNames(
					partners ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
					'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
					)}
					aria-hidden="true"
				/>
				<span className="truncate">Partners</span>
				</a>
			</Link>

			:

			<></>
		  }

		  {adminAccess ?
		  
			<Link href = '/app/admin'>
				<a
					className={classNames(
					admin
						? 'text-blue-600 hover:text-blue-700'
						: 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
					'group rounded-md px-3 py-2 hover:text-gray-900 hover:bg-gray-50 flex items-center text-sm font-medium'
					)}
					href = '#'
				>
					<AdjustmentsIcon
					className={classNames(
						admin ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
						'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
					)}
					aria-hidden="true"
					/>
					<span className="truncate">Admin</span>
				</a>
			</Link>

			:

			<></>
		  }
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

