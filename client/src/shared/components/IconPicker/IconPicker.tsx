import { useState } from 'react'
import { icons } from './IconPicker.utils'

interface IColorPickerProps {
  selectedIcon: string
  onIconSelect: (color: string) => void
  label: string
}

export const IconPicker = ({ selectedIcon, onIconSelect, label }: IColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <label className='mb-2 mt-4 text-lg text-primary font-medium'>{label}</label>
      <div
        onClick={toggleOpen}
        className='relative w-full border-solid border-2 rounded-md px-3 py-2 border-gray-300'
      >
        <div className='text-xl bg-light rounded-md w-16 text-center'>
          <i className={`bx ${selectedIcon}`}></i>
        </div>
        {isOpen && (
          <div
            className='absolute w-64 p-2 bg-white'
            style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}
          >
            {icons.map((icon, index) => (
              <div
                key={index}
                className={`w-full p-[20%] bg-light cursor-pointer rounded-md text-xl flex items-center justify-center ${
                  icon === selectedIcon ? 'border-2 border-black' : ''
                }`}
                onClick={() => {
                  onIconSelect(icon)
                  setIsOpen(false)
                }}
              >
                <i className={`bx ${icon}`}></i>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
