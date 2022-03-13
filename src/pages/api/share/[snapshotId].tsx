import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Next.js passes the URL parameters as values in the query string object to
  // API endpoints:
  const { snapshotId } = req.query;

  // Enter the current user into "Preview Mode" by calling `setPreviewData` on
  // the API response.
  //
  // Arbitrary data may be passed to this function, and it will be provided to
  // a page when calling `getStaticProps` or `getServerSideProps`.
  res.setPreviewData({ snapshotId });

  // Redirect the user back to the index page. Normally, you'd redirect them to
  // a `next`-URL query parameter or from other state.
  res.writeHead(307, { Location: '/' });
  res.end();
};
