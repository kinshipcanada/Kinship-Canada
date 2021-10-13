import { BookOpenIcon, InboxIcon, SparklesIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export default function Features() {
  return (
    <div className="relative bg-white pt-16 pb-32 overflow-hidden">
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-600">
                  <InboxIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Receive Proof Of Where Your Donation Goes
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Kinship sends you proof of what your donation has built, including pictures and reciepts. Directly see the impact that your donation makes.
                </p>
                <div className="mt-6">
                    <Link href = '/donate'>
                        <a
                        className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Donate
                        </a>
                    </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <blockquote>
                <div>
                  <p className="text-base text-gray-500">
                    &ldquo;Those who give their wealth by night and day, secretly and openly, they shall have their reward near their Lord, and they will have no fear, nor will they grieve. &rdquo;
                  </p>
                </div>
                <footer className="mt-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className = 'bg-green-100 p-1.5 rounded-full'>
                        <BookOpenIcon
                          className="h-6 w-6 rounded-full text-green-600"
                          src=""
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="text-base font-medium text-gray-700">Holy Qur'an, 2:274</div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/frontend/proof.png"
                alt="Inbox user interface"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-600">
                  <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Get CRA-Eligible Tax Receipts
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Kinship Canada is a registered Canadian charity. If you donate as a Canadian, you will receive a CRA-Eligible tax receipt by email. During tax season you can also download all past receipts from your dashboard.
                </p>
                <div className="mt-6">
                    <Link href = '/donate'>
                        <a
                        className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Donate
                        </a>
                    </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/frontend/receipts.png"
                alt="Customer profile user interface"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
