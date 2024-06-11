/** @type {import("next").NextConfig} */
module.exports = {
   sentry: {
      disableServerWebpackPlugin: true,
      disableClientWebpackPlugin: true,
   },
   serverExternalPackages: ["sharp", "onnxruntime-node", "@aws-sdk"],
   experimental: {
      typedRoutes: true,
   },
   compiler: {},
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
         {
            protocol: "https",
            hostname: "replicate.com",
         },
         {
            protocol: "https",
            hostname: "replicate.delivery",
         },
         {
            protocol: "https",
            hostname: "flaglog.com",
         },
      ],
   },
   transpilePackages: ["@repo/ui", "@repo/db", "@repo/emails", "@repo/ai", "@mdxeditor/editor", "next-international", "international-types"],
   typescript: {
      ignoreBuildErrors: true,
   },
}
