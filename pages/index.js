import Head from "next/head";
import Layout from "@/components/layout/layout";
import { Router } from "next/router";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MoviesCard from "@/components/cards/movies-card";
import { Services } from "@/services/search";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("movie");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  const handleToggle = (valId) => {
    setType(valId);
    getList(valId);
  };

  const getList = (qVal) => {
    setLoader(true);
    Services.getshow(qVal, "popularity.desc", 1)
      .then((res) => {
        setList(res?.data?.results);
        setError("");
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setError(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Some Error Occured!!!"
        );
      });
  };

  useEffect(() => {
    getList("movie");
  }, []);
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
        <main data-component="home-page">
          <section className="inner_content">
            <div className="background-image">
              <div className="content-wrap container">
                <div className="title">
                  <h2>Welcome.</h2>
                  <h3>
                    Millions of movies, TV shows and people to discover. Explore
                    now.
                  </h3>
                </div>
                <div className="search">
                  <form
                    id="inner_search_form"
                    action="/search"
                    method="get"
                    accept-charset="utf-8"
                  >
                    <label>
                      <input
                        name="query"
                        type="text"
                        tabindex="1"
                        autocorrect="off"
                        autofill="off"
                        autocomplete="off"
                        spellcheck="false"
                        placeholder="Search for a movie, tv show, person......"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                      />
                    </label>
                    <input
                      type="submit"
                      value="Search"
                      onClick={handleSearchSubmit}
                    />
                  </form>
                </div>
              </div>
            </div>
          </section>
          <section className=" container">
            <div className="free-to-watch">
              <h2>Free To Watch</h2>
              <div className="selector_wrap">
                <div className="selector">
                  <div
                    className={
                      type === "movie" ? " anchor selected" : "anchor "
                    }
                    onClick={() => handleToggle("movie")}
                  >
                    <p className={type === "movie" ? " gradient-text" : ""}>
                      Movies
                    </p>
                  </div>
                  <div
                    className={type === "tv" ? " anchor selected" : "anchor "}
                    onClick={() => handleToggle("tv")}
                  >
                    <p className={type === "tv" ? " gradient-text" : ""}>Tv</p>
                  </div>
                </div>
              </div>
            </div>
            {console.log("tetet", list)}
            <div className="row">
              {loader ? (
                <div className="d-flex justify-content-center my-4 min-vh-100">
                  Loading.......
                </div>
              ) : (
                <div className="row my-4 min-vh-100">
                  {list?.map((val) => (
                    <div
                      className="col-xl-3 col-lg-4  col-sm-6 col-12"
                      key={val?.id}
                    >
                      <MoviesCard data={val} type={type} />
                    </div>
                  ))}
                  {list?.length === 0 && (
                    <div className="d-flex justify-content-center">
                      There are no movies / tv found.
                    </div>
                  )}
                  {error && (
                    <div className="d-flex justify-content-center">{error}</div>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
