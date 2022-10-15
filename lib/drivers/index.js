import ergastApi from '../api/ergastApi'
import { extractDriverIds, normalizeDriver } from './utils'

export const getCurrentDriverIDs = async () => {
  const res = await ergastApi.get('/current/drivers.json')
  const data = res.data

  return data.MRData.DriverTable.Drivers.map(extractDriverIds)
}

export const getDriverById = async (id) => {
  const res = await ergastApi.get(`/drivers/${id}.json`)
  const data = res.data

  const drivers = data?.MRData?.DriverTable?.Drivers

  if (drivers && drivers.length) {
    return await normalizeDriver(drivers[0])
  }

  return null
}

export const getDriversBySeason = async (season) => {
  const res = await ergastApi.get(`/${season}/drivers.json?limit=60`)
  const data = res.data

  const drivers = data?.MRData?.DriverTable?.Drivers

  if (drivers && drivers.length) {
    return (await Promise.all(drivers.map(normalizeDriver))).sort((a, b) => {
      if (a.driverName < b.driverName) {
        return -1
      }
      if (a.driverName > b.driverName) {
        return 1
      }
      return 0
    })
  }

  return null
}
