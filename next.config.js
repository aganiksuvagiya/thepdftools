/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  transpilePackages: ["upscaler", "@upscalerjs/esrgan-slim"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
      // Fix onnxruntime-web chunk loading issues
      config.resolve.alias = {
        ...config.resolve.alias,
        "onnxruntime-web": false,
      };
    }

    config.module.rules.push({
      test: /ort\..+\.m?js$/,
      resolve: { fullySpecified: false },
      type: "javascript/auto",
    });

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
