import React from 'react'
import cn from 'classnames'

export default function Button({ children, className, variant = 'primary', ...props }) {
  return (
    <button
      className={cn('btn', {
        'btn-primary': variant === 'primary'
      }, className)}
      {...props}
    >
      {children}
    </button>
  )
}
