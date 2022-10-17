import { createClient } from '../../prismicio'

export const normalizeCircuit = async (circuit) => {
  let extraInfo = {}

  const prismicClient = createClient()
  try {
    const res = await prismicClient.getByUID('circuit', circuit.circuitId)

    if (res?.data) {
      extraInfo = res.data
      delete extraInfo.name
    }
  } catch (err) {
    console.warn('Could not retrieve circuit info from Prismic for', circuit.circuitId, err)
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
