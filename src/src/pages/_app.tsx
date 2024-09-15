import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Noto_Sans_JP, Shippori_Mincho } from 'next/font/google';
import { cn } from "@/lib/utils";

const notoSans = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

const shippori_Mincho = Shippori_Mincho({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
});

const FontProvider = (props: React.ComponentProps<"div">) => {
  const { className, ...args } = props;

  return (
    <div
      {...args}
      className={cn(
        notoSans.variable,
        GeistSans.variable,
        GeistMono.variable,
        shippori_Mincho.variable,
        className,
      )}
    />
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style
        jsx
        global
        >
        {`:root { 
          --font-sans: ${GeistSans.style.fontFamily};
          --font-mono: ${GeistMono.style.fontFamily};
          --font-noto-sans: ${notoSans.style.fontFamily};
            --font-shippori-mincho: ${shippori_Mincho.style.fontFamily};
        }`}
      </style>
      <FontProvider>
        <Component {...pageProps} />
      </FontProvider>
    </>
  )
}
