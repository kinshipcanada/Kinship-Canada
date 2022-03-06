import 'tailwindcss/tailwind.css'
import { Toaster } from 'react-hot-toast';
import LiveChat from 'react-livechat';
import MobileCart from '../components/Root/MobileCartComponent';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
      <div suppressHydrationWarning={true}>
          { process.browser && <LiveChat license={"13359144"} /> }
          <div></div>
      </div>
      <MobileCart />
    </>
  )
}

export default MyApp
