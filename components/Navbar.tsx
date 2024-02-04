"use client";

import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";

export default function Navbar() {
  const { user } = useUser();
  const isMobile = useIsMobile();

  return (
    <nav className="fixed top-0 z-50 w-full bg-background flex items-center justify-between border-b border-border lg:px-20 px-5 py-3 shadow-md">
      <Logo />
      <div className="flex items-center md:gap-2 gap-1">
        <ThemeSwitcher />
        {user && (
          <>
            <Button asChild variant={"link"}>
              <Link href={"/dashboard"} className="text-lg">
                Dashboard
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        {!user && (
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 font-bold text-foreground"
          >
            {isMobile ? (
              <SignInButton afterSignInUrl="/dashboard" mode="modal" />
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                <SignInButton afterSignInUrl="/dashboard" mode="modal" />
              </>
            )}
          </Button>
        )}
      </div>
    </nav>
  );
}
