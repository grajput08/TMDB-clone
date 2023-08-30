"use client";
import * as React from "react";
import Image from "next/image";
import profilePic from "@/public/vercel.svg";

function HeaderBar() {
  return (
    <div data-component="Header">
      <div className=" container">
        <div className="d-flex justify-content-between">
          <Image src={profilePic} alt="Logo" />
          <div>Join TMBD</div>
        </div>
      </div>
    </div>
  );
}
export default HeaderBar;
