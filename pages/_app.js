import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/component-styles.scss";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Movie Database (TMDB)</title>
        <meta
          name="description"
          content="The Movie Database (TMDB) is a popular, user editable database for movies and TV shows."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
