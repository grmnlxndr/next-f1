const getImage = async (url) => {
  const wikiPage = url.split('/wiki/')[1]
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&redirects&titles=${wikiPage}`
  )
  const data = await res.json()

  const { source, width, height } = Object.values(data.query.pages)[0].original

  return { source, width, height }
}

export default getImage
