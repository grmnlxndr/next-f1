import {
  normalizeConstructorStandings,
  normalizeDriverStandings,
} from './utils'

const getCurrentDriverStandings = async () => {
  const res = await fetch(
    `${process.env.ERGAST_URL}/current/driverStandings.json`
  )
  const data = await res.json()

  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
    normalizeDriverStandings
  )
}

const getCurrentConstructorStandings = async () => {
  const res = await fetch(
    `${process.env.ERGAST_URL}/current/constructorStandings.json`
  )
  const data = await res.json()

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
