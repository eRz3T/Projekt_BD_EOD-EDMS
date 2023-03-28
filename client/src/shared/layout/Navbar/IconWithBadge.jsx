import React from 'react'

const IconWithBadge = ({ iconClass, number }) => {
  return (
    <div className='relative'>
      <i class={`bx bx-${iconClass} text-slate-600 text-3xl`}></i>
      {number && (
        <span className='absolute right-0 top-0 rounded-full w-4 h-4 bg-red-700 text-center'>
          <p className='text-white' style={{ fontSize: '11px' }}>
            {number}
          </p>
        </span>
      )}
    </div>
  )
}

export default IconWithBadge
