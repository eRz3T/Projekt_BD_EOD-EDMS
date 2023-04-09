import React from 'react'

const Input = ({ label, name, placeholder, type, isRequired }) => {
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
