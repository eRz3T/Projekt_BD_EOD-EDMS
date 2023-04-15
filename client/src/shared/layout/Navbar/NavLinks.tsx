import { Link } from 'react-router-dom'
import { INavItem } from './Navbar.utils'

interface INavLinksProps {
  navItems: INavItem[]
  pathname: string
}

const NavLinks = ({ navItems, pathname }: INavLinksProps) => {
  return (
    <>
      {navItems?.map((navItem) => (
        <Link
          key={navItem.id}
          to={navItem.destinationRoute}
          className={`${
            pathname === navItem.destinationRoute ? 'text-slate-900' : 'text-slate-500'
          } font-medium hover:text-slate-400 transition-colors`}
        >
          {navItem.title}
        </Link>
      ))}
    </>
  )
}

export default NavLinks
