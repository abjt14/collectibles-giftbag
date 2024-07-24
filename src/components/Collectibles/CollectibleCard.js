/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { produce } from "immer";

export default function CollectibleCard({
  slug,
  alt,
  width,
  height,
  selected,
  setCollectibleArray = () => {},
  progress,
}) {
  // using immer to update the original object array of collectibles
  const handleClick = React.useCallback(() => {
    setCollectibleArray((prev) => {
      return produce(prev, (draftState) => {
        const index = draftState.findIndex((state) => state.slug == slug);
        draftState[index].selected = !selected;
      });
    });
  }, [slug, selected, setCollectibleArray]);

  // using useState and useEffect to manage custom transition values for framer motion
  // based on the current value of "progress"
  const [transition, setTransition] = React.useState({
    delay: 0,
  });
  React.useEffect(() => {
    if (!selected && progress !== "initial") {
      setTransition({
        delay: 1,
        duration: 0,
      });
    } else {
      setTransition({
        delay: 0,
      });
    }
  }, [selected, progress]);

  return (
    <motion.button
      layoutId={slug}
      key={slug}
      layout
      transition={transition}
      className={clsx(
        "size-40 p-2",
        // managing z-index according to the value of "selected"
        // we do this because we create a layer between the selected and non-selected cards
        // as the shared layout transition occurs on the selected cards in order to blur out the latter
        selected ? "z-30" : "z-0",
        progress !== "initial" && "pointer-events-none touch-none"
      )}
      onClick={handleClick}
    >
      <motion.div
        layout
        className="relative overflow-hidden size-full rounded-2xl shadow-md"
      >
        <motion.img
          layout
          className="absolute top-0 left-0 size-full"
          src={`/collectibles/${slug}.jpeg`}
          aria-label={alt}
          style={{
            aspectRatio: `${width} / ${height}`,
          }}
        />
        <CheckIcon checked={selected} />
      </motion.div>
    </motion.button>
  );
}

function CheckIcon({ checked }) {
  return (
    <motion.div
      layout
      className={clsx(
        "absolute top-3 right-3 border-2 border-white border-opacity-50 rounded-full p-0.5 transition-[background] duration-150",
        checked ? "bg-white" : "bg-transparent"
      )}
    >
      {/* framer motion does not work well with SVGs when it comes to layout transitions */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        className={clsx(
          "size-3 stroke-black transition-transform duration-150",
          checked ? "scale-100" : "scale-0"
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0 1"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    </motion.div>
  );
}
