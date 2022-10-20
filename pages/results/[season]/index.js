import Link from 'next/link'
import SessionTable from '../../../components/sessions/SessionsTable'
import StandingsTable, {
  CONSTRUCTOR_STANDING_HEADER,
  DRIVER_STANDING_HEADER,
  renderConstructor,
  renderDriver,
} from '../../../components/standings/StandingsTable'
import Card from '../../../components/ui/Card'
import Layout from '../../../components/ui/Layout'
import { SubHeader } from '../../../components/ui/Text'
import { getSeasonIDs, getSessionsBySeason } from '../../../lib/seasons'
import { getStandings } from '../../../lib/standings'

export default function SessionRacesPage({
  sessions,
  driverStandings,
  constructorStandings,
}) {
  const season = Number(sessions[0].season)
  const firstSeason = season <= 1950
  const lastSeason = season >= new Date().getFullYear()

  return (
    <Layout>
      <SubHeader className={'mb-2'}>Season {season}</SubHeader>
      <div className="flex flex-row justify-center gap-5 items-center mb-5">
        {!firstSeason && (
          <Link href={`/results/${season - 1}`}>
            <a className="text-xs text-center text-gray-600 hover:underline">
              View {season - 1}
            </a>
          </Link>
        )}
        {!lastSeason && (
          <Link href={`/results/${season + 1}`}>
            <a className="text-xs text-center text-gray-600 hover:underline">
              View {season + 1}
            </a>
          </Link>
        )}
      </div>
      {driverStandings && driverStandings.length > 0 && (
        <Card className={'mb-5'}>
          <StandingsTable
            title={'Driver Standings'}
            standings={driverStandings}
            header={DRIVER_STANDING_HEADER}
            renderRow={renderDriver}
            collapsible
          />
        </Card>
      )}
      {constructorStandings && constructorStandings.length > 0 && (
        <Card className={'mb-5'}>
          <StandingsTable
            title={'Constructor Standings'}
            standings={constructorStandings}
            header={CONSTRUCTOR_STANDING_HEADER}
            renderRow={renderConstructor}
            collapsible
          />
        </Card>
      )}
      <Card>
        <SessionTable races={sessions} />
      </Card>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getSeasonIDs()

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const sessions = await getSessionsBySeason(params.season)

  if (!sessions || !sessions.length) {
    return {
      notFound: true,
    }
  }

  const { driverStandings, constructorStandings } = await getStandings(
    params.season
  )

  return {
    props: {
      sessions,
      driverStandings,
      constructorStandings,
    },
    revalidate: 24 * 60 * 60,
  }
}
