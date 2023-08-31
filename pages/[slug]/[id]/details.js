import React from "react";
import Head from "next/head";
import { Services } from "@/services/search";
import Layout from "@/components/layout/layout";

export async function getServerSideProps(context) {
  try {
    const { id } = context?.query;
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=26eb8fe0ea17478b691097b4e10c4ac9`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data from the server.");
    }

    const repo = await res.json();
    return {
      props: {
        data: repo || null,
        query: context?.query || null,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        data: null,
        query: null,
        error: "An error occurred while fetching data.",
      },
    };
  }
}

export default function ProductDetails({ query, data, error }) {
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
              {error}
            </div>
          )}
        </div>
        {console.log("details", data, query, error)}
      </Layout>
    </div>
  );
}
