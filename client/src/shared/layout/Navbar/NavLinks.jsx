import { Link } from 'react-router-dom'

const NavLinks = ({ navItems, pathname }) => {
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
