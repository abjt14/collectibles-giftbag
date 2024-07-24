"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BlurOverlay() {
  return (
    <motion.div
      layout
      // opacity does not look as good as background opacity when we want to fade-in/fade-out a backdrop blur
      initial={{
        background: "rgba(255, 255, 255, 0)",
        backdropFilter: "blur(0px)",
      }}
      animate={{
        background: "rgba(255, 255, 255, 1)",
        backdropFilter: "blur(1rem)",
      }}
      exit={{
        background: "rgba(255, 255, 255, 0)",
        backdropFilter: "blur(0px)",
      }}
      className="absolute top-0 left-0 size-full z-10 pointer-events-none touch-none"
    ></motion.div>
  );
}
