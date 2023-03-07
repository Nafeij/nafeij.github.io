import React, { useState } from "react";

const options = [
  {
    title: "Blonkisoaz",
    subtitle: "Omuke trughte a otufta",
    style: {
      background: "#ED5565",
    },
    icon: "\f554",
  },
  {
    title: "Oretemauw",
    subtitle: "Omuke trughte a otufta",
    style: {
      background: "#FC6E51",
    },
    icon: "\f2dc",
  },
  {
    title: "Iteresuselle",
    subtitle: "Omuke trughte a otufta",
    style: {
      background: "#FFCE54",
    },
    icon: "\f1bb",
  },
  {
    title: "Idiefe",
    subtitle: "Omuke trughte a otufta",
    style: {
      background: "#2ECC71",
    },
    icon: "\f2b9",
  },
  {
    title: "Oretemauw",
    subtitle: "Omuke trughte a otufta",
    style: {
      background: "#5D9CEC",
    },
    icon: "\f185",
  },
  {
    title: "Iteresuselle",
    subtitle: "Omuke trughte a otufta",
    style: {
      background: "#AC92EC",
    },
    icon: "\f185",
  },
];

const FlexCards = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="options">
      {options.map((opt, i) => (
        <div
          className={`option ${i === active ? "active" : ''}`}
          key={i}
          style={opt.style}
          onClick={() => {
            setActive(i);
          }}
        >
          <div className="shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="fas">{opt.icon}</i>
            </div>
            <div className="info">
              <div className="main">{opt.title}</div>
              <div className="sub">{opt.subtitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlexCards;
