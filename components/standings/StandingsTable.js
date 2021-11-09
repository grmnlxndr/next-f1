export const DRIVER_STANDING_HEADER = (
  <tr>
    <th>Position</th>
    <th>Driver</th>
    <th>Wins</th>
    <th>Points</th>
  </tr>
)

export const renderDriver = (driver) => (
  <tr key={driver.driverId}>
    <td>{driver.position}</td>
    <td>{driver.driverName}</td>
    <td>{driver.wins}</td>
    <td>{driver.points}</td>
  </tr>
)

export const CONSTRUCTOR_STANDING_HEADER = (
  <tr>
    <th>Position</th>
    <th>Constructor</th>
    <th>Wins</th>
    <th>Points</th>
  </tr>
)

export const renderConstructor = (constructor) => (
  <tr key={constructor.constructorId}>
    <td>{constructor.position}</td>
    <td>{constructor.constructorName}</td>
    <td>{constructor.wins}</td>
    <td>{constructor.points}</td>
  </tr>
)

const StandingsTable = ({ standings, header, renderRow }) => {
  return (
    <table>
      <thead>{header}</thead>
      <tbody>{standings.map(renderRow)}</tbody>
    </table>
  )
}

export default StandingsTable
