import classNames from 'classnames'
import React, { FC, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: 'default' | 'primary'
  ghost?: boolean
  noSpace?: boolean
}

export const Button: FC<Props> = ({
  children,
  theme = 'default',
  ghost = false,
  noSpace = false,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={classNames(styles.button, {
        [styles.primary]: theme === 'primary',
        [styles.ghost]: ghost,
        [styles.noSpace]: noSpace
      })}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'
