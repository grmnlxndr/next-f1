import Link from 'next/link'
import LinkButton from './LinkButton'

const Navbar = () => {
  return (
    <nav className={'mx-auto w-full max-w-7xl flex flex-row p-5'}>
      <div
        className={
          'flex-grow font-semibold text-center md:text-left text-5xl text-teal-800'
        }
      >
        <Link href={'/'}>
          <a className={'hover:text-teal-600'}>Next F1</a>
        </Link>
      </div>
      <ul className={'hidden md:flex md:flex-row md:items-center md:gap-5'}>
        <li>
          <Link href={'/'} passHref>
            <LinkButton>Standings</LinkButton>
          </Link>
        </li>
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
