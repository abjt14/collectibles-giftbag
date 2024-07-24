"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function DynamicText({ progress }) {
  let buttonText = "";

  switch (progress) {
    case "initial":
      buttonText = "Send Collectibles";
      break;
    case "confirm":
      buttonText = "Confirm Transaction";
      break;
    case "authenticate":
      buttonText = "Enter Authenticator Code";
      break;
    case "processing":
      buttonText = "Processing Request";
      break;
    case "completed":
      buttonText = "Completed Transaction";
      break;
    default:
      break;
  }

  let textArray = buttonText.split("");

  return (
    <motion.div className="flex justify-center items-center pointer-events-none touch-none">
      {textArray.map((char, index) => (
        // each character is controller by framer motion
        // same characters that were in the same position as before get reused
        // due to the same key value and layout id
        <Character
          key={char + index}
          id={char + index}
          char={char}
          progress={progress}
        />
      ))}
    </motion.div>
  );
}

function Character({ id, char, progress }) {
  return (
    <motion.div
      layoutId={id}
      key={id}
      layout="position"
      initial={false}
      animate={{
        opacity: [0, 1],
      }}
      transition={{
        ease: "linear",
        duration: 0.15,
      }}
    >
      {/* need to replace " " with <>&nbsp;</> */}
      {/* because of how HTML treats " " as text nodes */}
      {char !== " " ? char : <span>&nbsp;</span>}
    </motion.div>
  );
}
