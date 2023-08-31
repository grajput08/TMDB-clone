/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useDispatch } from "react-redux";
import { add } from "@/store/watchSlice";

export default function moviesCard({ data, type }) {
  const dispatch = useDispatch();

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
    <div data-component="new-cards">
      <div className="card-view">
        {console.log("tete", data)}
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
              title={type === "tv" ? data?.name : data?.title}
            >
              {type === "tv" ? data?.name : data?.title}
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
            <div className="movie-running-time">
              <label>popularity</label>
              <span>{data?.popularity?.toFixed(1)}</span>
            </div>
          </div>
          <div className="btn-class mt-2 justify-content-between">
            <button onClick={() => handleAdd(data)}>Add WatchList</button>
            <button className="view-more-btn">View More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
