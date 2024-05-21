/** @type {import('next').NextConfig} */
module.exports = {
  sentry:{
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  experimental: {
  },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: `https`,
      },
      {
        hostname: 'randomuser.me',
        protocol: `https`,
      },
      {
        hostname: 'files.stripe.com',
        protocol: `https`,
      },
    ]
  },
  transpilePackages: ["@repo/ui", "@repo/db", "@repo/emails"],
};
