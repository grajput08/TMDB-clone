/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";

export default function footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <h2 className="footer-heading">
              <a href="/" className="logo">
                TMBD.com
              </a>
            </h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 text-center">
            <p className="copyright">
              Copyright © 2023 All rights reserved
              <a href="/"> TMBD.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
