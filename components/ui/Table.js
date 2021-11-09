import classNames from 'classnames'

export const Table = ({ children, className, ...props }) => (
  <table className={classNames('w-full table-auto', className)} {...props}>
    {children}
  </table>
)

export const Th = ({ children, className, ...props }) => (
  <th
    className={classNames(
      'border-b bg-teal-100 border-teal-500 text-teal-500 p-1',
      className
    )}
    {...props}
  >
    {children}
  </th>
)

export const Td = ({ children, className, ...props }) => (
  <td className={classNames('text-teal-500 p-1', className)} {...props}>
    {children}
  </td>
)
