"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Overlay from "./Overlay";

// there are some fps issues on ios safari/safari-wrappers that need to be addressed
// the culprit is clip-path animation on the images
// will need to cook up a solution
export default function GiftBag({ triggerCompletedAnimation }) {
  return (
    <>
      <GiftBagVariant type={"front"} trigger={triggerCompletedAnimation} />
      <GiftBagVariant type={"back"} trigger={triggerCompletedAnimation} />
      {triggerCompletedAnimation && <Overlay />}
    </>
  );
}

function GiftBagVariant({ type, trigger }) {
  return (
    <motion.div
      layout
      initial={{
        y: 50,
        opacity: 0,
        // setting brightness(1.1) to adjust the giftbag image
        // the original image has some grays in it that i wanted to eleminate
        filter: "blur(1rem) brightness(1.1)",
        scale: 0.5,
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px) brightness(1.1)",
        scale: 1,
      }}
      exit={{
        y: 100,
        opacity: 0,
        filter: "blur(1rem) brightness(1.1)",
        scale: 0.5,
      }}
      className={clsx(
        "absolute top-0 left-0 size-full flex justify-center items-center brightness-110",
        // the front is at z-index: 40
        // the selectied collectibles are at z-index: 30
        // the back is at z-index: 20
        type === "front" ? "z-40" : "z-20"
      )}
    >
      <motion.img
        layout
        initial={false}
        animate={{
          // using clip path to create a wipe out effect
          // using this in sync with other effects can be very creative
          clipPath: trigger
            ? "polygon(0 0, 100% 0, 100% 0%, 0% 0%)"
            : "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
        transition={{
          ease: [0.83, 0, 0.17, 1],
          duration: 1.75,
        }}
        src={`/giftbag/${type}.png`}
        aria-label={`giftbag ${type} side`}
        className="size-full aspect-square"
      />
    </motion.div>
  );
}
