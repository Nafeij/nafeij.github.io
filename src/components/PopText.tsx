import React from "react";

export default function PopText({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 900 600">
      <defs>
        <filter id="blur1" x="-10%" y="-10%" width="120%" height="120%">
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="161"
            result="effect1_foregroundBlur"
          ></feGaussianBlur>
        </filter>
        <clipPath id="textClip">
          <text
            id="title"
            className="font-bold mb-2 whitespace-nowrap bg-clip-text hover:text-transparent"
          >
            {children}
          </text>
        </clipPath>
      </defs>
      <g clip-path="url(#textClip)">
        <rect width="900" height="600" fill="#6600FF"></rect>
        <g filter="url(#blur1)">
            <circle cx="205" cy="46" fill="#00CC99" r="357"></circle>
            <circle cx="546" cy="427" fill="#6600FF" r="357"></circle>
            <circle cx="778" cy="583" fill="#00CC99" r="357"></circle>
            <circle cx="278" cy="215" fill="#00CC99" r="357"></circle>
            <circle cx="500" cy="15" fill="#6600FF" r="357"></circle>
            <circle cx="246" cy="520" fill="#00CC99" r="357"></circle>
        </g>
      </g>
    </svg>
  );
}
