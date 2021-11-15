import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.css'

const LinkButton = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <a className={classNames(styles.button, className)} {...props} ref={ref}>
        {children}
      </a>
    )
  }
)

LinkButton.displayName = 'LinkButton'

export default LinkButton
