// import Head from 'next/head'
// import Image from 'next/image'
import StandingsTable, {
  CONSTRUCTOR_STANDING_HEADER,
  DRIVER_STANDING_HEADER,
  renderConstructor,
  renderDriver,
} from '../components/standings/StandingsTable'
import { getCurrentStandings } from '../lib/standings'
// import styles from '../styles/Home.module.css'

export default function Home({ driverStandings, constructorStandings }) {
  return (
    <div>
      <h1>Next F1</h1>
      <StandingsTable
        standings={driverStandings}
        header={DRIVER_STANDING_HEADER}
        renderRow={renderDriver}
      />
      <StandingsTable
        standings={constructorStandings}
        header={CONSTRUCTOR_STANDING_HEADER}
        renderRow={renderConstructor}
      />
    </div>
  )
}

export async function getStaticProps(context) {
  const { driverStandings, constructorStandings } = await getCurrentStandings()

  return {
    props: {
      driverStandings,
      constructorStandings,
    },
    revalidate: 24 * 60 * 60,
  }
}
