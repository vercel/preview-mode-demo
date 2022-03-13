import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // `<Html>`, `<Head>`, `<Main>`, and `<NextScript>` are all required to be
  // used. You cannot use the normal `<html>`, `<head>`, et al.
  //
  // Next.js injects additional attributes and/or content to make your
  // application function as expected.
  //
  // https://nextjs.org/docs/advanced-features/custom-document
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
