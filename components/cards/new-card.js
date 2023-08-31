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
            <div className="btn-class">
              <button>Add WatchList</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
