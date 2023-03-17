/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { usePrefersReducedMotion } from "@hooks";
import { useState } from "react";
import tw from "twin.macro";

const Inspiring = ({ animCallback }: { animCallback: () => void }) => (
  <svg viewBox="0 0 1043 239" height="100%" id="Inspiring">
    <path
      d="M10 10H87.4697V15.2188H66.0148V171.086H87.4697V176.305H10V171.086H31.339V15.2188H10V10Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
      onAnimationEnd={animCallback}
    />
    <path
      d="M160.532 176.305H102.198V171.55H117.391V75.6405H102.198V70.8856H146.268V87.4697H146.848C150.868 81.2072 155.507 76.375 160.764 72.9731C167.027 69.03 174.024 67.0585 181.755 67.0585C192.348 67.0585 200.659 70.615 206.69 77.728C212.334 84.609 215.156 94.9692 215.156 108.809V171.55H230.348V176.305H172.014V171.55H186.278V108.809C186.278 101.386 186.046 95.8584 185.583 92.2246C185.196 88.5908 184.384 85.6528 183.147 83.4106C180.673 78.8491 176.962 76.5683 172.014 76.5683C165.442 76.5683 159.798 79.6609 155.082 85.8461C151.293 90.5623 148.858 95.3172 147.775 100.111C146.77 104.827 146.268 110.664 146.268 117.623V171.55H160.532V176.305Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      d="M480.733 70.8856H524.802V171.55H540.111V176.305H480.733V171.55H495.925V75.6405H480.733V70.8856ZM498.013 43.0522C494.688 39.6503 493.026 35.6299 493.026 30.991C493.026 26.3521 494.688 22.3318 498.013 18.9299C501.415 15.528 505.435 13.8271 510.074 13.8271C514.713 13.8271 518.733 15.528 522.135 18.9299C525.537 22.3318 527.238 26.3521 527.238 30.991C527.238 35.6299 525.537 39.6503 522.135 43.0522C518.733 46.3767 514.713 48.039 510.074 48.039C505.435 48.039 501.415 46.3767 498.013 43.0522Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      d="M613.637 176.305H554.259V171.55H569.452V75.6405H554.259V70.8856H594.618V93.1523H595.082C596.164 86.4259 598.909 80.5886 603.316 75.6405C608.341 69.9192 614.372 67.0585 621.408 67.0585C627.361 67.0585 632.193 69.03 635.904 72.9731C640.002 77.0708 642.051 82.9468 642.051 90.6009C642.051 96.013 640.698 100.343 637.992 103.59C635.131 107.069 631.42 108.809 626.858 108.809C622.529 108.809 619.049 107.649 616.421 105.329C613.405 102.623 611.898 99.1443 611.898 94.8919C611.898 90.8715 613.328 87.1991 616.189 83.8745C616.575 83.3333 617.117 82.6762 617.812 81.903C618.586 81.1298 619.127 80.55 619.436 80.1634C619.823 79.6995 620.17 79.1583 620.48 78.5398C620.789 77.9213 620.944 77.3414 620.944 76.8002C620.944 76.0271 620.48 75.2539 619.552 74.4808C618.624 73.6303 617.426 73.2051 615.957 73.2051C613.947 73.2051 611.898 74.0555 609.81 75.7565C607.8 77.4574 605.983 79.6995 604.36 82.4829C600.339 89.5185 598.329 99.4922 598.329 112.404V171.55H613.637V176.305Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      d="M652.14 70.8856H696.21V171.55H711.518V176.305H652.14V171.55H667.333V75.6405H652.14V70.8856ZM669.42 43.0522C666.096 39.6503 664.433 35.6299 664.433 30.991C664.433 26.3521 666.096 22.3318 669.42 18.9299C672.822 15.528 676.842 13.8271 681.481 13.8271C686.12 13.8271 690.141 15.528 693.542 18.9299C696.944 22.3318 698.645 26.3521 698.645 30.991C698.645 35.6299 696.944 39.6503 693.542 43.0522C690.141 46.3767 686.12 48.039 681.481 48.039C676.842 48.039 672.822 46.3767 669.42 43.0522Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      d="M784.001 176.305H725.667V171.55H740.859V75.6405H725.667V70.8856H769.736V87.4697H770.316C774.337 81.2072 778.976 76.375 784.233 72.9731C790.496 69.03 797.493 67.0585 805.224 67.0585C815.816 67.0585 824.128 70.615 830.158 77.728C835.802 84.609 838.624 94.9692 838.624 108.809V171.55H853.817V176.305H795.482V171.55H809.747V108.809C809.747 101.386 809.515 95.8584 809.051 92.2246C808.665 88.5908 807.853 85.6528 806.616 83.4106C804.142 78.8491 800.431 76.5683 795.482 76.5683C788.911 76.5683 783.267 79.6609 778.55 85.8461C774.762 90.5623 772.326 95.3172 771.244 100.111C770.239 104.827 769.736 110.664 769.736 117.623V171.55H784.001V176.305Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      d="M900.554 140.469V140.005C894.832 137.377 890 133.627 886.057 128.756C881.031 122.493 878.519 114.917 878.519 106.025C878.519 93.5776 882.848 83.8359 891.508 76.8002C899.394 70.3057 909.715 67.0585 922.472 67.0585C930.59 67.0585 938.167 68.8754 945.203 72.5092C946.827 68.9527 949.301 65.3962 952.625 61.8397C957.883 56.2731 964.3 53.4897 971.877 53.4897C976.825 53.4897 980.768 54.7654 983.706 57.3168C987.03 60.1002 988.693 64.0432 988.693 69.146C988.693 72.3159 987.881 74.9447 986.257 77.0322C984.092 79.7382 981.039 81.0912 977.095 81.0912C973.616 81.0912 970.833 80.0474 968.745 77.9599C966.813 76.0271 965.846 73.5143 965.846 70.4217C965.846 69.262 966.271 67.4064 967.122 64.855C967.74 62.7675 968.05 61.6851 968.05 61.6078C968.05 60.2934 967.16 59.6363 965.382 59.6363C962.444 59.6363 959.352 61.4918 956.104 65.2029C953.785 68.0636 951.659 71.3882 949.726 75.1766C953.437 77.2641 956.491 79.8928 958.888 83.0627C961.362 86.1553 963.063 89.3639 963.991 92.6885C964.996 95.9357 965.614 98.5257 965.846 100.459C966.155 102.391 966.31 104.17 966.31 105.793C966.31 119.014 961.671 129.22 952.393 136.41C944.739 142.441 934.263 145.456 920.965 145.456C919.573 145.456 917.486 145.417 914.702 145.34C911.919 145.263 909.831 145.224 908.44 145.224C901.249 145.224 896.263 145.92 893.479 147.312C890.464 148.781 888.956 150.984 888.956 153.922C888.956 157.633 891.546 159.953 896.726 160.88C902.912 161.808 912.499 162.349 925.488 162.504C932.833 162.581 938.322 162.736 941.956 162.968C945.59 163.122 949.958 163.702 955.061 164.707C960.241 165.713 964.648 167.22 968.282 169.23C978.719 175.106 983.938 183.727 983.938 195.092C983.938 206.921 978.255 215.851 966.89 221.882C956.916 227.294 941.994 230 922.124 230C908.517 230 897.538 228.492 889.188 225.477C876.354 220.838 869.937 213.648 869.937 203.906C869.937 198.339 872.566 193.585 877.823 189.642C883.158 185.698 889.382 183.456 896.495 182.915V182.451C890.928 181.214 886.25 179.088 882.462 176.073C877.591 172.052 875.156 167.066 875.156 161.112C875.156 154.077 878.403 148.703 884.897 144.992C889.072 142.518 894.291 141.01 900.554 140.469ZM922.472 140.701C928.89 140.701 933.451 137.608 936.157 131.423C937.935 127.094 938.825 118.705 938.825 106.257C938.825 93.8095 937.935 85.4208 936.157 81.0912C933.451 74.906 928.89 71.8134 922.472 71.8134C915.978 71.8134 911.378 74.906 908.672 81.0912C906.893 85.4208 906.004 93.8095 906.004 106.257C906.004 118.705 906.893 127.094 908.672 131.423C911.378 137.608 915.978 140.701 922.472 140.701ZM881.302 204.37C881.302 210.478 885.013 215.619 892.435 219.794C899.317 223.428 909.483 225.245 922.936 225.245C936.157 225.245 946.827 223.815 954.945 220.954C960.821 218.867 965.034 216.277 967.586 213.184C970.214 210.091 971.529 206.999 971.529 203.906C971.529 199.19 969.016 195.363 963.991 192.425C956.955 188.327 943.657 186.278 924.096 186.278C904.845 186.278 892.32 188.559 886.521 193.121C883.042 195.904 881.302 199.654 881.302 204.37Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M348.176 230H407.554V225.245H392.362V164.475H392.826C395.918 169.81 400.016 173.753 405.119 176.305C410.221 178.856 415.633 180.132 421.355 180.132C433.803 180.132 444.163 174.488 452.435 163.2C459.935 153.149 463.685 139.851 463.685 123.305C463.685 104.827 459.007 90.253 449.652 79.5835C442.23 71.2335 433.261 67.0585 422.746 67.0585C416.639 67.0585 410.879 68.6821 405.467 71.9294C400.132 75.1766 395.918 79.5836 392.826 85.1502H392.362V50.1265C392.362 31.5709 380.425 16.7264 363.368 16.7264C357.269 16.7264 341.889 17.2445 335.894 32.068C337.36 31.7672 338.883 31.5992 340.458 31.5742C346.186 21.2613 357.882 20.4375 363.368 20.4375C370.791 20.4375 385.403 27.8598 385.403 50.1265C385.403 67.9399 360.585 72.3932 348.176 72.3932V75.6405H363.368V225.245H348.176V230ZM414.976 172.478C412.038 172.478 409.062 171.55 406.046 169.694C403.031 167.839 400.364 164.901 398.044 160.88C393.328 152.917 390.97 140.546 390.97 123.769C390.97 108.615 393.173 96.8248 397.58 88.3975C399.977 83.7586 402.761 80.318 405.93 78.0759C409.178 75.7565 412.425 74.5967 415.672 74.5967C422.785 74.5967 427.308 80.7819 429.241 93.1523C430.633 102.198 431.328 112.558 431.328 124.233C431.328 138.768 430.555 149.786 429.009 157.285C427.849 163.007 425.955 166.988 423.326 169.23C420.698 171.395 417.914 172.478 414.976 172.478Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      d="M315.356 99.2989H321.038V62.864C321.038 49.4316 326.584 39.8648 334.487 36.5545C334.866 34.9296 335.34 33.4377 335.894 32.068C323.257 34.6612 314.892 47.1214 314.892 62.864C314.892 70.085 310.098 72.1483 307.702 72.2773C306.851 72.2773 305.923 72.2 304.918 72.0453C303.991 71.8134 303.14 71.5814 302.367 71.3495C301.594 71.1176 300.511 70.7696 299.12 70.3057C297.728 69.8419 296.491 69.4553 295.409 69.146C290.924 67.7543 286.324 67.0585 281.608 67.0585C270.088 67.0585 261.081 70.615 254.586 77.728C249.174 83.7586 246.468 90.9489 246.468 99.2989C246.468 104.17 247.241 108.577 248.788 112.52C250.411 116.463 252.576 119.71 255.282 122.261C257.988 124.736 260.617 126.746 263.168 128.292C265.72 129.761 268.464 131.037 271.402 132.119C277.587 134.361 284.121 136.024 291.002 137.106C297.883 138.188 302.985 139.541 306.31 141.165C313.887 144.799 317.675 150.25 317.675 157.517C317.675 162.465 315.549 166.756 311.297 170.39C307.044 173.715 301.516 175.377 294.713 175.377C286.904 175.377 279.675 173.328 273.026 169.23C267.614 165.906 263.168 161.692 259.689 156.589C256.21 151.409 253.929 145.727 252.847 139.541H247.164V180.132H252.847C252.924 178.508 253.658 177.232 255.05 176.305C256.442 175.377 258.104 174.913 260.037 174.913C261.351 174.913 264.83 175.686 270.474 177.232C278.051 179.165 285.087 180.132 291.581 180.132C302.406 180.132 311.529 177.426 318.951 172.014C327.61 165.674 331.94 156.744 331.94 145.224C331.94 140.353 331.205 135.908 329.736 131.887C328.267 127.867 326.489 124.62 324.402 122.145C322.314 119.594 319.801 117.352 316.863 115.419C313.926 113.409 311.297 111.94 308.977 111.012C306.658 110.084 304.184 109.273 301.555 108.577C295.988 107.03 289.996 105.793 283.579 104.866C277.24 103.938 272.639 102.817 269.779 101.502C263.748 98.7963 260.733 94.5054 260.733 88.6294C260.733 86.4646 261.042 84.6477 261.661 83.1787C262.279 81.3231 263.555 79.4289 265.488 77.496C269.508 73.7076 274.881 71.8134 281.608 71.8134C289.03 71.8134 295.525 73.8622 301.091 77.9599C307.895 82.8308 312.65 89.9438 315.356 99.2989Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      d="M340.458 31.5742C338.883 31.5992 337.36 31.7672 335.894 32.068C335.34 33.4377 334.866 34.9296 334.487 36.5545C335.851 35.983 337.285 35.598 338.774 35.4118C339.249 34.0052 339.816 32.7301 340.458 31.5742Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      d="M355.714 46.4154C355.714 61.2599 337.159 61.2599 337.159 46.4154C337.159 42.0606 337.754 38.433 338.774 35.4118C337.285 35.598 335.851 35.983 334.487 36.5545C333.821 39.4107 333.448 42.678 333.448 46.4154C333.448 64.971 359.425 64.971 359.425 46.4154C359.425 38.9931 355.714 31.5709 340.87 31.5709C340.732 31.5709 340.595 31.572 340.458 31.5742C339.816 32.7301 339.249 34.0052 338.774 35.4118C339.462 35.3257 340.161 35.282 340.87 35.282C347.984 35.282 355.714 38.5212 355.714 46.4154Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
    <path
      d="M1000 159.164C1000 163.803 1001.66 167.823 1004.99 171.225C1008.39 174.55 1012.41 176.212 1017.05 176.212C1021.69 176.212 1025.71 174.55 1029.11 171.225C1032.51 167.823 1034.21 163.803 1034.21 159.164C1034.21 154.525 1032.51 150.505 1029.11 147.103C1025.71 143.701 1021.69 142 1017.05 142C1012.41 142 1008.39 143.701 1004.99 147.103C1001.66 150.505 1000 154.525 1000 159.164Z"
      tw="fill-[var(--text-primary)] stroke-[var(--text-primary)]"
    />
  </svg>
);

const Amazing = ({
  animCallback,
  animateBlob,
}: {
  animCallback: () => void;
  animateBlob: boolean;
}) => (
  <svg
    id="Amazing"
    viewBox="0 0 1000 230"
    height="100%"
    onAnimationEnd={animCallback}
  >
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
          stdDeviation="60"
          result="effect1_foregroundBlur"
        ></feGaussianBlur>
      </filter>
    </defs>
    <clipPath id="textClip" className="filled-heading">
      <text
        css={{
          fontFamily: "source_sans_pro",
          fontSize: "230px",
          fontWeight: "bold"
        }}
        y=".75em"
      >
        Amazing.
      </text>
    </clipPath>
    <g clipPath="url(#textClip)">
      <g id="group1">
        <rect width="100%" height="100%" tw="fill-blob2"></rect>
        {animateBlob && (
          <g filter="url(#blur1)">
            <circle cx="0" cy="0" tw="fill-blob1" r="30%">
              <animate
                attributeName="cx"
                values="-30%;130%;-30%"
                dur="18s"
                repeatCount="999"
              />
              <animate
                attributeName="cy"
                values="-30%;130%;-30%"
                dur="12s"
                repeatCount="999"
              />
            </circle>
            <circle cx="0" cy="0" tw="fill-blob1" r="30%">
              <animate
                attributeName="cx"
                values="130%;-30%;130%"
                dur="12s"
                repeatCount="999"
              />
              <animate
                attributeName="cy"
                values="-30%;130%;-30%"
                dur="18s"
                repeatCount="999"
              />
            </circle>
            <circle cx="0" cy="0" tw="fill-blob2" r="30%">
              <animate
                attributeName="cx"
                values="130%;-30%;130%"
                dur="14s"
                repeatCount="999"
              />
              <animate
                attributeName="cy"
                values="130%;-30%;130%"
                dur="16s"
                repeatCount="999"
              />
            </circle>
            <circle cx="0" cy="0" tw="fill-blob1" r="30%">
              <animate
                attributeName="cx"
                values="-30%;130%;-30%"
                dur="16s"
                repeatCount="999"
              />
              <animate
                attributeName="cy"
                values="130%;-30%;130%"
                dur="14s"
                repeatCount="999"
              />
            </circle>
          </g>
        )}
      </g>
    </g>
  </svg>
);

interface H1Props {
  height: string | number;
}

const H1Styled = styled.h1`
  position: relative;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  height: ${(props: H1Props) => props.height};
  font-size: clamp(4rem, 12vw, 12rem);
  line-height: 1;
  animation: glitch-clip 12s steps(100, end);
  clip-path: inset(50%);
`;

const SpanStyled = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  &:first-of-type {
    animation: glitch 2s 6;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-0.025em, -0.0125em);
    opacity: 0.8;
  }

  &:last-of-type {
    animation: glitch 1s 12;
    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
    transform: translate(0.0125em, 0.025em);
    opacity: 0.8;
  }
`;

const Exciting = ({
  height,
  animCallback,
}: {
  height: string | number;
  animCallback: () => void;
}) => (
  <H1Styled
    id="Exciting"
    height={height}
    tw="text-primary"
    onAnimationEnd={animCallback}
  >
    <SpanStyled aria-hidden="true">Exciting.</SpanStyled>
    Exciting.
    <SpanStyled aria-hidden="true">Exciting.</SpanStyled>
  </H1Styled>
);
const height = "clamp(5rem,15vw,14rem)";

const FancyTitle = () => {
  const [iter, setIter] = useState(Math.floor(Math.random() * 3));
  const animateBlob = !usePrefersReducedMotion();
  return (
    <div
      css={css`
        height: ${height};
        aspect-ratio: 1043/239;
      `}
    >
      {iter === 0 && (
        <Inspiring
          animCallback={() => {
            setIter(1);
          }}
        />
      )}
      {iter === 1 && (
        <Amazing
          animCallback={() => {
            setIter(2);
          }}
          animateBlob={animateBlob}
        />
      )}
      {iter === 2 && (
        <Exciting
          height={height}
          animCallback={() => {
            setIter(0);
          }}
        />
      )}
    </div>
  );
};

export default FancyTitle;
