import ergastApi from '../api/ergastApi'
import { normalizeResults } from '../results/utils'
import { extractSeasonIDs } from './utils'

export const getSeasonIDs = async () => {
  // grab current only
  const res = await ergastApi.get('/current/seasons.json')
  const data = res.data

  return data.MRData.SeasonTable.Seasons.map(extractSeasonIDs)
}

export const getSessionsBySeason = async (season) => {
  const res = await ergastApi.get(`/${season}.json`)
  const data = res.data

  return await Promise.all(data.MRData.RaceTable.Races.map(normalizeResults))
}
