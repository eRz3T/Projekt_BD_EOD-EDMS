import { HTMLInputTypeAttribute } from 'react'

interface IInputProps {
  label: string
  name: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  register?: any
  error?: string
  isSearchBox?: boolean
}

const Input = ({ label, name, placeholder, register, type, error, isSearchBox }: IInputProps) => {
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={name} className='mb-2 mt-4 text-lg text-primary font-medium'>
        {label} <span className='text-sm text-red-500'>{error && error.toString()}</span>
      </label>
      <div
        className={`flex w-full flex-row border-solid border-2 rounded-md items-center ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      >
        <input
          id={name}
          placeholder={placeholder}
          type={type ? type : 'text'}
          className={`px-3 py-2 w-full `}
          {...register}
        />
        {isSearchBox && (
          <span className='text-xl px-2 pt-1'>
            <i className='bx bx-search'></i>
          </span>
        )}
      </div>
    </div>
  )
}

export default Input
