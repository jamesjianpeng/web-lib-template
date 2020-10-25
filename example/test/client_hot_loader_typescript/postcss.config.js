module.exports = ({ file, options, env }) => {
  console.log(file)
  console.log(options)
  console.log(env)
  return{
    plugins: [
      require('autoprefixer'),
      require('cssnano')({
          preset: 'default',
      }),
    ]
  }
}
