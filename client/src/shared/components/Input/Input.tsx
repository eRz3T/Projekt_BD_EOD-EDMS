import { HTMLInputTypeAttribute } from 'react'

interface IInputProps {
  label: string
  name: string
  placeholder: string
  type: HTMLInputTypeAttribute
  isRequired: boolean
}

const Input = ({ label, name, placeholder, type, isRequired }: IInputProps) => {
  return (
    <>
      <label htmlFor={name} className='mb-2 mt-4 text-lg text-primary font-medium'>
        {label}
      </label>
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        className='border-solid border-2 border-gray-400 rounded-md px-3 py-2'
        required={isRequired}
      />
    </>
  )
}

export default Input
