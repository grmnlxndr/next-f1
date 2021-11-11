import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className={'w-full min-h-screen bg-teal-50'}>
      <header className={'text-center text-teal-500 p-5'}>
        <Navbar />
      </header>
      <main className={'mx-auto w-full max-w-5xl p-4 sm:p-6 lg:p-8'}>
        {children}
      </main>
      <footer className={'w-full text-center text-white p-5 bg-teal-600 border-t-2 border-teal-800'}>
        Data provided by{' '}
        <a
          className={'underline'}
          href={'http://ergast.com/mrd'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          ERGAST API
        </a>
      </footer>
    </div>
  )
}

export default Layout
