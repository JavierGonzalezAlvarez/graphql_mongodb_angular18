const path = require('path');

module.exports = {
  // Añade otras configuraciones de Webpack según sea necesario
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      // Agrega otros polyfills si es necesario
    }
  },
  // Añade otras configuraciones según sea necesario
};
