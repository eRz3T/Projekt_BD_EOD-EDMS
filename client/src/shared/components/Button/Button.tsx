const Button = ({ text }: { text: string }) => {
  return (
    <button className={`bg-violets px-4 py-2 text-white rounded-md text-center`}>{text}</button>
  )
}

export default Button
