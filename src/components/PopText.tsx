import React from "react";

const circles = [
  {
    cx : "0",
    cy : "0",
    fill : "#00CC99",
  },
  {
    cx : "0",
    cy : "100%",
    fill : "#6600FF",
  },
  {
    cx : "100%",
    cy : "0",
    fill : "#6600FF",
  },
  {
    cx : "100%",
    cy : "100%",
    fill : "#00CC99",
  }
];
export default function PopText({ children }: { children: String }) {
  return (
    <svg viewBox="0 0 430 100" height="clamp(2.7rem,8vw,10rem)">
      <defs>
        <filter id="blur1" x="-10%" y="-10%" width="120%" height="120%">
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="20"
            result="effect1_foregroundBlur"
          ></feGaussianBlur>
        </filter>
      </defs>
      <clipPath id="clip0">
        <text
          id="title"
          className="font-bold whitespace-nowrap text-[73px]"
          y="1em"
        >
          {children}
        </text>
      </clipPath>
      <g clipPath="url(#clip0)">
        <rect className="w-full h-full" fill="#6600FF" />
        <g filter="url(#blur1)">
          {
            circles.map((circle,i) => (<circle key={i} {...circle} r="30%">
              <animate
                attributeName="cx"
                values="-30%;130%;-30%"
                dur={Math.random() * 10 + 10 + "s"}
                repeatCount="indefinite" />
              <animate
                attributeName="cy"
                values="-30%;130%;-30%"
                dur={Math.random() * 10 + 10 + "s"}
                repeatCount="indefinite" />
            </circle>))
          }
        </g>
      </g>
    </svg>
  );
}
function genAnim() {
  return {
    animation: `blobx ${Math.random() * 10 + 10}s infinite, bloby ${
      Math.random() * 10 + 10
    }s infinite`,
  };
}