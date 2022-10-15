import ergastApi from '../api/ergastApi'
import { extractConstructorIds, normalizeConstructor } from './utils'

export const getCurrentConstructorIDs = async () => {
  const res = await ergastApi.get('/current/constructors.json')
  const data = res.data

  return data.MRData.ConstructorTable.Constructors.map(extractConstructorIds)
}

export const getConstructorById = async (id) => {
  const res = await ergastApi.get(`/constructors/${id}.json`)
  const data = res.data

  const constructors = data?.MRData?.ConstructorTable?.Constructors

  if (constructors && constructors.length) {
    return await normalizeConstructor(constructors[0])
  }

  return null
}
