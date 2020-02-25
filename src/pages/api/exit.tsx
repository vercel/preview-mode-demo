import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();

  // Redirect the user back to the index page. Normally, you'd redirect them to
  // a `next`-URL query parameter or from other state.
  res.writeHead(307, { Location: "/" });
  res.end();
};

export default handler;
