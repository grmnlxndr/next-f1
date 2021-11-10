import { normalizeSchedule } from './utils'

export const getNextRace = async () => {
  const res = await fetch('https://ergast.com/api/f1/current/next.json')
  const data = await res.json()

  return data.MRData.RaceTable.Races.map(normalizeSchedule)[0]
}
