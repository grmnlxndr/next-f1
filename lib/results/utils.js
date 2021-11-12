import { normalizeSchedule } from '../schedule/utils'

export const normalizeResults = async (race) => {
  const normalizedSchedule = await normalizeSchedule(race)

  const normalizedResult = {
    ...normalizedSchedule,
    results: race.Results.map((result) => ({
      position: result.position,
      driverId: result.Driver.driverId,
      driverName: `${result.Driver.givenName} ${result.Driver.familyName}`,
      time: result.Time?.time || result.status,
    })),
  }

  // remove undefined
  Object.keys(normalizedResult).forEach(
    (key) => normalizedResult[key] === undefined && delete normalizedResult[key]
  )

  return normalizedResult
}
