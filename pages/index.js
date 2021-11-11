// import Head from 'next/head'
// import Image from 'next/image'
import RaceSnapshot from '../components/schedule/RaceSnapshot'
import StandingsTable, {
  CONSTRUCTOR_STANDING_HEADER,
  DRIVER_STANDING_HEADER,
  renderConstructor,
  renderDriver,
} from '../components/standings/StandingsTable'
import Card from '../components/ui/Card'
import Layout from '../components/ui/Layout'
import { SubHeader } from '../components/ui/Text'
import { getlastRaceResults } from '../lib/results'
import { getNextRace } from '../lib/schedule'
import { getCurrentStandings } from '../lib/standings'
// import styles from '../styles/Home.module.css'

export default function Home({
  driverStandings,
  constructorStandings,
  nextRace,
  lastResults,
}) {
  return (
    <Layout>
      <div className={'w-full flex flex-col lg:flex-row gap-5 lg:gap-0'}>
        <div className={'flex-grow lg:p-5'}>
          <SubHeader className={'mb-4'}>Home Page</SubHeader>
          <Card className={'mb-5'}>
            <RaceSnapshot title={'Next Race'} race={nextRace} />
          </Card>
          <Card>
            <RaceSnapshot title={'Last Race'} race={lastResults} />
          </Card>
        </div>
        <div
          className={
            'text-sm flex flex-col items-center gap-5 w-full lg:max-w-xs'
          }
        >
          <Card>
            <StandingsTable
              title={'Driver Standings'}
              standings={driverStandings}
              header={DRIVER_STANDING_HEADER}
              renderRow={renderDriver}
              collapsible
            />
          </Card>
          <Card>
            <StandingsTable
              title={'Constructor Standings'}
              standings={constructorStandings}
              header={CONSTRUCTOR_STANDING_HEADER}
              renderRow={renderConstructor}
              collapsible
            />
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const { driverStandings, constructorStandings } = await getCurrentStandings()
  const nextRace = await getNextRace()
  const lastResults = await getlastRaceResults()

  return {
    props: {
      driverStandings,
      constructorStandings,
      nextRace,
      lastResults,
    },
    revalidate: 24 * 60 * 60,
  }
}
