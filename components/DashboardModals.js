export const TaxReceiptPackage = ({ user }) => {
    return (
      <div className="bg-gray-50 sm:rounded-lg border">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Tax season is coming up</h3>
          <div className="mt-2 text-sm text-gray-500">
            <p>Download a folder with all your tax receipts for fiscal year 2021. Package includes receipts and a spreadsheet with how much you donated, causes donated to, amount eligible for each donation, and more.</p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Download Package
            </button>
          </div>
        </div>
      </div>
    )
  }
  