import Link from 'next/link'
import classNames from 'classnames'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Image from 'next/image'
import StandingsTable, {
  RACE_STANDING_HEADER,
  renderRaceDriver,
} from '../standings/StandingsTable'
import styles from './RaceSnapshot.module.css'

dayjs.extend(localizedFormat)

const RaceSnapshot = ({ race, title }) => {
  return (
    <>
      <div className={styles.mainWrapper}>
        {race.image && (
          <div className={styles.circuitImage}>
            <Image
              height={race.image.height}
              width={race.image.width}
              src={race.image.url}
              alt={race.circuitName}
            />
          </div>
        )}
        <div className={'flex-grow'}>
          <p className={styles.title}>{title}</p>
          <p className={styles.raceTitle}>
            {race.season} {race.name}
          </p>
          <p className={classNames(styles.text, styles.name)}>
            <Link href={`/circuits/${race.circuitId}`}>
              <a className={'hover:underline'}>{race.circuitName}</a>
            </Link>
          </p>
          <p className={classNames(styles.text, styles.time)}>
            Race time: {dayjs(race.dateTime).format('l LT')}
          </p>
        </div>
      </div>
      {race.results && (
        <div className={styles.table}>
          <StandingsTable
            header={RACE_STANDING_HEADER}
            standings={race.results}
            renderRow={renderRaceDriver}
            collapsible
          />
        </div>
      )}
    </>
  )
}

export default RaceSnapshot
