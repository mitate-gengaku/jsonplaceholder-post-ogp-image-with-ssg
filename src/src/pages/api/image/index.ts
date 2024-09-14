// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCanvas } from "@napi-rs/canvas";
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const title = req.query.title?.toString();

  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.font = 'bold 64px';
  ctx.fillStyle = '#1F2937';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';

  ctx.fillText(title ?? "", 500, 100);
  const url = canvas.toDataURL("image/png");
  const image = url.split(";base64,").pop();
  
  res.status(200).json(image ?? "".toString());
}
