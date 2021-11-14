import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Image from 'next/image'
import StandingsTable, {
  RACE_STANDING_HEADER,
  renderRaceDriver,
} from '../standings/StandingsTable'

dayjs.extend(localizedFormat)

const RaceSnapshot = ({ race, title }) => {
  return (
    <>
      <div
        className={
          'w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5 p-3'
        }
      >
        {race.image && (
          <div className={'w-full lg:w-1/3 p-5'}>
            <Image
              height={race.image.height}
              width={race.image.width}
              src={race.image.url}
              alt={race.circuitName}
            />
          </div>
        )}
        <div className={'flex-grow'}>
          <p
            className={
              'w-full font-semibold text-lg text-center text-teal-700 mb-2 md:mb-4'
            }
          >
            {title}
          </p>
          <p className={'w-full font-semibold text-2xl text-teal-700 mb-2'}>
            {race.season} {race.name}
          </p>
          <p className={'w-full text-md text-gray-600 mb-1'}>
            {race.circuitName}
          </p>
          <p className={'w-full text-sm text-gray-600 mb-2 italic'}>
            Race time: {dayjs(race.dateTime).format('l LT')}
          </p>
        </div>
      </div>
      {race.results && (
        <div className={'text-sm text-teal-700'}>
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
