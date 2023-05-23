import { ReactNode } from 'react'

interface ITitleProps {
  title: string
  subtitle?: string
  adornment: ReactNode | string
  identifier?: string
  variant: 'primary-selected' | 'full-selected' | 'primary' | 'success'
  onClick?: () => void
}

const Tile = ({ title, subtitle, adornment, identifier, variant, onClick }: ITitleProps) => {
  const tileContainerVariantClass =
    variant === 'primary' || variant === 'primary-selected'
      ? 'bg-light text-primary'
      : variant === 'success'
      ? 'bg-light text-primary'
      : 'bg-blueish text-white'

  const tileAdornmentVariantClass =
    variant === 'full-selected' || variant === 'primary-selected'
      ? 'bg-blueish text-white'
      : variant === 'success'
      ? 'bg-green-400 text-white'
      : 'bg-light text-primary'

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-row items-center mb-2 rounded-md transition-all duration-200 hover:opacity-80 cursor-pointer ${tileContainerVariantClass}`}
    >
      <div
        className={`flex items-center justify-center text-4xl text-secondary pt-4 pb-2 px-3 border-r-4 border-white mr-4 rounded-l-md ${tileAdornmentVariantClass}`}
      >
        {adornment ? adornment : 'N'}
      </div>
      <div className='flex flex-col'>
        <p>{title}</p>
        <p className='text-sm'>{subtitle}</p>
      </div>
      {identifier && variant !== 'full-selected' && (
        <div className={`absolute min-h-full px-[5px] right-0 rounded-r-md ${identifier}`}></div>
      )}
    </div>
  )
}

export default Tile
