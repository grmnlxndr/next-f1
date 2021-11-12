import classNames from 'classnames'

const LinkButton = ({ children, className, ...props }) => {
  return (
    <a
      className={classNames(
        'px-5 py-2 text-white border-b-2 border-teal-800 bg-teal-600 hover:bg-teal-500 hover:border-teal-600 font-semibold rounded filter drop-shadow',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export default LinkButton
