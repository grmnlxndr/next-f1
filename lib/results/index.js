import { normalizeResults } from './utils'

export const getlastRaceResults = async () => {
  const res = await fetch('https://ergast.com/api/f1/current/last/results.json')
  const data = await res.json()

  return data.MRData.RaceTable.Races.map(normalizeResults)[0]
}
