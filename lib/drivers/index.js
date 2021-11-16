import { extractDriverIds, normalizeDriver } from './utils'

export const getCurrentDriverIDs = async () => {
  const res = await fetch(`${process.env.ERGAST_URL}/current/drivers.json`)
  const data = await res.json()

  return data.MRData.DriverTable.Drivers.map(extractDriverIds)
}

export const getDriverById = async (id) => {
  const res = await fetch(`${process.env.ERGAST_URL}/drivers/${id}.json`)
  const data = await res.json()

  const drivers = data?.MRData?.DriverTable?.Drivers

  if (drivers && drivers.length) {
    return await normalizeDriver(drivers[0])
  }

  return null
}
