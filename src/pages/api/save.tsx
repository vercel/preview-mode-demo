import S3 from 'aws-sdk/clients/s3';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generate as generateId } from 'shortid';

// Initialize S3 instance in module scope for re-use across requests.
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Generate a friendly ID for this save request:
  const snapshotId = generateId();

  // Next.js automatically handles body parsing for `POST`, `PUT`, et al.
  const contents = req.body as { id: string; innerText: string }[];

  // Upload the user-provided data to S3 under the randomly generated ID.
  //
  // We're not worried about ID collisions, but a real application probably
  // should be!
  try {
    await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${snapshotId}.json`,
        Body: JSON.stringify(contents),
      })
      .promise();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
    return res.end();
  }

  // Return the `snapshotId` so the frontend can generate a sharable link.
  res.status(200);
  res.json({ snapshotId });
  res.end();
};

export const config = {
  api: {
    bodyParser: { sizeLimit: '256kb' },
  },
};
