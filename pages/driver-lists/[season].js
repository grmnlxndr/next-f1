import DriversTable from '../../components/drivers/DriversTable'
import Card from '../../components/ui/Card'
import Layout from '../../components/ui/Layout'
import { SubHeader } from '../../components/ui/Text'
import { getDriversBySeason } from '../../lib/drivers'
import { getSeasonIDs } from '../../lib/seasons'

export default function DriverListPage({ drivers, season }) {
  return (
    <Layout>
      <SubHeader className={'mb-2 capitalize'}>
        {season} Season Drivers
      </SubHeader>
      <Card>
        <DriversTable drivers={drivers} />
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

export async function getStaticProps({ params: { season } }) {
  const drivers = await getDriversBySeason(season)

  if (!drivers) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      drivers,
      season,
    },
    revalidate: 24 * 60 * 60,
  }
}
