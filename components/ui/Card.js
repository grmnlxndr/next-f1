import classNames from 'classnames'

const Card = ({ children, className, ...props }) => (
  <div
    className={classNames(
      'w-full p-2 sm:p-4 md:p-5 bg-white rounded-xl filter drop-shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export default Card
