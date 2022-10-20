import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'
import { findFlagUrlByCountryName } from 'country-flags-svg'
import dayjs from 'dayjs'

const RaceRow = ({ race }) => {
  const raceName = `${race.season} ${race.name}`

  return (
    <>
      {race.country && (
        <div className={'relative h-12 lg:h-14 w-18 lg:w-20'}>
          <Image
            className={'rounded'}
            src={findFlagUrlByCountryName(race.country)}
            alt={raceName}
            layout={'fill'}
            objectFit={'cover'}
          />
        </div>
      )}
      <div
        className={classNames(
          { 'pl-18': !race.country },
          { 'lg:pl-20': !race.country },
          { italic: !race.isPast },
          'font-medium text-teal-800 lg:text-xl'
        )}
      >
        {raceName}
        <br />
        <span className={'text-xs text-gray-600 font-light'}>
          {dayjs(race.date).format('MMMM D')}
        </span>
      </div>
    </>
  )
}

const SessionTable = ({ races }) => {
  return races.map((race, index) => {
    const isFirst = index === 0

    if (!race.isPast) {
      return (
        <div
          key={index}
          className={classNames(
            'w-full px-2 h-14 lg:h-16 flex items-center gap-2',
            { 'border-t': !isFirst },
            { 'border-gray-500': !isFirst }
          )}
        >
          <RaceRow race={race} />
        </div>
      )
    }

    return (
      <Link key={index} href={`/results/${race.season}/${race.round}`}>
        <a
          key={index}
          className={classNames(
            'w-full px-2 h-14 lg:h-16 flex items-center gap-2 hover:underline',
            { 'border-t': !isFirst },
            { 'border-gray-500': !isFirst }
          )}
        >
          <RaceRow race={race} />
        </a>
      </Link>
    )
  })
}

export default SessionTable
