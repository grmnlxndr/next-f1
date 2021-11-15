import { extractResultIDs, normalizeResults } from './utils'

export const getlastRaceResults = async () => {
  const res = await fetch(`${process.env.ERGAST_URL}/current/last/results.json`)
  const data = await res.json()

  return data.MRData.RaceTable.Races.map(normalizeResults)[0]
}

export const getCurrentSeasonIDs = async () => {
  const res = await fetch(`${process.env.ERGAST_URL}/current.json`)
  const data = await res.json()

  return data.MRData.RaceTable.Races.map(extractResultIDs)
}

export const getResultBySeasonAndRound = async (season, round) => {
  const res = await fetch(
    `${process.env.ERGAST_URL}/${season}/${round}/results.json`
  )
  const data = await res.json()

  return data.MRData.RaceTable.Races.map(normalizeResults)[0]
}
