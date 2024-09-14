import Image from "next/image";
import { ImageResponse } from "next/og";
 
export const config = {
  runtime: 'edge',
};
 
export default async function handler() {
  const res = await fetch("http://localhost:3000/api/image", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8"
    }
  });
  const data: string = await res.json();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: "flex"
        }}
      >
        <Image src={data} alt="" width={1200} height={630} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}