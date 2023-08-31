import React from "react";

export default function moviesCard({ data }) {
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
  return (
    <div data-component="new-cards">
      <div className="card-view">
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
            <h3 className="card-movie-title">{data?.title}</h3>

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
              <label>Running time</label>
              <span>2hr 09min</span>
            </div>
          </div>
          <div className="btn-class mt-2 justify-content-center">
            <button>Add WatchList</button>
          </div>
        </div>
      </div>
    </div>
  );
}