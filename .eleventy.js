module.exports = (config) => {
  config.addPassthroughCopy('src/assets/icons/')
  config.addPassthroughCopy('src/assets/imgs/')
  config.addPassthroughCopy('src/assets/docs/')
  config.addPassthroughCopy('src/assets/js/')

  config.addCollection('gs_sorted', function (collectionApi) {
    return collectionApi
      .getFilteredByTag('gs')
      .sort((a, b) => a.data.part - b.data.part)
  })

  return {
    dir: {
      input: 'src',
      output: 'docs'
    }
  }
}
