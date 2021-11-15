import RaceSnapshot from '../../../components/schedule/RaceSnapshot'
import Card from '../../../components/ui/Card'
import Layout from '../../../components/ui/Layout'
import { SubHeader } from '../../../components/ui/Text'
import {
  getCurrentSeasonIDs,
  getResultBySeasonAndRound,
} from '../../../lib/results'

export default function ResultsDetailsPage({ result }) {
  return (
    <Layout>
      <SubHeader className={'mb-5'}>Result Details</SubHeader>
      <Card>
        <RaceSnapshot race={result} withConstructor collapsible={false} />
      </Card>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getCurrentSeasonIDs()

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const result = await getResultBySeasonAndRound(params.season, params.round)

  if (!result) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      result,
    },
    revalidate: 24 * 60 * 60,
  }
}
