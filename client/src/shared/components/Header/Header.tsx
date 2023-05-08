import React from 'react'
import { IHeaderProps } from './Header.types'

const Header = ({ icon, title, addon }: IHeaderProps) => {
  return (
    <header className='flex justify-between my-3 items-center'>
      <h3 className='text-xl'>
        {!!icon && <i className={`bx ${icon} mr-2`}></i>} {title}
      </h3>
      {!!addon && <p className='text-sm text-blueish'>{addon}</p>}
    </header>
  )
}

export default Header
