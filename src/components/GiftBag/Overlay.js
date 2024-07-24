"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

export default function Overlay() {
  const transition = {
    ease: [0.83, 0, 0.17, 1],
    duration: 1.75,
  };
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
      }}
      // repeating 1 is an easy way to control easing using the keyframes rather than the actual transition property
      // but we also do it here to be able to customize the animation while keeping it in sync with everything else
      animate={{
        opacity: [0, 1, 1, 1, 1, 0],
      }}
      transition={transition}
      className="absolute top-0 left-0 size-full flex justify-center items-center z-50"
    >
      <motion.div layout className="flex-1 h-full relative">
        <ClipLine transition={transition} />
        <motion.div
          layout
          // using clip-path to create a wipe-in effect
          initial={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            backgroundPosition: "50% 150%",
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            backgroundPosition: "50% -50%",
          }}
          transition={transition}
          // we use background-clip: text; along with background position and clip-path to create the effect
          className="absolute top-0 left-0 size-full grid p-2 bg-clip-text text-transparent bg-gradient-radial from-emerald-600 to-70% to-transparent bg-no-repeat"
          style={{
            gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
            backgroundSize: "100% 50%",
          }}
        >
          {/* creating a matrix of 20x20=400 numbers */}
          {[...Array(400)].map((_, index) => (
            <Matrix key={index} />
          ))}
          <ClipLineGradients transition={transition} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ClipLine({ transition }) {
  return (
    <motion.div
      layout
      initial={{
        top: "100%",
      }}
      animate={{
        top: "0%",
      }}
      transition={transition}
      className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-white via-emerald-500 to-white z-50"
    ></motion.div>
  );
}

function ClipLineGradients({ transition }) {
  return (
    <>
      <motion.div
        layout
        initial={{
          top: "100%",
        }}
        animate={{
          top: "0%",
        }}
        transition={transition}
        className="absolute left-0 w-full h-5 bg-gradient-radial from-emerald-400 to-70% to-transparent bg-no-repeat opacity-25"
        style={{
          backgroundSize: "100% 200%",
          backgroundPosition: "100% 100%",
        }}
      ></motion.div>
      <motion.div
        layout
        initial={{
          top: "100%",
        }}
        animate={{
          top: "0%",
        }}
        transition={transition}
        className="absolute left-0 w-full h-4 bg-gradient-radial from-emerald-400 to-70% to-transparent bg-no-repeat opacity-35"
        style={{
          backgroundSize: "100% 200%",
          backgroundPosition: "100% 100%",
        }}
      ></motion.div>
      <motion.div
        layout
        initial={{
          top: "100%",
        }}
        animate={{
          top: "0%",
        }}
        transition={transition}
        className="absolute left-0 w-full h-3 bg-gradient-radial from-emerald-400 to-70% to-transparent bg-no-repeat opacity-45"
        style={{
          backgroundSize: "100% 200%",
          backgroundPosition: "100% 100%",
        }}
      ></motion.div>
      <motion.div
        layout
        initial={{
          top: "100%",
        }}
        animate={{
          top: "0%",
        }}
        transition={transition}
        className="absolute left-0 w-full h-2 bg-gradient-radial from-emerald-400 to-70% to-transparent bg-no-repeat opacity-50"
        style={{
          backgroundSize: "100% 200%",
          backgroundPosition: "100% 100%",
        }}
      ></motion.div>
    </>
  );
}

function Matrix() {
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  // for demo purposes only
  // in a real world app, we'd use an svg image
  // or some set values to prevent hoggng the CPU in a complex application
  const number = getRandomInt(0, 10);

  return (
    <motion.div
      layout
      className={clsx(
        "m-auto font-mono",
        number > 5 ? "font-black" : "font-extralight"
      )}
      style={{
        fontSize: "0.75rem",
      }}
    >
      {number}
    </motion.div>
  );
}
