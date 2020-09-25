module.exports = {
  plugins: [
    {
      plugin: require('craco-styled-jsx'),
      options: {
        sass: true, 
        cssFileSupport: true, 
        cssFileTest: /\.styled\.(s)css$/,
      }
    },
  ],
}