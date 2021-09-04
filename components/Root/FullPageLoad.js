import Loader from './Loader.js'

export default function FullPageLoad() {
	return (
		<div className = 'w-screen h-screen flex justify-center items-center'>
			<Loader />
		</div>
	)
}