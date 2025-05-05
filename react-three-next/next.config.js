const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * A fork of 'next-pwa' that has app directory support
 * @see https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1332258575
 */
// const withPWA = require('@ducanh2912/next-pwa').default({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
// })

const nextConfig = {
  // uncomment the following snippet if using styled components
  // compiler: {
  //   styledComponents: true,
  // },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  images: {},
  webpack(config, { isServer }) {
    if (!isServer) {
      // We're in the browser build, so we can safely exclude the sharp module
      config.externals.push('sharp')
    }
    // audio support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: [
        {
          loader: 'raw-loader',
          options: {
            esModule: false,
          }
        },
        {
          loader: 'glslify-loader',
          options: {
            transform: [
              ['glslify-hex', { transformOptions: { preserveVariableName: true } }]
            ]
          }
        }
      ]
    });

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: [
        {
          loader: 'raw-loader',
          options: {
            esModule: false,
          }
        },
        {
          loader: 'glslify-loader',
          options: {
            transform: [
              ['glslify-hex', { transformOptions: { preserveVariableName: true } }]
            ]
          }
        }
      ]
    });
    return config
  },
}

const KEYS_TO_OMIT = ['webpackDevMiddleware', 'configOrigin', 'target', 'analyticsId', 'webpack5', 'amp', 'assetPrefix']

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [[withBundleAnalyzer, {}]];

  const wConfig = plugins.reduce((acc, [plugin, config]) => plugin({ ...acc, ...config }), {
    ...defaultConfig,
    ...nextConfig,
  });

  const finalConfig = {};
  Object.keys(wConfig).forEach((key) => {
    if (!KEYS_TO_OMIT.includes(key)) {
      finalConfig[key] = wConfig[key];
    }
  });

  return finalConfig;
};
