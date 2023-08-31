import Head from "next/head";
import Layout from "@/components/layout/layout";
import Card from "@/components/cards/new-card";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "@/store/watchSlice";

export default function WatchList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.watch);

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
      <Layout>
        <main data-component="watch-page">
          <div className="container">
            <div className="min-vh-100 ">
              <div className="row my-4">
                {products?.map((val, index) => (
                  <div className="col-12" key={index}>
                    <Card data={val} mode="watch" />
                  </div>
                ))}
              </div>
              {products?.length === 0 && (
                <div className="d-flex my-4 justify-content-center">
                  There are no movies / tv found.
                </div>
              )}
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
