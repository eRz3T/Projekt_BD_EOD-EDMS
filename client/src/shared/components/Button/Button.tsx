import { HTMLProps } from 'react'

interface IButtonProps {
  text: string
  variant?: 'violets' | 'blueish'
  type?: 'submit' | 'reset' | 'button'
}

const Button = ({ text, variant, type }: IButtonProps) => {
  return (
    <button
      type={type}
      className={`${
        variant ? `bg-${variant}` : 'bg-violets'
      } px-4 py-2 text-white rounded-md text-center font-medium text-lg`}
    >
      {text}
    </button>
  )
}

export default Button
