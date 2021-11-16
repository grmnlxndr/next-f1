import SessionTable from '../../../components/sessions/SessionsTable'
import Card from '../../../components/ui/Card'
import Layout from '../../../components/ui/Layout'
import { SubHeader } from '../../../components/ui/Text'
import { getSeasonIDs, getSessionsBySeason } from '../../../lib/seasons'

export default function SessionRacesPage({ sessions }) {
  return (
    <Layout>
      <SubHeader className={'mb-5'}>Season {sessions[0].season}</SubHeader>
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

  return {
    props: {
      sessions,
    },
    revalidate: 24 * 60 * 60,
  }
}
