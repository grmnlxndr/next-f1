import { remark } from 'remark'
import html from 'remark-html'

export const extractDriverIds = (driver) => ({
  params: {
    id: driver.driverId,
  },
})

export const normalizeDriver = async (driver) => {
  let extraInfo = {}

  const res = await fetch(
    `${process.env.STRAPI_URL}/drivers?driverId=${driver.driverId}`
  )
  const data = await res.json()

  if (data.length) {
    extraInfo = data[0]

    if (extraInfo.Image?.ext === '.svg') {
      extraInfo.image = extraInfo.Image
    } else {
      extraInfo.image =
        extraInfo.Image?.formats?.medium || extraInfo.Image?.formats?.small
      extraInfo.thumbnail = extraInfo.Image?.formats?.thumbnail
    }

    const description = await remark().use(html).process(extraInfo.Description)
    extraInfo.description = description.toString()

    delete extraInfo.Description
    delete extraInfo.Image
  }

  const normalizedDriver = {
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
