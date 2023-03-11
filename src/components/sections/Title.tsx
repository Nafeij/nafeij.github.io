import React from "react";
import FlyList from "../FlyList";
import styled from "styled-components";
import FancyTitle from "../FancyTitle";

const BuildSomething = styled.code`
  color: ${({ theme: { text } }) => text};
`;

export default function Title() {
  return (
    <section className="flex justify-center items-start flex-col min-h-screen">
      <FlyList
        lines={[
          <BuildSomething className="text-[clamp(1.4rem,3vw,3rem)]">
            Build something
          </BuildSomething>,
          <FancyTitle height="clamp(5rem,15vw,14rem)" />,
        ]}
      />
    </section>
  );
}
