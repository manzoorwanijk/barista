const camelCase = require('camelcase');

const configFactory = require('react-scripts/config/webpack.config');

const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  jquery: 'jQuery',
  // '@eventespresso/components-typescript': 'ok', // add packages here
};

// Define WordPress dependencies
const wpPackages = ['components', 'element', 'blocks', 'i18n', 'block-editor'];
// Setup externals for all WordPress dependencies
wpPackages.forEach(wpPackage => {
  externals['@wordpress/' + wpPackage] = {
    this: ['wp', wpPackage.includes('-') ? camelCase(wpPackage) : wpPackage], // 'block-editor' => 'blockEditor'
  };
});

module.exports = function (webpackEnv) {
  return { ...configFactory(webpackEnv), externals };
};
