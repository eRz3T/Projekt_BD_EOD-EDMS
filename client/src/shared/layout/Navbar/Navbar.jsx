import { useState } from 'react'
import logo from '@/assets/images/eobieg_logo_x64.png'
import { navItems } from './Navbar.utils.js'
import IconWithBadge from './IconWithBadge'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAuthorized = true

  const location = useLocation()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <menu className='sticky top-0 left-0'>
      <div className='bg-white py-3'>
        <div className='container mx-auto'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
              <img src={logo} alt='Logo' className='h-12 w-auto' />
              {!isAuthorized && (
                <span className='text-slate-900 font-semibold hidden lg:block text-xl'>eOBIEG</span>
              )}
              {isAuthorized && (
                <nav className='hidden lg:flex space-x-6 pl-8 text-xl'>
                  {navItems?.map((navItem) => (
                    <Link
                      key={navItem.id}
                      to={navItem.destinationRoute}
                      className={`${
                        location?.pathname === navItem.destinationRoute
                          ? 'text-slate-900'
                          : 'text-slate-500'
                      } font-medium hover:text-gray-300`}
                    >
                      {navItem.title}
                    </Link>
                  ))}
                </nav>
              )}
            </div>
            {isAuthorized && (
              <div className='lg:hidden'>
                <button
                  onClick={toggleMobileMenu}
                  className='text-slate-900 text-3xl focus:outline-none'
                >
                  <i className='bx bx-menu'></i>
                </button>
              </div>
            )}
            {isAuthorized && (
              <div className='hidden lg:flex items-center space-x-4'>
                <div className='flex items-center space-x-4'>
                  <IconWithBadge iconClass='chat' number={9} />
                  <IconWithBadge iconClass='bell' number={5} />
                  <div className='flex items-center space-x-2 pl-2'>
                    <div className='relative'>
                      <img
                        src='https://boredhumans.b-cdn.net/faces2/766.jpg'
                        alt='User'
                        className='h-12 w-12 rounded-full'
                      />
                      <span className='absolute right-0 bottom-0 rounded-full w-3 h-3 bg-green-500 border-solid border border-white'></span>
                    </div>
                    <div className='pl-2'>
                      <span className='block font-semibold text-lg text-slate-900'>
                        Olga Kornelska
                      </span>
                      <span className='text-sm text-slate-600'>Dział prawny</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && isAuthorized && (
        <div className='fixed top-0 left-0 w-full h-full bg-white'>
          <div className='container mx-auto h-full flex flex-col justify-center items-center space-y-4'>
            <img src={logo} alt='Logo' className='h-10 w-auto' />
            <a href='#' className=' text-slate-900 font-medium hover:text-gray-300'>
              Kokpit
            </a>
            <a href='#' className=' text-slate-600 hover:text-gray-300'>
              Zadania
            </a>
            <a href='#' className=' text-slate-600 hover:text-gray-300'>
              Dokumenty
            </a>
            <a href='#' className=' text-slate-600 hover:text-gray-300'>
              Kontakty
            </a>
            <a href='#' className=' text-slate-600 hover:text-gray-300'>
              Admin
            </a>
            <button
              onClick={toggleMobileMenu}
              className='text-slate-900 text-xl focus:outline-none mt-4'
            >
              <i className='bx bx-x'></i>
            </button>
          </div>
        </div>
      )}
    </menu>
  )
}

export default Navbar
