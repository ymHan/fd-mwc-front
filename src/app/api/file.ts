import { NextApiRequest, NextApiResponse } from 'next';

export interface FileResponse {
  type: string;
  arrayBuffer: number[];
}

export default async function file(req: NextApiRequest, res: NextApiResponse<FileResponse>) {
  const { url } = req.query;
  const rawData = await fetch(url as string);
  const blob = await rawData.blob();

  res.status(200).send({
    type: blob.type,
    arrayBuffer: Object.values(new Uint8Array(await blob.arrayBuffer())),
  });
}