import ergastApi from '../api/ergastApi'
import {
  normalizeConstructorStandings,
  normalizeDriverStandings,
} from './utils'

const getDriverStandings = async (season) => {
  const res = await ergastApi.get(`/${season}/driverStandings.json`)
  const data = res.data

  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
    normalizeDriverStandings
  )
}

const getConstructorStandings = async (season) => {
  const res = await ergastApi.get(`/${season}/constructorStandings.json`)
  const data = res.data

  if (!data.MRData.StandingsTable.StandingsLists.length) {
    return null
  }

  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
    normalizeConstructorStandings
  )
}

export const getStandings = async (season) => {
  const [driverStandings, constructorStandings] = await Promise.all([
    getDriverStandings(season),
    getConstructorStandings(season),
  ])

  return {
    driverStandings,
    constructorStandings,
  }
}
