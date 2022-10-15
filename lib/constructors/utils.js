import { createClient } from '../../prismicio'

export const extractConstructorIds = (constructor) => ({
  params: {
    id: constructor.constructorId,
  },
})

export const normalizeConstructor = async (constructor) => {
  let extraInfo = {}

  const prismicClient = createClient()

  try {
    const res = await prismicClient.getByUID('team', constructor.constructorId)
  
    if (res?.data) {
      extraInfo = res.data
    }
  } catch (err) {
    console.warn('Could not retrieve constructor info from Prismic for', constructor.constructorId, err)
  }

  const normalizedConstructor = {
    constructorId: constructor.constructorId,
    name: constructor.name,
    url: constructor.url,
    nationality: constructor.nationality,
    ...extraInfo,
  }

  // remove undefined
  Object.keys(normalizedConstructor).forEach(
    (key) =>
      normalizedConstructor[key] === undefined &&
      delete normalizedConstructor[key]
  )

  return normalizedConstructor
}
