module.exports = (opts) => {
  // const { file, mode } = opts
  return{
    plugins: [
      require('autoprefixer'),
      require('cssnano')({
          preset: 'default',
      }),
    ]
  }
}
