module.exports = (config) => {
  require('react-app-rewire-postcss')(config, {
    plugins: () => [require('postcss-rtl')()],
  });

  return config;
};
