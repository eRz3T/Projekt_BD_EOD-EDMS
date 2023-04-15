import { HTMLInputTypeAttribute, useState } from 'react'

interface IInputProps {
  label: string
  name: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  register?: any
  error?: string
}

const Input = ({ label, name, placeholder, register, type, error }: IInputProps) => {
  return (
    <>
      <label htmlFor={name} className='mb-2 mt-4 text-lg text-primary font-medium'>
        {label} <span className='text-sm text-red-500'>{error && error.toString()}</span>
      </label>
      <input
        id={name}
        placeholder={placeholder}
        type={type ? type : 'text'}
        className={`border-solid border-2 rounded-md px-3 py-2 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
        {...register}
      />
    </>
  )
}

export default Input
