import { PrismicRichText } from '@prismicio/react'
import classNames from 'classnames'
import Image from 'next/image'
import Card from '../../components/ui/Card'
import Layout from '../../components/ui/Layout'
import LinkButton from '../../components/ui/LinkButton'
import { SubHeader } from '../../components/ui/Text'
import { getCircuitById, getCurrentCircuitIDs } from '../../lib/schedule'
import styles from '../../styles/Details.module.css'

export default function CircuitDetailsPage({
  circuit: {
    image,
    image_attribution: ImageAttribution,
    circuitName,
    country,
    description,
    url,
  },
}) {
  return (
    <Layout>
      <SubHeader className={'mb-5'}>Circuit Details</SubHeader>
      <Card className={styles.card}>
        {image && (
          <div className={styles.imageWrapper}>
            <Image
              className={'rounded-lg'}
              src={image.url}
              width={image.dimensions.width}
              height={image.dimensions.height}
              alt={circuitName}
            />
            {ImageAttribution && (
              <p className={styles.imageAttribution}>{ImageAttribution}</p>
            )}
          </div>
        )}
        <div className={styles.textWrapper}>
          <div>
            <h2 className={styles.title}>{circuitName}</h2>
            {country && (
              <p className={styles.text}>
                <span className={'font-semibold'}>Country:</span> {country}
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
                More Info
              </LinkButton>
            </div>
          )}
        </div>
      </Card>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getCurrentCircuitIDs()

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const circuit = await getCircuitById(params.id)

  if (!circuit) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      circuit,
    },
    revalidate: 24 * 60 * 60,
  }
}
