import { extractCircuitId, normalizeCircuit, normalizeSchedule } from './utils'

export const getNextRace = async () => {
  const res = await fetch(`${process.env.ERGAST_URL}/current/next.json`)
  const data = await res.json()

  return data.MRData.RaceTable.Races.map(normalizeSchedule)[0]
}

export const getCurrentCircuitIDs = async () => {
  const res = await fetch(`${process.env.ERGAST_URL}/current/circuits.json`)
  const data = await res.json()

  return data.MRData.CircuitTable.Circuits.map(extractCircuitId)
}

export const getCircuitById = async (id) => {
  const res = await fetch(`${process.env.ERGAST_URL}/circuits/${id}.json`)
  const data = await res.json()

  const circuits = data?.MRData?.CircuitTable?.Circuits

  if (circuits && circuits.length) {
    return normalizeCircuit(circuits[0])
  }

  return null
}
