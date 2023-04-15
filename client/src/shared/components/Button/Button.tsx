import classes from './button.module.css'

const Button = ({ text }: { text: string }) => {
  return <button className={`bg-blue-600 ${classes.exampleBtn}`}>{text}</button>
}

export default Button
