/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useDispatch } from "react-redux";
import { add, remove } from "@/store/watchSlice";
import slugify from "slugify";

export default function moviesCard({ data, mode }) {
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  function formatDate(inputDate) {
    if (!inputDate) {
      return "Invalid Date";
    }

    const date = new Date(inputDate);

    if (isNaN(date)) {
      return "Invalid Date Format";
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate = `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
    return formattedDate;
  }

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  return (
    <div data-component="movies-cards">
      <div className="card-view my-2">
        <div
          className="card-header"
          style={{
            background: `url(${`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${data?.poster_path}`})`,
          }}
        >
          <div className="card-header-icon" />
        </div>

        <div className="card-movie-content">
          <div className="card-movie-content-head">
            <h3
              className="card-movie-title ellipsis"
              title={data?.title || data?.name}
            >
              {data?.title || data?.name}
            </h3>

            <div className="ratings">
              <span>{data?.vote_average?.toFixed(1)}</span>/10
            </div>
          </div>
          <div className="card-movie-info">
            <div className="movie-running-time">
              <label>Release Date</label>
              <span>{formatDate(data?.release_date)}</span>
            </div>
            {mode === "watch" ? (
              <div className="btn-class">
                <button
                  className=" me-2"
                  onClick={() => handleRemove(data?.id)}
                >
                  Remove WatchList
                </button>
                <button
                  className="view-more-btn"
                  onClick={() =>
                    router.push(
                      `${slugify(data?.title, { lower: true })}/${
                        data?.id
                      }/details`
                    )
                  }
                >
                  View More
                </button>
              </div>
            ) : (
              <div className="btn-class">
                <button className=" me-2" onClick={() => handleAdd(data)}>
                  Add WatchList
                </button>
                <button
                  className="view-more-btn"
                  onClick={() =>
                    router.push(
                      `${slugify(data?.title, { lower: true })}/${
                        data?.id
                      }/details`
                    )
                  }
                >
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
