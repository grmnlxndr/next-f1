import ergastApi from '../api/ergastApi'
import { extractResultIDs, normalizeResults } from './utils'

export const getlastRaceResults = async () => {
  const res = await ergastApi.get('/current/last/results.json')
  const data = res.data

  return await data.MRData.RaceTable.Races.map(normalizeResults)[0]
}

export const getCurrentSeasonIDs = async () => {
  const res = await ergastApi.get('/current.json')
  const data = res.data

  return await data.MRData.RaceTable.Races.map(extractResultIDs)
}

export const getResultBySeasonAndRound = async (season, round) => {
  const res = await ergastApi.get(`/${season}/${round}/results.json`)
  const data = res.data

  return data.MRData.RaceTable.Races.map(normalizeResults)[0]
}
