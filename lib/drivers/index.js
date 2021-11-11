import { extractDriverIds, normalizeDriver } from './utils'

export const getCurrentDriverIDs = async () => {
  const res = await fetch('https://ergast.com/api/f1/current/drivers.json')
  const data = await res.json()

  return data.MRData.DriverTable.Drivers.map(extractDriverIds)
}

export const getDriverById = async (id) => {
  const res = await fetch(`https://ergast.com/api/f1/drivers/${id}.json`)
  const data = await res.json()

  const drivers = data?.MRData?.DriverTable?.Drivers

  if (drivers && drivers.length) {
    return normalizeDriver(drivers[0])
  }

  return null
}
