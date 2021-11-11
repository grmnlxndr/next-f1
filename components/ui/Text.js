import classNames from 'classnames'

export const PageHeader = ({ children, className, ...props }) => (
  <h1
    className={classNames(
      'text-5xl font-sans font-semibold text-teal-800 text-center',
      className
    )}
    {...props}
  >
    {children}
  </h1>
)

export const SubHeader = ({ children, className, ...props }) => (
  <h2
    className={classNames(
      'text-2xl font-sans text-gray-500 text-center',
      className
    )}
    {...props}
  >
    {children}
  </h2>
)
