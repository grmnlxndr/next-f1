import { createClient } from '../../prismicio'

export const extractDriverIds = (driver) => ({
  params: {
    id: driver.driverId,
  },
})

export const normalizeDriver = async (driver) => {
  let extraInfo = {}

  const prismicClient = createClient()

  try {
    const res = await prismicClient.getByUID('driver', driver.driverId)
  
    if (res?.data) {
      extraInfo = res.data
    }
  } catch (err) {
    console.warn('Could not retrieve driver info from Prismic for', driver.driverId, err)
  }

  const normalizedDriver = {
    driverId: driver.driverId,
    number: driver.permanentNumber,
    code: driver.code,
    url: driver.url,
    driverName: `${driver.givenName} ${driver.familyName}`,
    dateOfBirth: driver.dateOfBirth,
    nationality: driver.nationality,
    ...extraInfo,
  }

  // remove undefined
  Object.keys(normalizedDriver).forEach(
    (key) => normalizedDriver[key] === undefined && delete normalizedDriver[key]
  )

  return normalizedDriver
}
