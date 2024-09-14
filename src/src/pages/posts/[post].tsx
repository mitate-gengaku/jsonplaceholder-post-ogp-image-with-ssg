import axios from "axios";
import Head from "next/head";
import { Post } from "../api/posts";
import { createCanvas } from "@napi-rs/canvas";

interface Props {
  url: string;
  imgUrl: string;
  post: Post
}

const PostPage = (props: Props) => {
  const {
    url,
    imgUrl,
    post,
  } = props;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />

        <meta name="description" content={post.title} />

        <meta property="og:title" content={post.title} />

        <meta name="og:description" content={post.title} />

        <meta property="og:type" content={"article"} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={post.title} />
        <meta property="og:image" content={imgUrl} />

        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.title} />
        <meta name="twitter:image" content={imgUrl} />

        <link
          rel="canonical"
          href={url}
        />
      </Head>
      <main className="w-screen min-h-screen overflow-x-hidden">
        <div className="w-full md:w-4/5 lg:w-3/5 mx-auto p-8 prose">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      </main>
    </>
  )
}
export const getStaticPaths = async() => {
  const {
    data: posts,
  } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');

  const paths = posts.map((post) => ({
    params: {
      post: post.id.toString()
    }
  }));

  return {
    paths: paths,
    fallback: false
  }
} 

export const getStaticProps = async ({ params }: {
  params: {
    post: string;
  }
}) => {
  const { data } = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${params.post}`);
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.font = 'bold 64px';
  ctx.fillStyle = '#1F2937';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';

  ctx.fillText(params.post, 500, 100);
  const url = canvas.toDataURL("image/png");

  return {
    props: {
      url: process.env.BASE_URL + `posts/${params.post}`,
      post: data,
      imgUrl: url,
    }
  }
}

export default PostPage;