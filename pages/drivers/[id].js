import Image from 'next/image'
import Layout from '../../components/ui/Layout'
import { SubHeader } from '../../components/ui/Text'
import { getCurrentDriverIDs, getDriverById } from '../../lib/drivers'

export default function DriverDetailsPage({ driver }) {
  return (
    <Layout>
      <SubHeader>Driver Details Page</SubHeader>
      <p>{driver.driverName}</p>
      {driver.image && (
        <div className={'w-full'}>
          <Image
            src={driver.image.source}
            width={driver.image.width}
            height={driver.image.height}
            alt={driver.driverName}
          />
        </div>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getCurrentDriverIDs()

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const driver = await getDriverById(params.id)

  if (!driver) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      driver,
    },
  }
}
