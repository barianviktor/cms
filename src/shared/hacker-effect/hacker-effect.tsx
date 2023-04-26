import React, { useState } from "react";
export interface HackerEffectProps {
  title: string;
}
export default function HackerEffect({ title }: HackerEffectProps) {
  const [effectedTitle, setEffectedTitle] = useState(title);
  const renderEffect = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iterations = 0;
    const interval = setInterval(() => {
      setEffectedTitle(
        effectedTitle
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return title[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );
      if (iterations > title.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);
  };
  return (
    <h1 onMouseOver={renderEffect} data-value={effectedTitle}>
      {effectedTitle}
    </h1>
  );
}
