import Head from 'next/head'
import Navbar from './Navbar'
import styles from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      <Head>
        <title>Next F1</title>
        <meta name="description" content="A Nextjs app about F1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
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
