import Button from './Button'

const Navbar = () => {
  return (
    <nav className={'mx-auto w-full max-w-7xl flex flex-row p-5'}>
      <div
        className={
          'flex-grow font-semibold text-center md:text-left text-5xl text-teal-800'
        }
      >
        Next F1
      </div>
      <ul className={'hidden md:flex md:flex-row md:items-center md:gap-5'}>
        <li>
          <Button>Standings</Button>
        </li>
        <li>
          <Button>Drivers</Button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
