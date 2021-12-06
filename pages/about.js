import Navbar from '../components/Root/Navbar'
import Footer from '../components/Root/Footer'
import {
    ChatAltIcon,
    DocumentReportIcon,
    HeartIcon,
    InboxIcon,
    PencilAltIcon,
    ReplyIcon,
    TrashIcon,
    UsersIcon,
    ArrowRightIcon,
    GlobeAltIcon,
    LightningBoltIcon,
    ScaleIcon,
    CheckIcon,
    ExternalLinkIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip';
import Head from 'next/head'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';

export default function About() {

    const base = 'Kinship Canada | '
    const page = 'About Us'

    return (
        <div>
            <Head>
                <title>{base}{page}</title>
            </Head>
            <Navbar />

            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">About Us</h2>
                    <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Kinship Canada&apos;s Mission
                    </p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                    Our goal is to do charity right - we send all proceeds directly to those who need it, Kinship covers any admin or processing fees.
                    </p>
                </div>
                </div>
            </div>


            <div className="py-12 bg-white">
                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="text-base max-w-prose mx-auto lg:max-w-none">
                        <p className="mb-6 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Our Principles
                        </p>
                    </div>
                    <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
                    {principles.map((feature) => (
                        <div key={feature.name}>
                        <dt>
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <p className="mt-5 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                        </dt>
                        <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
                        </div>
                    ))}
                    </dl>
                </div>
            </div>

            <div className="py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                <div className="text-base max-w-prose mx-auto lg:max-w-none">
                    <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Transactions</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    What makes us different
                    </p>
                </div>
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
                    <div className="relative z-10">
                    <p className="text-lg text-gray-500">
                        Kinship prides itself on a few things that we do differently to help make as much impact as possible. We believe that every penny of your donation should go to the people you donated to - 
                        as such:
                        <ol>
                            <li className = "flex"><CheckIcon className = "w-9 h-8 text-green-600 mr-2" /> We cover any and all costs involved in getting your donation to those who need it, out of pocket.</li>
                            <li className = "flex mt-2 flex-row"><CheckIcon className = "w-12 h-8 text-green-600 mr-2 flex" /><span>Unless you opt to cover it, we will pay for credit card processing fees, exchange fees, wire fees, and everything in between.</span></li>
                            <li className = "flex mt-2"><CheckIcon className = "w-7 h-8 text-green-600 mr-2" />None of your donations goes towards our flights, hotels, or meals.</li>
                        </ol>
                    </p>
                    <p className="text-lg text-gray-500 mt-2">
                        We also believe that giving charity should be a pleasant and easy experience. We are proud to offer a dashboard from which you can download your tax receipts, receive proof of donation, and more.
                    </p>
                    <div className="mt-10 flex text-base max-w-prose mx-auto lg:max-w-none">
                        <Link href = '/donate'>
                            <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Make a donation <ArrowRightIcon className = 'ml-2 w-5 h-5' />
                            </button>
                        </Link>
                        <Link href = 'https://hobble.notion.site/Improvements-0c3c044ed21241dd8a124927b68c846e'>
                            <button
                            type="button"
                            className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Read more <ExternalLinkIcon className="-mr-1 ml-3 h-5 w-5 text-gray-800" />
                            </button>
                        </Link>
                    </div>
                    </div>
                    <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
                    <svg
                        className="absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
                        width={404}
                        height={384}
                        fill="none"
                        viewBox="0 0 404 384"
                        aria-hidden="true"
                    >
                        <defs>
                        <pattern
                            id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                        </defs>
                        <rect width={404} height={384} fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)" />
                    </svg>
                    <blockquote className="relative bg-white rounded-lg border">
                        <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
                        <div className="relative text-lg text-gray-700 font-medium mt-8">
                            <svg
                            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
                            fill="currentColor"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            >
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                            </svg>
                            <p className="relative">
                                If you disclose your charities, that is well, but if you hide them and give them to the poor, that is better for you, and it will atone for some of your misdeeds, and Allah is well aware of what you do.
                            </p>
                        </div>
                        </div>
                        <cite className="relative flex items-center sm:items-start bg-blue-600 rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10">
                        <div className="relative rounded-full border-2 border-white sm:absolute sm:top-0 sm:transform sm:-translate-y-1/2">
                            <img
                            className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-blue-300"
                            src="/quran.jpeg"
                            alt=""
                            />
                        </div>
                        <span className="relative ml-4 text-blue-300 font-semibold leading-6 sm:ml-24 sm:pl-1">
                            <p className="text-white font-semibold sm:inline">The Holy Qur&apos;an</p>{' '}
                            <p className="sm:inline">2:274</p>
                        </span>
                        </cite>
                    </blockquote>
                    </div>
                </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                    <div>
                    <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">Seamless donations</h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900">A Charity Designed With You In Mind</p>
                    <p className="mt-4 text-lg text-gray-500">
                        We believe giving charity should be an easy and pleasant experience. We work toward this, providing tax receipt packages, guides, and more.
                    </p>
                    </div>
                    <div className="mt-12 lg:mt-0 lg:col-span-2">
                    <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
                        {features.map((feature) => (
                        <div key={feature.name} className="relative">
                            <dt>
                            <CheckIcon className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                            <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                            </dt>
                            <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
                        </div>
                        ))}
                    </dl>
                    </div>
                </div>
                </div>

            
            
            <Footer />
        </div>
    )
}


const principles = [
  {
    name: 'Helping everyone worldwide',
    description:
      'We believe that anyone in poverty around the world is deserving of our help, not just the people of one region. Kinship operates globally with partners in India, Africa, the Middle East, and Canada.',
    icon: GlobeAltIcon,
  },
  {
    name: 'No admin fees',
    description:
      'We believe that your entire donation should go to those who you committed to - not towards paying our processing fees or hotels. Any expenses incurred in getting your money there - we cover.',
    icon: ScaleIcon,
  },
  {
    name: 'Seamless process',
    description:
      'We want to make donating as easy as possible, from preparing tax receipt refund packages to providing an easy dashboard to download proof of donation.',
    icon: LightningBoltIcon,
  },
]

const features = [
  {
    name: <p className = 'flex items-center' >Download Tax Receipts<span><QuestionMarkCircleIcon className = 'ml-2 w-5 h-5' data-tip="We are considering adding support for US tax receipts. If this is something you are interested in, please let us know."/></span><ReactTooltip place="top" type="dark" effect="float"/></p>,
    description: <>Download CRA-Eligible tax receipts in our dashboard.</>,
  },
  { name: 'Proof Of Donation', description: <>Kinship aims to provide proof of your donations where possible, including through pictures and receipts.</> },
  {
    name: 'Recurring Donations',
    description: <>With Kinship, you can make recurring donations and manage them from your dashboard.</>,
  },
  { name: 'Campaigns', description: <>Kinship offers special campaigns, such as our <Link href = '/campaigns/tuition'><a className = 'text-blue-600 font-semibold'>Africa tuition</a></Link> and <Link href = '/campaigns/microfinancing'><a className = 'text-blue-600 font-semibold'>microfinancing</a></Link> campaigns, that helps you find donees with a chance to break the cycle of poverty.</> },
  { name: 'Email Notifications', description: <>Get tax receipts, proof of donation, and more. Customize what you are notified for on your dashboard.</> },
  { name: 'All Proceeds Go To Those Who Need It', description: <>Kinship covers all processing, exchange, and wire fees unless you opt to cover it. We also pay volunteer expenses out of pocket.</> },
  { name: 'Email Support', description: <>Need help? We&apos;re here for you. Send a ticket on our support page and we&apos;ll get back to you as soon as possible.</> },
]

