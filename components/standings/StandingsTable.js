import { useState } from 'react'
import { Table, Td, Th } from '../ui/Table'

export const DRIVER_STANDING_HEADER = (
  <tr>
    <Th>Pos</Th>
    <Th>Driver</Th>
    <Th>Wins</Th>
    <Th>Points</Th>
  </tr>
)

export const renderDriver = (driver) => (
  <tr key={driver.driverId}>
    <Td className={'text-center'}>{driver.position}</Td>
    <Td className={'text-center'}>{driver.driverName}</Td>
    <Td className={'text-center'}>{driver.wins}</Td>
    <Td className={'text-center'}>{driver.points}</Td>
  </tr>
)

export const CONSTRUCTOR_STANDING_HEADER = (
  <tr>
    <Th>Pos</Th>
    <Th>Constructor</Th>
    <Th>Wins</Th>
    <Th>Points</Th>
  </tr>
)

export const renderConstructor = (constructor) => (
  <tr key={constructor.constructorId}>
    <Td className={'text-center'}>{constructor.position}</Td>
    <Td className={'text-center'}>{constructor.constructorName}</Td>
    <Td className={'text-center'}>{constructor.wins}</Td>
    <Td className={'text-center'}>{constructor.points}</Td>
  </tr>
)

export const RACE_STANDING_HEADER = (
  <tr>
    <Th>Pos</Th>
    <Th>Driver</Th>
    <Th>Time</Th>
  </tr>
)

export const renderRaceDriver = (driver) => (
  <tr key={driver.driverId}>
    <Td className={'text-center'}>{driver.position}</Td>
    <Td className={'text-center'}>{driver.driverName}</Td>
    <Td className={'text-center'}>{driver.time}</Td>
  </tr>
)

const StandingsTable = ({
  title,
  standings,
  header,
  renderRow,
  collapsible,
}) => {
  const [collapsed, setCollapsed] = useState(true)

  const displayStandings =
    collapsible && collapsed ? standings.slice(0, 5) : standings

  const handleCollapseButton = () => {
    setCollapsed(!collapsed)
  }

  return (
    <>
      {title && (
        <p
          className={
            'w-full font-semibold text-lg text-center text-teal-700 mb-2 md:mb-4'
          }
        >
          {title}
        </p>
      )}
      <Table>
        <thead>{header}</thead>
        <tbody>{displayStandings.map(renderRow)}</tbody>
      </Table>
      {collapsible && (
        <button
          className={
            'block mx-auto p-1 mt-1 text-teal-700 hover:text-teal-600 underline font-semibold'
          }
          onClick={handleCollapseButton}
        >
          {collapsed ? 'See more' : 'See less'}
        </button>
      )}
    </>
  )
}

export default StandingsTable
