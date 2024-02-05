import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import React, { PropsWithChildren } from "react";

export default function LayoutSubmit({ children }: PropsWithChildren) {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-background flex items-center justify-between border-b border-border lg:px-10 px-5 py-3 shadow-md">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <div className="flex min-h-screen min-w-full flex-col bg-background pt-10">
        {children}
      </div>
    </>
  );
}
