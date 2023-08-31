"use client";
import * as React from "react";
import Image from "next/image";
import profilePic from "@/public/vercel.svg";
import Link from "next/link";

function HeaderBar() {
  return (
    <div data-component="Header">
      <div className=" container">
        <div className="d-flex justify-content-between py-2">
          <Link href="/">
            <Image src={profilePic} alt="Logo" />
          </Link>
          <div>Join TMBD</div>
        </div>
      </div>
    </div>
  );
}
export default HeaderBar;
