// import Head from 'next/head'
// import Image from 'next/image'
import ScheduleSnapshot from '../components/schedule/ScheduleSnapshot'
import StandingsTable, {
  CONSTRUCTOR_STANDING_HEADER,
  DRIVER_STANDING_HEADER,
  renderConstructor,
  renderDriver,
} from '../components/standings/StandingsTable'
import Layout from '../components/ui/Layout'
import { SubHeader } from '../components/ui/Text'
import { getNextRace } from '../lib/schedule'
import { getCurrentStandings } from '../lib/standings'
// import styles from '../styles/Home.module.css'

export default function Home({
  driverStandings,
  constructorStandings,
  nextRace,
}) {
  return (
    <Layout>
      <div className={'w-full flex flex-col lg:flex-row gap-5 lg:gap-0'}>
        <div className={'flex-grow lg:p-5'}>
          <SubHeader className={'mb-4'}>Home Page</SubHeader>
          <ScheduleSnapshot title={'Next Race'} schedule={nextRace} />
        </div>
        <div
          className={
            'text-sm flex flex-col items-center gap-5 w-full lg:max-w-xs'
          }
        >
          <StandingsTable
            title={'Driver Standings'}
            standings={driverStandings}
            header={DRIVER_STANDING_HEADER}
            renderRow={renderDriver}
            collapsible
          />
          <StandingsTable
            title={'Constructor Standings'}
            standings={constructorStandings}
            header={CONSTRUCTOR_STANDING_HEADER}
            renderRow={renderConstructor}
            collapsible
          />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const { driverStandings, constructorStandings } = await getCurrentStandings()
  const nextRace = await getNextRace()

  return {
    props: {
      driverStandings,
      constructorStandings,
      nextRace,
    },
    revalidate: 24 * 60 * 60,
  }
}
