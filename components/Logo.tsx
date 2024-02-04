import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} className="md:text-xl text-md font-bold">
      <h1>
        Dhanhid
        <span className="ml-1 rounded-md bg-gradient-to-br from-indigo-600 to-fuchsia-500 p-1 text-background">
          Form
        </span>
      </h1>
    </Link>
  );
}
