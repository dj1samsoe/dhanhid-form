import React, { PropsWithChildren } from "react";

export default function LayoutBuilder({ children }: PropsWithChildren) {
  return <div className="mx-auto flex w-full grow pt-10">{children}</div>;
}
