"use client";
import * as React from "react";
import Image from "next/image";
import profilePic from "@/public/vercel.svg";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useSelector } from "react-redux";

function HeaderBar() {
  const items = useSelector((state) => state.watch);
  return (
    <div data-component="Header">
      <div className=" container">
        <div className="d-flex justify-content-between py-2">
          <Link href="/">
            <Image src={profilePic} alt="Logo" />
          </Link>
          <Link href="/watch-list">
            <Stack
              spacing={4}
              direction="row"
              sx={{ color: "white", display: "flex", alignItems: "center" }}
            >
              <Badge color="secondary" badgeContent={items.length}>
                Watch List
                <ReceiptLongIcon sx={{ margin: "0 10px", fontSize: "2rem" }} />
              </Badge>
            </Stack>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HeaderBar;
