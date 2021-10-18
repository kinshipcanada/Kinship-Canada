import Navbar from '../components/Root/Navbar.js'
import Footer from '../components/Root/Footer.js'
import Link from 'next/link'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { CameraIcon, CashIcon, DocumentDownloadIcon, DocumentIcon, DownloadIcon,ChevronDownIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import { useEffect } from 'react'
import { Disclosure } from '@headlessui/react'

export default function Home() {

  const emptyCart = () => {
    localStorage.setItem('kinship_cart', JSON.stringify([]));
  }
  
  useEffect(()=>{
    emptyCart()
  })

  return (
    <div>
      <Head>
        <title>Kinship Canada · Thank You!</title>
      </Head>
      <Navbar />
      <div className="relative mt-16">
        <div className="absolute inset-x-0 bottom-0 h-1/2" />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="/frontend/success.jpg"
                alt="Success"
              />
              <div className="absolute inset-0 bg-green-100 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Your Donation Succeeded.</span>
                <span className="block text-white">Here&apos;s what you can expect next.</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                Kinship is putting together a package for you to receive proof and make getting a tax refund as easy as possible.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 sm:py-32 sm:px-2 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
            <div className="max-w-3xl">
              <h2 className="font-semibold text-gray-500">What comes next</h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">You&apos;ve made a donation, now what?</p>
              <p className="mt-4 text-gray-500">
                First of all, we would like to thank you for taking this step towards making the world a better place. Every penny counts, and your donation is going to create a real improvement in someone&apos;s life.
              </p>
            </div>

            <div className="space-y-16 pt-10 mt-10 border-t border-gray-200 sm:pt-16 sm:mt-16">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
                >
                  <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
                    <span className="h-10 w-10 rounded-md flex items-center justify-center bg-blue-600 mb-4">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-medium text-gray-900">{feature.position}. {feature.name}</h3>
                    <p className="mt-4 text-md text-gray-500">{feature.description}</p>
                  </div>
                  <div className="flex-auto lg:col-span-7 xl:col-span-8">
                    <div className="aspect-w-5 aspect-h-2 rounded-lg bg-gray-100 overflow-hidden">
                      <img src={feature.imageSrc} alt={feature.imageAlt} className="object-center object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className = 'mt-8'>
            <Disclosure as="div" className="pt-6">
              {({ open }) => (
              <>
                  <dt className="text-lg">
                  <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                      <span className="font-medium text-gray-900">Didn&apos;t log in before your donation? Click here.</span>
                      <span className="ml-6 h-7 flex items-center">
                      <ChevronDownIcon
                          className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                          aria-hidden="true"
                      />
                      </span>
                  </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-base text-gray-500">If you didn&apos;t log in before making your donation, it will not be accessible through your dashboard. However, you will still be emailed both a payment receipt and tax receipt (where applicable). If you would like to also access the donation in your dashboard, please <Link href = '/support'><a className = 'text-blue-600 font-semibold'>reach out to us</a></Link> and we will be happy to help.</p>
                  </Disclosure.Panel>
              </>
              )}
            </Disclosure>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  )
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const features = [
  {
    name: 'Receive your receipt',
    position: 1,
    icon: DocumentDownloadIcon,
    description:
      <>You&apos;ll receive an email soon with your tax receipt, some handy tips, and more. The email will come from noreply@kinshipcanada.com, but if you have any questions you can reach out to us at <Link href = 'mailto:support@kinshipcanada.com'><a className = 'text-blue-600 font-semibold'>support@kinshipcanada.com</a></Link></>,
    imageSrc: '/frontend/success-receipts.webp',
    imageAlt: 'Accounting image.',
  },
  {
    name: 'Money is sent',
    position: 2,
    icon: CashIcon,
    description:
      <>At this point, Kinship Canada will collect and send the funds to the person you are helping. If you made a custom donation that is less than the amount needed (for example, contributing $1000 toward a $5400 house), we will pool funds until we can send the full amount.</>,
    imageSrc: '/frontend/success-money.jpg',
    imageAlt: 'Money changing hands image.',
  },
  {
    name: 'Receive proof of your donation',
    position: 3,
    icon: CameraIcon,
    description:
      <>Lastly, when your donation has successfully been built or received, you&apos;ll receive proof of your donation, including pictures and receipts where applicable. You will receive proof by email, and can also view it in your <Link href = '/app/proof'><a className = 'text-blue-600 font-semibold'>dashboard</a></Link> if you logged in before making a donation.</>,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-04-detail-02.jpg',
    imageAlt: 'Proof of donation image.',
  },
]


