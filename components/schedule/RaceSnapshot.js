import Link from 'next/link'
import classNames from 'classnames'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Image from 'next/image'
import StandingsTable, {
  RACE_STANDING_HEADER,
  RACE_STANDING_HEADER_WITH_CONSTRUCTOR,
  renderRaceDriver,
  renderRaceDriverAndConstructor,
} from '../standings/StandingsTable'
import styles from './RaceSnapshot.module.css'

dayjs.extend(localizedFormat)

const RaceSnapshot = ({
  race,
  title,
  collapsible = true,
  withConstructor,
  noLink,
}) => {
  let Name

  if (race.results && !noLink) {
    Name = (
      <p className={styles.raceTitle}>
        <Link href={`/results/${race.season}/${race.round}`}>
          <a className={'hover:underline'}>
            {race.season} {race.name}
          </a>
        </Link>
      </p>
    )
  } else {
    Name = (
      <p className={styles.raceTitle}>
        {race.season} {race.name}
      </p>
    )
  }

  return (
    <>
      <div className={styles.mainWrapper}>
        {race.image && (
          <div className={styles.circuitImage}>
            <Image
              height={race.image.dimensions.height}
              width={race.image.dimensions.width}
              src={race.image.url}
              alt={race.circuitName}
            />
          </div>
        )}
        <div className={'flex-grow w-full'}>
          <p className={styles.title}>{title}</p>
          {Name}
          <p className={classNames(styles.text, styles.name)}>
            <Link href={`/circuits/${race.circuitId}`}>
              <a className={'hover:underline'}>{race.circuitName}</a>
            </Link>
          </p>
          <p className={classNames(styles.text, styles.time)}>
            {race.dateTime
              ? `Race time: ${dayjs(race.dateTime).format('l LT')}`
              : `Race date: ${dayjs(race.date).format('l')}`}
          </p>
        </div>
      </div>
      {race.results && (
        <div className={styles.table}>
          <StandingsTable
            header={
              withConstructor
                ? RACE_STANDING_HEADER_WITH_CONSTRUCTOR
                : RACE_STANDING_HEADER
            }
            standings={race.results}
            renderRow={
              withConstructor
                ? renderRaceDriverAndConstructor
                : renderRaceDriver
            }
            collapsible={collapsible}
          />
        </div>
      )}
    </>
  )
}

export default RaceSnapshot
