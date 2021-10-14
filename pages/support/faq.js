import Navbar from '../../components/Root/Navbar'
import Head from 'next/head'
import Footer from '../../components/Root/Footer'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

export default function Faq() {
    return (
        <div>
            <Head>
                <title>Kinship Canada · Frequently Asked Questions</title>
            </Head>
            <Navbar />
            <main>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently asked questions</h2>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                        {faqs.map((faq) => (
                        <Disclosure as="div" key={faq.question} className="pt-6">
                            {({ open }) => (
                            <>
                                <dt className="text-lg">
                                <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                    <span className="font-medium text-gray-900">{faq.question}</span>
                                    <span className="ml-6 h-7 flex items-center">
                                    <ChevronDownIcon
                                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                        aria-hidden="true"
                                    />
                                    </span>
                                </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                <p className="text-base text-gray-500">{faq.answer}</p>
                                </Disclosure.Panel>
                            </>
                            )}
                        </Disclosure>
                        ))}
                    </dl>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

const faqs = [
  {
    question: "Is Kinship Canada a registered charity?",
    answer:
      "Kinship Canada is a registered Canadian charity. Registration number 855070728 RR 0001",
  },
  {
    question: "What do you mean by all proceeds go to source?",
    answer:
      "Unless you decide to cover processing fees, Kinship pays for it out of pocket. Any other costs incurred in sending your money to the donee, such as flights and hotels for volunteers, wire transfer fees, etc, Kinship pays for out of pocket.",
  },
  {
    question: "How and when will I receive proof of my donation?",
    answer:
      "You will receive proof of your donation both by email and on your dashboard (in the proof tab). If you donate a custom amount, proof may take longer as we pool funds to provide one full donation - for example, if you donate $500 towards a house we would wait for the remaining amount needed to build one full house before sending the funds.",
  },
  {
    question: "Can I make Khums donations?",
    answer:
      "Yes, you can make Khums donations with Kinship Canada by going to https://new.kinshipcanada.com/khums",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
