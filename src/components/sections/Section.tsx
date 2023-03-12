/** @jsx jsx */
import { jsx } from '@emotion/react'
import { ReactNode } from "react";

export default function Section({
  children,
  background,
  minHeight,
}: {
  children: ReactNode;
  background?: string;
  minHeight?: string;
}) {
  return (
    <section tw="flex justify-center items-start flex-col" css={`min-height : ${minHeight ?? "100svh"}; ${background}`}>
      <div tw="mx-auto max-w-screen-xl px-6 md:px-16 ">{children}</div>
    </section>
  );
}
