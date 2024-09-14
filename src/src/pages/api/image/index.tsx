// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { cwd } from "process";

export type Data = string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const text = "われこれより航空戦の指揮を"
  const author = "宮沢賢治"
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const img = await loadImage(join(cwd(), "public", "book_detail_thumbnail_image.png"));

  GlobalFonts.registerFromPath(join(cwd(), "public", "Shippori_Mincho", "ShipporiMincho-Bold.ttf"), "ShipporiMinchoBold")
  
  ctx.drawImage(img, 0, 0);
  ctx.font = 'bold 64px ShipporiMinchoBold';
  ctx.fillStyle = '#1F2937';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';

  const lines = text.split('\n');
  let x = width - 490 
  const startY = 88; 

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    let y = startY;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      ctx.fillText(char, x, y);
      y += 64;


      if (j === 6) {
        y = startY;
        x -= 64 + 6; 
      }
    }
    x -= 64 + 6;
  }

  const authorLines = author.split('\n');
  let ax = width - 747
  const startAY = 112;

  for (let i = authorLines.length - 1; i >= 0; i--) {
    const line = authorLines[i]
    let ay = startAY;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      ctx.font = 'bold 36px ShipporiMinchoBold';
      ctx.fillStyle = '#9CA3AF'
      ctx.fillText(char, ax, ay);
      ay += 36

      if (ay > height - 36) {
        ay = startAY;
        ax -= 36 + 6; 
      }
    }
    ax -= 36 + 6;
  }

  const url = canvas.toDataURL("image/png")

  res
    .status(200)
    .setHeader("Content-Type", "image/png")
    .json(url);
}
