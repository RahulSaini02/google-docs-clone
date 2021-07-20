import Head from "next/head";
import "tailwindcss/tailwind.css";
import "@material-tailwind/react/tailwind.css";
import { Provider } from "next-auth/client";

import "../styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="m-0 p-0 box-border">
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp;
