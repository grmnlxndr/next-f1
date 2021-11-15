import { remark } from 'remark'
import html from 'remark-html'

export const extractConstructorIds = (constructor) => ({
  params: {
    id: constructor.constructorId,
  },
})

export const normalizeConstructor = async (constructor) => {
  let extraInfo = {}

  const res = await fetch(
    `${process.env.STRAPI_URL}/constructors?constructorId=${constructor.constructorId}`
  )
  const data = await res.json()

  if (data.length) {
    extraInfo = data[0]

    if (extraInfo.Image?.ext === '.svg') {
      extraInfo.image = extraInfo.Image
    } else {
      extraInfo.image =
        extraInfo.Image?.formats?.medium || extraInfo.Image?.formats?.small
    }

    const description = await remark().use(html).process(extraInfo.Description)
    extraInfo.description = description.toString()

    delete extraInfo.Description
    delete extraInfo.Image
  }

  const normalizedConstructor = {
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
