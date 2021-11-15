import classNames from 'classnames'
import Image from 'next/image'
import Card from '../../components/ui/Card'
import Layout from '../../components/ui/Layout'
import LinkButton from '../../components/ui/LinkButton'
import { SubHeader } from '../../components/ui/Text'
import {
  getConstructorById,
  getCurrentConstructorIDs,
} from '../../lib/constructors'
import styles from '../../styles/Details.module.css'

export default function ConstructorDetailsPage({
  constructor: {
    image,
    ImageAttribution,
    name,
    Name,
    nationality,
    description,
    url,
  },
}) {
  return (
    <Layout>
      <SubHeader className={'mb-5'}>Constructor Details</SubHeader>
      <Card className={styles.card}>
        {image && (
          <div className={styles.imageWrapper}>
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={Name || name}
            />
            {ImageAttribution && (
              <p className={styles.imageAttribution}>{ImageAttribution}</p>
            )}
          </div>
        )}
        <div className={styles.textWrapper}>
          <div>
            <h2 className={styles.title}>{Name || name}</h2>
            {nationality && (
              <p className={styles.text}>
                <span className={'font-semibold'}>Nationality:</span>{' '}
                {nationality}
              </p>
            )}
          </div>
          {description && (
            <div
              className={classNames(styles.text, styles.description)}
              dangerouslySetInnerHTML={{ __html: description }}
            />
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
  const paths = await getCurrentConstructorIDs()

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const constructor = await getConstructorById(params.id)

  if (!constructor) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      constructor,
    },
    revalidate: 24 * 60 * 60,
  }
}
