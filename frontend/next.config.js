const withPlugins = require('next-compose-plugins');

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
          return config;
        },
      },
    ],
  ],
  nextConfig,
);
