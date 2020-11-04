module.exports = {
  async rewrites() {
    return [
      {
        source: "/s/:snapshotId",
        destination: "/api/sameorigin/:snapshotId",
      },
      { source: "/r/:snapshotId", destination: "/api/share/:snapshotId" },
    ];
  },
};
