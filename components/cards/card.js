/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function card({ data }) {
  return (
    <div data-component="movie-Card">
      {console.log("data23", data)}
      <div className="movie_card">
        <div className="info_section">
          <div className="movie_header row">
            <div className="col-md-3 col-12">
              <img
                className="locandina"
                src={
                  `https://api.themoviedb.org${data?.poster_path}?api_key=26eb8fe0ea17478b691097b4e10c4ac9` ||
                  `/banner.jpeg`
                }
                alt="poster"
              />
            </div>
            <div className="col-md-9 col-12">
              <h1>{data?.title}</h1>
              <h4>2017, David Ayer</h4>
              <span className="minutes">117 min</span>
              <p className="type">Action, Crime, Fantasy</p>
            </div>
          </div>
          <div className="movie_desc">
            <p className="text">{data?.overview}</p>
          </div>
          <div className="movie_social">
            <ul>
              <li>
                <i className="material-icons">share</i>
              </li>
              <li>
                <i className="material-icons"></i>
              </li>
              <li>
                <i className="material-icons">chat_bubble</i>
              </li>
            </ul>
          </div>
        </div>
        <div className="blur_back bright_back"></div>
      </div>
    </div>
  );
}
