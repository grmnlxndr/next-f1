import getImage from '../utils/getImage'

export const extractDriverIds = (driver) => ({
  params: {
    id: driver.driverId,
  },
})

export const normalizeDriver = async (driver) => {
  let image

  try {
    image = await getImage(driver.url)
  } catch (err) {
    console.log('Could not get image for ' + driver.driverId + ' -- ' + err)
  }

  const normalizedDriver = {
    driverId: driver.driverId,
    number: driver.permanentNumber,
    code: driver.code,
    url: driver.url,
    driverName: `${driver.givenName} ${driver.familyName}`,
    dateOfBirth: driver.dateOfBirth,
    nationality: driver.nationality,
    image,
  }

  // remove undefined
  Object.keys(normalizedDriver).forEach(
    (key) => normalizedDriver[key] === undefined && delete normalizedDriver[key]
  )

  return normalizedDriver
}
