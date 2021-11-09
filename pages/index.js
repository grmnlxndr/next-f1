// import Head from 'next/head'
// import Image from 'next/image'
import StandingsTable, {
  CONSTRUCTOR_STANDING_HEADER,
  DRIVER_STANDING_HEADER,
  renderConstructor,
  renderDriver,
} from '../components/standings/StandingsTable'
import Layout from '../components/ui/Layout'
import { PageHeader, SubHeader } from '../components/ui/Text'
import { getCurrentStandings } from '../lib/standings'
// import styles from '../styles/Home.module.css'

export default function Home({ driverStandings, constructorStandings }) {
  return (
    <Layout>
      <PageHeader className={'mb-2'}>Next F1</PageHeader>
      <SubHeader className={'mb-4'}>Home Page</SubHeader>
      <div
        className={
          'flex text-sm sm:text-base flex-col lg:flex-row w-full items-center lg:items-start content-between gap-5'
        }
      >
        <StandingsTable
          title={'Driver Standings'}
          standings={driverStandings}
          header={DRIVER_STANDING_HEADER}
          renderRow={renderDriver}
        />
        <StandingsTable
          title={'Constructor Standings'}
          standings={constructorStandings}
          header={CONSTRUCTOR_STANDING_HEADER}
          renderRow={renderConstructor}
        />
      </div>
    </Layout>
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
