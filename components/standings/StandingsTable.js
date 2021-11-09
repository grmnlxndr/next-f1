import Card from '../ui/Card'
import { Table, Td, Th } from '../ui/Table'

export const DRIVER_STANDING_HEADER = (
  <tr>
    <Th>Position</Th>
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
    <Th>Position</Th>
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

const StandingsTable = ({ title, standings, header, renderRow }) => {
  return (
    <Card>
      <p
        className={
          'w-full font-semibold text-lg text-center text-teal-500 mb-2 md:mb-4'
        }
      >
        {title}
      </p>
      <Table>
        <thead>{header}</thead>
        <tbody>{standings.map(renderRow)}</tbody>
      </Table>
    </Card>
  )
}

export default StandingsTable
