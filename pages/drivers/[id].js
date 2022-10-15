import Image from 'next/image'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Layout from '../../components/ui/Layout'
import { SubHeader } from '../../components/ui/Text'
import { getCurrentDriverIDs, getDriverById } from '../../lib/drivers'
import Card from '../../components/ui/Card'
import LinkButton from '../../components/ui/LinkButton'
import styles from '../../styles/Details.module.css'
import classNames from 'classnames'
import { PrismicRichText } from '@prismicio/react'

dayjs.extend(localizedFormat)

export default function DriverDetailsPage({
  driver: {
    image,
    driverName,
    nationality,
    number,
    code,
    dateOfBirth,
    url,
    image_attribution: ImageAttribution,
    description,
  },
}) {

  return (
    <Layout>
      <SubHeader className={'mb-5'}>Driver Details Page</SubHeader>
      <Card className={styles.card}>
        {image && (
          <div className={styles.imageWrapper}>
            <Image
              className={'rounded-lg'}
              src={image.url}
              width={image.dimensions.width}
              height={image.dimensions.height}
              alt={driverName}
            />
            {ImageAttribution && (
              <p className={styles.imageAttribution}>{ImageAttribution}</p>
            )}
          </div>
        )}
        <div className={styles.textWrapper}>
          <div>
            <h2
              className={
                'text-center font-semibold text-2xl text-teal-800 mb-5'
              }
            >
              {driverName}
            </h2>
            {nationality && (
              <p className={styles.text}>
                <span className={'font-semibold'}>Nationality:</span>{' '}
                {nationality}
              </p>
            )}
            {dateOfBirth && (
              <p className={styles.text}>
                <span className={'font-semibold'}>Date of Birth:</span>{' '}
                {dayjs(dateOfBirth).format('l')}
              </p>
            )}
            {number && (
              <p className={styles.text}>
                <span className={'font-semibold'}>Number:</span> {number}
              </p>
            )}
            {code && (
              <p className={styles.text}>
                <span className={'font-semibold'}>Code:</span> {code}
              </p>
            )}
          </div>
          {description && (
            <div className={classNames(styles.text, styles.description)}>
              <PrismicRichText field={description} />
            </div>
          )}
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
    revalidate: 24 * 60 * 60,
  }
}
