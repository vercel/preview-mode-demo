import Document, { Head, Html, Main, NextScript } from "next/document";

// A custom document is required in Next.js to set the `lang` attribute on the
// `<html>` tag.
// We hope to provide a configuration option for this in the future (RFC for
// built-in internationalization coming soon).

class MyDocument extends Document {
  render() {
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
}

export default MyDocument;
