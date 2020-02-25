import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // Next.js passes the URL parameters as values in the query string object to
  // API endpoints:
  const { snapshotId } = req.query;

  console.log("redirect snapshot: " + snapshotId);

  // !! Do not replicate this in your application. This inefficiently works
  // around a browser bug only relevant to this demo.
  // !!

  // Tell the CDN to cache this HTML redirect forever:
  res.setHeader("Cache-Control", "public, s-maxage=31536000");

  // Redirect the user to the share endpoint from same origin. This is
  // necessary due to a Chrome bug:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=696204
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=/r/${encodeURIComponent(
      snapshotId as string
    )}" /></head>`
  );

  res.end();

  // !! Do not replicate this in your application. This inefficiently works
  // around a browser bug only relevant to this demo.
  // !!
};

export default handler;
