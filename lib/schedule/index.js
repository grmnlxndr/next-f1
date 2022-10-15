import ergastApi from '../api/ergastApi'
import { extractCircuitId, normalizeCircuit, normalizeSchedule } from './utils'

export const getNextRace = async () => {
  const res = await ergastApi.get('/current/next.json')
  const data = res.data

  return await data.MRData.RaceTable.Races.map(normalizeSchedule)[0]
}

export const getCurrentCircuitIDs = async () => {
  const res = await ergastApi.get('/current/circuits.json')
  const data = res.data

  return data.MRData.CircuitTable.Circuits.map(extractCircuitId)
}

export const getCircuitById = async (id) => {
  const res = await ergastApi.get(`/circuits/${id}.json`)
  const data = res.data

  const circuits = data?.MRData?.CircuitTable?.Circuits

  if (circuits && circuits.length) {
    return await normalizeCircuit(circuits[0])
  }

  return null
}
