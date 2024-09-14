// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type Data = {
  posts: Post[]
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const {
    data: posts,
  } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');


  res.status(200).json({ posts });
}
