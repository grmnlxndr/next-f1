import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'

const RaceRow = ({ race }) => {
  const raceName = `${race.season} ${race.name}`

  return (
    <>
      {race.Flag && (
        <div className={'relative h-12 lg:h-14 w-14 lg:w-16'}>
          <Image
            className={'rounded'}
            src={race.Flag.url}
            alt={raceName}
            layout={'fill'}
            objectFit={'cover'}
          />
        </div>
      )}
      <div
        className={classNames(
          { 'pl-16': !race.Flag },
          { 'lg:pl-18': !race.Flag },
          { italic: !race.isPast },
          'font-medium text-teal-800 lg:text-xl'
        )}
      >
        {raceName}
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
