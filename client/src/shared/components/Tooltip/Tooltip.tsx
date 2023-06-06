import styles from './tooltip.module.css'

interface ITooltipProps {
  tooltipContent: string | JSX.Element
  label: string | JSX.Element
}

const Tooltip = ({ tooltipContent, label }: ITooltipProps) => {
  return (
    <div className='relative inline-block'>
      <span className={styles.tooltipLabel}>{label}</span>
      <div
        className='absolute left-0 z-10 invisible w-auto p-2 text-sm leading-none text-primary whitespace-no-wrap bg-slate-100 rounded shadow-lg opacity-90 -bottom-6 ani transition-all duration-200'
        style={{ minWidth: '200px' }}
      >
        {tooltipContent}
      </div>
    </div>
  )
}

export default Tooltip
