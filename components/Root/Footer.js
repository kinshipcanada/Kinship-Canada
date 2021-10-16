/* This example requires Tailwind CSS v2.0+ */
const navigation = [
    {
      name: 'Facebook',
      href: '#',
    },
    {
      name: 'Instagram',
      href: '#',
    },
    {
      name: 'Twitter',
      href: '#',
    },
    {
      name: 'GitHub',
      href: '#',
    },
    {
      name: 'Dribbble',
      href: '#',
    },
  ]
  
  export default function Footer() {
    return (
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8 flex justify-center text-center">
          <div className="mt-8 md:mt-0 md:order-1 flex justify-center text-center w-full">
            <p className="text-center text-base text-gray-400 text-center">&copy; Kinship Canada is a registered charity. Registration Number 855070728 RR 0001</p>
          </div>
        </div>
      </footer>
    )
  }
  