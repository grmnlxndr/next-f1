import classNames from 'classnames'
import styles from './Table.module.css'

export const Table = ({ children, className, ...props }) => (
  <table className={classNames(styles.table, className)} {...props}>
    {children}
  </table>
)

export const Th = ({ children, className, ...props }) => (
  <th className={classNames(styles.tableHeading, className)} {...props}>
    {children}
  </th>
)

export const Td = ({ children, className, ...props }) => (
  <td className={classNames(styles.tableCell, className)} {...props}>
    {children}
  </td>
)
