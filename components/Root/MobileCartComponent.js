import { ShoppingCartIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export default function MobileCart() {

  return (
    <Link href = '/cart'>
      <a
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-4 pointer-events-none cursor-pointer"
      >
        <div className="w-full flex flex-col items-start space-y-4 sm:items-end">
          <div>
            <div className="max-w-sm w-full bg-white shadow-lg rounded-full pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden bg-blue-700">
              <div className="p-4">
                <div className="flex items-start">
                  <ShoppingCartIcon className='w-7 h-7 text-white' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
