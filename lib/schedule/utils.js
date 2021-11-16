import { remark } from 'remark'
import html from 'remark-html'

export const normalizeCircuit = async (circuit) => {
  let extraInfo = {}

  const res = await fetch(
    `${process.env.STRAPI_URL}/circuits?circuitId=${circuit.circuitId}`
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

  const normalizedCircuit = {
    circuitName: circuit.circuitName,
    circuitId: circuit.circuitId,
    country: circuit.Location.country,
    url: circuit.url,
    ...extraInfo,
  }

  // remove undefined
  Object.keys(normalizedCircuit).forEach(
    (key) =>
      normalizedCircuit[key] === undefined && delete normalizedCircuit[key]
  )

  return normalizedCircuit
}

export const normalizeSchedule = async (schedule) => {
  let circuitData = {}

  circuitData = await normalizeCircuit(schedule.Circuit)

  const dateTime = `${schedule.date}T${schedule.time}`

  const normalizedSchedule = {
    season: schedule.season,
    round: schedule.round,
    name: schedule.raceName,
    dateTime,
    isPast: Date.now() > new Date(dateTime).valueOf(),
    ...circuitData,
  }

  // remove undefined
  Object.keys(normalizedSchedule).forEach(
    (key) =>
      normalizedSchedule[key] === undefined && delete normalizedSchedule[key]
  )

  return normalizedSchedule
}

export const extractCircuitId = (circuit) => ({
  params: {
    id: circuit.circuitId,
  },
})
