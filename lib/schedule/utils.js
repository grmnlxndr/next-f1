import { remark } from 'remark'
import html from 'remark-html'

export const normalizeSchedule = async (schedule) => {
  let extraInfo = {}

  const res = await fetch(
    `${process.env.STRAPI_URL}/circuits?circuitId=${schedule.Circuit.circuitId}`
  )
  const data = await res.json()

  if (data.length) {
    extraInfo = data[0]

    if (extraInfo.Image?.ext === '.svg') {
      extraInfo.image = extraInfo.Image
    } else {
      extraInfo.image = extraInfo.Image?.formats?.medium
    }

    const description = await remark().use(html).process(extraInfo.Description)
    extraInfo.description = description.toString()

    delete extraInfo.Description
    delete extraInfo.Image
  }

  const normalizedSchedule = {
    season: schedule.season,
    round: schedule.round,
    name: schedule.raceName,
    circuitName: schedule.Circuit.circuitName,
    circuitId: schedule.Circuit.circuitId,
    country: schedule.Circuit.Location.country,
    dateTime: `${schedule.date}T${schedule.time}`,
    ...extraInfo,
  }

  // remove undefined
  Object.keys(normalizedSchedule).forEach(
    (key) =>
      normalizedSchedule[key] === undefined && delete normalizedSchedule[key]
  )

  return normalizedSchedule
}
