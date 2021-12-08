import Navbar from "../../components/Root/Navbar"
import Footer from "../../components/Root/Footer"
import Link from "next/link"
import { ExternalLinkIcon } from "@heroicons/react/outline"

export default function Orphans() {
    return (
        <div>
            <Navbar />
            <div className = "p-8">
                <h1 className = "font-medium text-2xl mb-3">Help Support An Orphan.</h1>
                <p className = "font-regular text-lg">Kinship Canada is raising for a campaign to try and sponser 12 children this month, in the name of Sayyida Fatema (A.S.). Please contribute as much as you can.</p>
                <div className = "flex justify-center mt-4">
                    <Link href='https://buy.stripe.com/3cseVgeV39BWcqQ146'>
                        <a className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                            Donate $100 Per Month
                            <ExternalLinkIcon className = "ml-2 w-5 h-5"/>
                        </a>
                    </Link>
                    <Link href='https://buy.stripe.com/bIY9AW14d8xS0I89AB'>
                        <a className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                            Donate $1200 For A Year
                            <ExternalLinkIcon className = "ml-2 w-5 h-5"/>
                        </a>
                    </Link>
                </div>
                <div className = "mt-4 flex items-center justify-center">
                    <img src = "/campaigns/orphans/main.jpeg" className = "mt-4 w-1/2" />
                </div>
            </div>
            <Footer />
        </div>
    )
}