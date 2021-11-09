const Layout = ({ children }) => {
  return (
    <div className={'w-full min-h-screen bg-teal-50'}>
      <header className={'text-center text-teal-500 p-5'}>Header</header>
      <main className={'mx-auto w-full max-w-5xl p-4 sm:p-6 lg:p-8'}>
        {children}
      </main>
      <footer className={'text-center text-teal-500 p-5'}>
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
