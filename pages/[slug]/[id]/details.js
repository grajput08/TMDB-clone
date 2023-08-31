/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Services } from "@/services/search";
import Layout from "@/components/layout/layout";
import Card from "@/components/cards/movies-card";

export async function getServerSideProps(context) {
  return {
    props: {
      query: context?.query || null,
    },
  };
}

export default function ProductDetails({ query }) {
  const [details, setDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const getDetails = (ids) => {
    setLoader(true);
    Services.getProduct(ids)
      .then((res) => {
        setDetails(res?.data);
        setError("");
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setError(err?.message ? err?.message : "Some Error Occured!!!");
      });
  };
  useEffect(() => {
    setLoader(true);
    getDetails(query?.id);
  }, [query?.id]);

  return (
    <div>
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
        <div data-component="details-page">
          {error && (
            <div className="d-flex justify-content-center min-vh-100 mt-5">
              {error} , If you come across any issues with the page, like the
              API not working properly from the backend, try refreshing the page
              !.
            </div>
          )}
          <section className="container">
            <div className="background-image ">
              {details && (
                <div className="row">
                  <div className="col-12">
                    <Card data={details} />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </Layout>
    </div>
  );
}
