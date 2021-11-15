import classNames from 'classnames'
import styles from './Button.module.css'

const Button = ({ children, className, ...props }) => {
  return (
    <button className={classNames(styles.button, className)} {...props}>
      {children}
    </button>
  )
}

export default Button
