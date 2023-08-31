import Head from "next/head";
import Layout from "@/components/layout/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MoviesCard from "@/components/cards/movies-card";
import { Services } from "@/services/search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import SortIcon from "@mui/icons-material/Sort";
import { FormControl, MenuItem, Select } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
    },
  };
}

export default function Home({ query }) {
  const router = useRouter();
  const [sort, setSort] = useState("popularity.desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState(query);
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const spaceSearch = (selectedInput) => {
    const routerQueryObject = {};
    routerQueryObject.sort = selectedInput?.sort || "popularity.desc";
    routerQueryObject.page = selectedInput?.page || 1;
    routerQueryObject.type = selectedInput?.type || "movie";
    router.push(
      {
        pathname: ``,
        query: routerQueryObject,
      },
      { scroll: false }
    );
  };

  const applyFilter = (selectedInput) => {
    setLoader(true);
    const selectedInputNew = { ...searchInput, ...selectedInput };
    spaceSearch(selectedInputNew);
    setSearchInput(selectedInputNew);
  };

  const getList = (selectedQuery) => {
    setLoader(true);
    Services.getshow(
      selectedQuery?.type || "movie",
      selectedQuery?.sort || "popularity.desc",
      selectedQuery?.page || 1
    )
      .then((res) => {
        setList(res?.data?.results);
        setError("");
        setLoader(false);
        setTotalPage(res?.data?.total_pages);
      })
      .catch((err) => {
        setLoader(false);
        setError(err?.message ? err?.message : "Some Error Occured!!!");
      });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  const handleToggle = (valId) => {
    applyFilter({ type: valId });
  };

  const onPageChange = (e, page) => {
    applyFilter({ page: page });
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSort(selectedValue);
    applyFilter({
      sort: selectedValue,
    });
  };

  useEffect(() => {
    getList(query);
    if (Object.keys(query).length === 0) {
      setSearchInput({
        sort: "popularity.desc",
        page: 1,
        type: "movie",
      });
    } else {
      setSearchInput(query);
    }
  }, [query]);
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
            <div className="d-flex justify-content-between my-2 flex-wrap">
              <div className="free-to-watch">
                <h2>Free To Watch</h2>
                <div className="selector_wrap">
                  <div className="selector">
                    <div
                      className={
                        searchInput?.type === "movie"
                          ? " anchor selected"
                          : "anchor "
                      }
                      onClick={() => handleToggle("movie")}
                    >
                      <p
                        className={
                          searchInput?.type === "movie" ? " gradient-text" : ""
                        }
                      >
                        Movies
                      </p>
                    </div>
                    <div
                      className={
                        searchInput?.type === "tv"
                          ? " anchor selected"
                          : "anchor "
                      }
                      onClick={() => handleToggle("tv")}
                    >
                      <p
                        className={
                          searchInput?.type === "tv" ? " gradient-text" : ""
                        }
                      >
                        Tv
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <Select
                  value={sort}
                  fullWidth
                  sx={{
                    height: "2.8rem",
                    color: "rgb(3, 37, 65)",
                    borderColor: "rgb(3, 37, 65)",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(3, 37, 65)",
                    },
                  }}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment
                      sx={{ color: "rgb(3, 37, 65)" }}
                      position="start"
                    >
                      <SortIcon /> Popularity:
                    </InputAdornment>
                  }
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem
                    sx={{ color: "rgb(3, 37, 65)" }}
                    value="popularity.desc"
                  >
                    Descending
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "rgb(3, 37, 65)" }}
                    value="popularity.asc"
                  >
                    Ascending
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="d-flex justify-content-center ">
              {loader ? (
                <div className="d-flex justify-content-center my-4 min-vh-100">
                  Loading.......
                </div>
              ) : (
                <div className="row my-4 min-vh-100 d-flex justify-content-center align-content-center">
                  {list?.map((val) => (
                    <div
                      className="col-xl-3 col-lg-4  col-sm-6 col-12"
                      key={val?.id}
                    >
                      <MoviesCard data={val} type={searchInput?.type} />
                    </div>
                  ))}
                  {list?.length === 0 && (
                    <div className="d-flex justify-content-center">
                      There are no movies / tv found.
                    </div>
                  )}
                  {error && (
                    <div className="d-flex justify-content-center">
                      {error}, If you come across any issues with the page, like
                      the API not working properly from the backend, try
                      refreshing the page !.
                    </div>
                  )}
                </div>
              )}
            </div>
            {totalPage > 1 && (
              <div className="d-flex justify-content-center my-4 pagination">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPage}
                    page={parseInt(searchInput?.page, 10)}
                    onChange={onPageChange}
                  />
                </Stack>
              </div>
            )}
          </section>
        </main>
      </Layout>
    </>
  );
}
