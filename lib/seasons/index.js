import { normalizeResults } from '../results/utils'
import { extractSeasonIDs } from './utils'

export const getSeasonIDs = async () => {
  // grab current only
  const res = await fetch(`${process.env.ERGAST_URL}/current/seasons.json`)
  const data = await res.json()

  return data.MRData.SeasonTable.Seasons.map(extractSeasonIDs)
}

export const getSessionsBySeason = async (season) => {
  const res = await fetch(`${process.env.ERGAST_URL}/${season}.json`)
  const data = await res.json()

  return await Promise.all(data.MRData.RaceTable.Races.map(normalizeResults))
}
