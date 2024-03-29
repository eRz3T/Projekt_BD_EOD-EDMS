import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

interface ISelectProps {
  label: string
  name: string
  register?: any
  error?: string
  options?: {
    name: string
    value: string
  }[]
  defaultOption?: {
    name: string
    value: string
  } | null
}

export const Select = ({ label, name, register, error, options, defaultOption }: ISelectProps) => {
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={name} className='mb-2 mt-4 text-lg text-primary font-medium'>
        {label}
        <span className='text-sm text-red-500'>{error && error.toString()}</span>
      </label>
      <select
        name={name}
        {...register(name)}
        id={name}
        className='border-solid border-2 rounded-md px-3 py-2 border-gray-300'
      >
        {!!defaultOption && <option value={defaultOption.value}>{defaultOption.name}</option>}
        {options &&
          options.map((option) => (
            <option key={`${option}-${uuid()}`} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  )
}
