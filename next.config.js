/**
 * @type {import('next').NextConfig}
 */
module.exports = withContentlayer()({
  // swcMinify: true,
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/s/:snapshotId",
        destination: "/api/sameorigin/:snapshotId",
      },
      { source: "/r/:snapshotId", destination: "/api/share/:snapshotId" },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    console.log({ key: process.env.AWS_S3_ACCESS_KEY_ID });
    console.log({ s: process.env.AWS_S3_SECRET_ACCESS_KEY });
    console.log({ bucket: process.env.AWS_S3_BUCKET });
    return config;
  },
});
