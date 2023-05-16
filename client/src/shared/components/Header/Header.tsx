import { IHeaderProps } from './Header.types'

const Header = ({ icon, title, subtitle, addon }: IHeaderProps) => {
  return (
    <header className='flex justify-between my-3 items-center'>
      <div>
        <h3 className='text-xl'>
          {!!icon && <i className={`bx ${icon} mr-2`}></i>}
          {title}
        </h3>
        <p className='text-md text-secondary'>{subtitle}</p>
      </div>
      {!!addon && <p className='text-sm text-blueish'>{addon}</p>}
    </header>
  )
}

export default Header
