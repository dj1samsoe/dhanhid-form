import Navbar from "@/components/Navbar";
import React, { PropsWithChildren } from "react";
import Footer from "./_components/Footer";
import { Metadata } from "next";
import { METADATA } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `${METADATA.creator} - Simple Form Builder`,
  alternates: {
    canonical: process.env.DOMAIN,
  },
};

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
