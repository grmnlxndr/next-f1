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

//https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=Aut%C3%B3dromo_Jos%C3%A9_Carlos_Pace&redirects
