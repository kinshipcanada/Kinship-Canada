const stats = [
    { name: 'Total Funds Received', stat: '$71.22k USD' },
    { name: 'Total Funds Processed', stat: '$58.16k USD' },
    { name: 'Number Of Proofs Uploaded', stat: '2' },
]

export default function Stats() {
return (
    <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 bg-white border border-gray-300 rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
            </div>
            ))}
        </dl>
    </div>
)
}
  