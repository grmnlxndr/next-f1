import Image from 'next/image'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Layout from '../../components/ui/Layout'
import { SubHeader } from '../../components/ui/Text'
import { getCurrentDriverIDs, getDriverById } from '../../lib/drivers'
import Card from '../../components/ui/Card'
import LinkButton from '../../components/ui/LinkButton'

dayjs.extend(localizedFormat)

export default function DriverDetailsPage({
  driver: { image, driverName, nationality, number, code, dateOfBirth, url },
}) {
  return (
    <Layout>
      <SubHeader className={'mb-5'}>Driver Details Page</SubHeader>
      <Card className={'flex flex-col lg:flex-row items-center gap-5 p-5 mb-5'}>
        {image && (
          <div className={'w-full lg:w-80'}>
            <Image
              className={'rounded-lg'}
              src={image.source}
              width={image.width}
              height={image.height}
              alt={driverName}
            />
          </div>
        )}
        <div className={'flex-grow self-stretch flex flex-col justify-between'}>
          <div>
            <h2
              className={
                'text-center font-semibold text-2xl text-teal-800 mb-5'
              }
            >
              {driverName}
            </h2>
            {nationality && (
              <p className={'mb-3 text-gray-700'}>
                <span className={'font-semibold'}>Nationality:</span>{' '}
                {nationality}
              </p>
            )}
            {dateOfBirth && (
              <p className={'mb-3 text-gray-700'}>
                <span className={'font-semibold'}>Date of Birth:</span>{' '}
                {dayjs(dateOfBirth).format('l')}
              </p>
            )}
            {number && (
              <p className={'mb-3 text-gray-700'}>
                <span className={'font-semibold'}>Number:</span> {number}
              </p>
            )}
            {code && (
              <p className={'mb-3 text-gray-700'}>
                <span className={'font-semibold'}>Code:</span> {code}
              </p>
            )}
          </div>
          {url && (
            <div className={'w-full text-center justify-self-end py-4'}>
              <LinkButton
                href={url}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                Biography
              </LinkButton>
            </div>
          )}
        </div>
      </Card>
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
