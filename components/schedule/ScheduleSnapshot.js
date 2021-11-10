import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Card from '../ui/Card'
import Image from 'next/image'

dayjs.extend(localizedFormat)

const ScheduleSnapshot = ({ schedule, title }) => {
  return (
    <Card>
      <div
        className={
          'w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5'
        }
      >
        {schedule.image && (
          <div className={'w-full lg:w-1/3 p-5'}>
            <Image
              height={schedule.image.height}
              width={schedule.image.width}
              src={schedule.image.source}
              alt={schedule.circuitName}
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
            {schedule.season} {schedule.name}
          </p>
          <p className={'w-full text-md text-gray-600 mb-1'}>
            {schedule.circuitName}
          </p>
          <p className={'w-full text-sm text-gray-600 mb-2 italic'}>
            Race time: {dayjs(schedule.dateTime).format('l LT')}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default ScheduleSnapshot
