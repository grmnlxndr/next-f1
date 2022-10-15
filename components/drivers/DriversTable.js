import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'

const DriverRow = ({ driver }) => {
  return (
    <>
      {driver.image?.url && (
        <div className={'relative h-12 lg:h-14 w-14 lg:w-16'}>
          <Image
            className={'rounded'}
            src={driver.image.url}
            alt={driver.driverName}
            layout={'fill'}
            objectFit={'cover'}
          />
        </div>
      )}
      <div
        className={classNames(
          { 'pl-16': !driver.image?.url },
          { 'lg:pl-18': !driver.image?.url },
          'font-medium text-teal-800 lg:text-xl'
        )}
      >
        {driver.driverName}
      </div>
    </>
  )
}

const DriversTable = ({ drivers }) => {
  return drivers.map((driver, index) => {
    const isFirst = index === 0

    return (
      <Link key={index} href={`/drivers/${driver.driverId}`}>
        <a
          key={index}
          className={classNames(
            'w-full px-2 h-14 lg:h-16 flex items-center gap-2 hover:underline',
            { 'border-t': !isFirst },
            { 'border-gray-500': !isFirst }
          )}
        >
          <DriverRow driver={driver} />
        </a>
      </Link>
    )
  })
}

export default DriversTable
