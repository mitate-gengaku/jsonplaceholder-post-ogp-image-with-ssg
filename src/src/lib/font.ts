export async function fetchFont(): Promise<ArrayBuffer | null> {
  // NOTE: Noto Sans JP を使用する場合は以下の URL になる。（他のフォントを使用する場合は別のフォント名にする）
  // text パラメータを付与することで、使用する文字のみをサブセット化を行い通信容量を削減しながら通信が可能となる。
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@700&display=swap`;

  const css = await (
      await fetch(googleFontsUrl, {
          headers: {
              "User-Agent":
                  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
          },
      })
  ).text();

  const resource = css.match(
      /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) return null;
  const res = await fetch(resource[1]);
  return res.arrayBuffer();
}