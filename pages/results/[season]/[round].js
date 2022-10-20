import Link from 'next/link'
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
      <SubHeader className={'mb-1'}>Result Details</SubHeader>
      <Link href={`/results/${result.season}`}>
        <a className="text-xs block text-center mx-auto mb-5 text-gray-600 hover:underline">
          View season {result.season}
        </a>
      </Link>
      <Card>
        <RaceSnapshot
          race={result}
          withConstructor
          collapsible={false}
          noLink
        />
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
