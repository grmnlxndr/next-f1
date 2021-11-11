import getImage from '../utils/getImage'

export const normalizeSchedule = async (schedule) => {
  let image

  try {
    image = await getImage(schedule.Circuit.url)
  } catch (err) {
    console.log('Could not get image for ' + schedule.Circuit.circuitName)
  }

  return {
    season: schedule.season,
    round: schedule.round,
    name: schedule.raceName,
    circuitName: schedule.Circuit.circuitName,
    circuitId: schedule.Circuit.circuitId,
    country: schedule.Circuit.Location.country,
    dateTime: `${schedule.date}T${schedule.time}`,
    image,
  }
}