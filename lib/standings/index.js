import ergastApi from '../api/ergastApi'
import {
  normalizeConstructorStandings,
  normalizeDriverStandings,
} from './utils'

const getCurrentDriverStandings = async () => {
  const res = await ergastApi.get('/current/driverStandings.json')
  const data = res.data

  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
    normalizeDriverStandings
  )
}

const getCurrentConstructorStandings = async () => {
  const res = await ergastApi.get('/current/constructorStandings.json')
  const data = res.data

  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
    normalizeConstructorStandings
  )
}

export const getCurrentStandings = async () => {
  const [driverStandings, constructorStandings] = await Promise.all([
    getCurrentDriverStandings(),
    getCurrentConstructorStandings(),
  ])

  return {
    driverStandings,
    constructorStandings,
  }
}
