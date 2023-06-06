import { useState } from 'react'
import logo from '@/assets/images/eobieg_logo_x64.png'
import avatarPlaceholder from '@/assets/images/avatar_placeholder.jpg'
import { navItems } from './Navbar.utils.js'
import { useLocation } from 'react-router-dom'
import IconWithBadge from './IconWithBadge'
import NavLinks from './NavLinks'
import { useAuth } from '@/providers/AuthProvider.js'
import { logout } from '@/core/store/auth/authSlice.js'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore.js'
import { selectUser } from '@/core/store/auth/authSelectors.js'
import { Link } from 'react-router-dom'
import { ClientRoutes } from '@/core/router/Routes.enum.js'

const Navbar = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = useAppSelector(selectUser)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <menu className='sticky top-0 left-0 bg-white z-50 shadow-md'>
      <div className='py-3 px-2'>
        <div className='container mx-auto'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
              <img src={logo} alt='Logo' className='h-12 w-auto' />
              {!isAuthenticated && (
                <span className='text-slate-900 font-semibold text-xl'>eOBIEG</span>
              )}
              {isAuthenticated && (
                <nav className='hidden lg:flex space-x-6 pl-8 text-xl'>
                  <NavLinks navItems={navItems} pathname={location.pathname} />
                  {user?.role === 'admin' && (
                    <Link
                      to={ClientRoutes.ADMIN}
                      className={`${
                        location.pathname === ClientRoutes.ADMIN
                          ? 'text-slate-900'
                          : 'text-slate-500'
                      } font-medium hover:text-slate-400 transition-colors`}
                    >
                      Admin
                    </Link>
                  )}
                </nav>
              )}
            </div>
            {isAuthenticated && (
              <div className='lg:hidden'>
                <button
                  onClick={toggleMobileMenu}
                  className='text-slate-900 text-3xl focus:outline-none'
                >
                  <i className='bx bx-menu'></i>
                </button>
              </div>
            )}
            {isAuthenticated && (
              <div className='hidden lg:flex items-center space-x-4'>
                <div className='flex items-center space-x-4'>
                  {/* <IconWithBadge iconClass='chat' number={9} />
                  <IconWithBadge iconClass='bell' number={5} /> */}
                  <button onClick={() => dispatch(logout())}>
                    <IconWithBadge iconClass='log-out' />
                  </button>
                  <div className='flex items-center space-x-2 pl-2'>
                    <div className='relative'>
                      <img src={avatarPlaceholder} alt='User' className='h-12 w-12 rounded-full' />
                      <span className='absolute right-0 bottom-0 rounded-full w-3 h-3 bg-green-500 border-solid border border-white'></span>
                    </div>
                    <div className='pl-2'>
                      <span className='block font-semibold text-lg text-slate-900'>
                        {user?.username}
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

      {mobileMenuOpen && isAuthenticated && navItems.length > 0 && (
        <div className='fixed top-0 left-0 w-full h-full bg-white'>
          <div className='container mx-auto h-full flex flex-col justify-center items-center space-y-4'>
            <img src={logo} alt='Logo' className='h-10 w-auto' />
            <NavLinks navItems={navItems} pathname={location.pathname} />
            <button
              onClick={toggleMobileMenu}
              className='text-slate-900 text-xl focus:outline-none mt-4'
            >
              <i className='bx bx-x text-4xl text-slate-700'></i>
            </button>
          </div>
        </div>
      )}
    </menu>
  )
}

export default Navbar
