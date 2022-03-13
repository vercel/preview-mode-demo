// Global CSS imports in Next.js must happen in `pages/_app.js` so that you are
// aware of the explicit ordering:

// Default application styles that are applicable to more than one component:
import '../styles/global.css';

// Basic syntax highlighting for `<code>` and `<pre>` tags:
import '../styles/syntax.css';

// Custom `@reach/dialog` styles (their defaults are not mobile friendly):
import '../styles/dialog.css';

// 3rd-party CSS loading animations:
import '../styles/loader.css';

// This is the required default export from `pages/_app.js` if you are only
// using this file for CSS imports.
export default ({ Component, pageProps }) => <Component {...pageProps} />;
