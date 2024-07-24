"use client";

import React from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import clsx from "clsx";
import DynamicText from "./DynamicText";
import DynamicIcon from "./DynamicIcon";
import AuthenticationWidget from "./AuthenticationWidget";

export default function DynamicButton({
  progress,
  setProgress,
  collectibleArray,
}) {
  // using React.useId() whenever we need a unique id but don't care about re-mounting
  const buttonID = React.useId();

  const disabled =
    collectibleArray.every((card) => !card.selected || !card.owned) &&
    progress !== "completed";

  function handleClick() {
    if (!disabled) {
      switch (progress) {
        case "initial":
          setProgress("confirm");
          break;
        case "confirm":
          setProgress("authenticate");
          break;
        default:
          break;
      }
    }
  }

  function handleAuthenticated() {
    if (progress === "authenticate") {
      setProgress("processing");
    }
  }

  // creating a seperate class names string to avoid a complex chain of ternary orperators
  let buttonClassNames = "";
  if (!disabled) {
    if (progress === "initial" || progress === "confirm") {
      buttonClassNames =
        "bg-black text-white border border-neutral-900 shadow-md shadow-neutral-300";
    } else if (progress === "authenticate" || progress === "processing") {
      buttonClassNames =
        "bg-neutral-50 shadow-sm shadow-neutral-200 border-neutral-200 text-black cursor-default";
    } else if (progress === "completed") {
      buttonClassNames =
        "bg-emerald-50 shadow-sm shadow-emerald-200 border-emerald-200 text-emerald-950 cursor-default";
    }
  } else {
    buttonClassNames =
      "bg-neutral-200 shadow-transparent border-neutral-200 text-neutral-400 pointer-events-none touch-none";
  }

  // framer motion controls for dismiss button
  const dismissButtonControls = useAnimation();

  // framer motion transition
  const transition = {
    type: "spring",
    duration: 0.4,
    bounce: 0.4,
  };

  return (
    <motion.div
      layout
      className="w-full flex justify-center items-center gap-2 z-50 relative"
    >
      <AnimatePresence mode="popLayout">
        <motion.button
          layoutId={buttonID + "-main"}
          key={buttonID + "-main"}
          layout
          initial={false}
          transition={transition}
          whileHover={{
            padding:
              progress === "initial" || progress === "confirm"
                ? "8px 32px"
                : "8px 24px",
          }}
          className={clsx(
            "w-fit relative rounded-full py-2 px-6 flex justify-between items-center gap-[6px] border transition-[background,border,color,box-shadow] duration-150 outline-none",
            buttonClassNames
          )}
          onClick={handleClick}
        >
          <AnimatePresence>
            {progress === "authenticate" && (
              <AuthenticationWidget callback={handleAuthenticated} />
            )}
          </AnimatePresence>
          <DynamicText progress={progress} />
          <DynamicIcon progress={progress} />
        </motion.button>
        {/* when using multiple elements inside an <AnimatePresence /> */}
        {/* framer seems to want direct access to the children rather than components */}
        {/* will try to figure out a solution to this problem */}
        {(progress === "confirm" || progress === "authenticate") && (
          <motion.button
            layout
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={transition}
            onMouseEnter={() => dismissButtonControls.start("hover")}
            onMouseLeave={() => dismissButtonControls.start("initial")}
            className="p-2 rounded-full bg-black text-white border border-neutral-900 shadow-md shadow-neutral-300 outline-none"
            onClick={() => setProgress("initial")}
          >
            <DismissIcon
              controls={dismissButtonControls}
              transition={transition}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DismissIcon({ controls, transition }) {
  const variants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.25,
    },
  };
  return (
    <motion.svg
      variants={variants}
      animate={controls}
      transition={transition}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </motion.svg>
  );
}
