import { extractConstructorIds, normalizeConstructor } from './utils'

export const getCurrentConstructorIDs = async () => {
  const res = await fetch(`${process.env.ERGAST_URL}/current/constructors.json`)
  const data = await res.json()

  return data.MRData.ConstructorTable.Constructors.map(extractConstructorIds)
}

export const getConstructorById = async (id) => {
  const res = await fetch(`${process.env.ERGAST_URL}/constructors/${id}.json`)
  const data = await res.json()

  const constructors = data?.MRData?.ConstructorTable?.Constructors

  if (constructors && constructors.length) {
    return await normalizeConstructor(constructors[0])
  }

  return null
}
