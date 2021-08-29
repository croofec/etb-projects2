const withPlugins = require('next-compose-plugins');
const path = require("path")
let nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  publicRuntimeConfig: {

  },
};

module.exports = withPlugins(
  [
    [nextConfig],
    [
      {
        webpack(config) {
          config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 100000,
              },
            },
          });
          config.resolve.modules.push(path.resolve('./'))
          return config;
        },
      },
    ],
  ],
  nextConfig,
);
