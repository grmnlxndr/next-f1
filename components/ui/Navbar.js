import Link from 'next/link'
import LinkButton from './LinkButton'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brandWrapper}>
        <Link href={'/'}>
          <a className={styles.brand}>Next F1</a>
        </Link>
      </div>
      <ul className={styles.linksWrapper}>
        <li>
          <Link href={'/drivers'} passHref>
            <LinkButton>Drivers</LinkButton>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
