import { useState } from 'react'
import { colors } from './ColorPicker.utils'

interface IColorPickerProps {
  selectedColor: string
  onColorSelect: (color: string) => void
  label: string
}

export const ColorPicker = ({ selectedColor, onColorSelect, label }: IColorPickerProps) => {
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
        <button style={{ background: selectedColor }}>{selectedColor}</button>
        {isOpen && (
          <div
            className='absolute w-64 p-2 bg-white z-50'
            style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}
          >
            {colors.map((color, index) => (
              <div
                key={index}
                className={`w-full pt-[100%] rounded-md cursor-pointer ${
                  color === selectedColor ? 'border-2 border-black' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onColorSelect(color)
                  setIsOpen(false)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
