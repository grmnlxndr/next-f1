export const normalizeDriverStandings = (driver) => ({
  position: driver.position,
  points: driver.points,
  wins: driver.wins,
  driverId: driver.Driver.driverId,
  driverName: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
})

export const normalizeConstructorStandings = (constructor) => ({
  position: constructor.position,
  points: constructor.points,
  wins: constructor.wins,
  constructorId: constructor.Constructor.constructorId,
  constructorName: constructor.Constructor.name,
})
