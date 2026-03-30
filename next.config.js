/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    // Handle onnxruntime .mjs files
    config.module.rules.push({
      test: /ort\..+\.m?js$/,
      resolve: { fullySpecified: false },
      type: "javascript/auto",
    });

    // Increase chunk size limit for background-removal
    if (!isServer && config.optimization?.splitChunks) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        bgRemoval: {
          test: /[\\/]node_modules[\\/](@imgly|onnxruntime)/,
          name: "bg-removal",
          chunks: "async",
          priority: 30,
          reuseExistingChunk: true,
        },
      };
    }

    // Skip terser for onnxruntime files
    if (config.optimization?.minimizer) {
      const terser = config.optimization.minimizer.find(
        (m) => m.constructor.name === "TerserPlugin"
      );
      if (terser) {
        terser.options = terser.options || {};
        terser.options.exclude = /ort\..+\.m?js$/;
      }
    }

    return config;
  },
};

module.exports = nextConfig;
