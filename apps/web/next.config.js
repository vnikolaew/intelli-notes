/** @type {import("next").NextConfig} */
module.exports = {
   sentry: {
      disableServerWebpackPlugin: true,
      disableClientWebpackPlugin: true,
   },
   experimental: {
      typedRoutes: true,
      serverComponentsExternalPackages: [
         "sharp", "onnxruntime-node",
      ],
   },
   compiler: { removeConsole: true },
   eslint: { ignoreDuringBuilds: true },
   webpack: (config) => {
      // See https://webpack.js.org/configuration/resolve/#resolvealias
      config.externals = [...config.externals, "hnswlib-node"];
      config.experiments = { ...config.experiments, topLevelAwait: true };
      //
      config.resolve.alias = {
         ...config.resolve.alias,
         "sharp$": false,
         "onnxruntime-node$": false,
      };
      return config;
   },
   images: {
      remotePatterns: [
         {
            hostname: "lh3.googleusercontent.com",
            protocol: `https`,
         },
         {
            hostname: "randomuser.me",
            protocol: `https`,
         },
         {
            hostname: "files.stripe.com",
            protocol: `https`,
         },
         {
            hostname: "dummyimage.com",
            protocol: `https`,
         },
         {
            hostname: "dummyimage",
            protocol: `https`,
         },
      ],
   },
   transpilePackages: ["@repo/ui", "@repo/db", "@repo/emails", "@repo/ai", "@mdxeditor/editor"],
};
