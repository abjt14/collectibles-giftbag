"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AuthenticationWidget({ callback }) {
  const [code, setCode] = React.useState(new Array(6).fill(""));
  const inputs = React.useRef([]);

  const handleChange = (element, index) => {
    const value = element.value;
    // verifying whether the entered value is a number
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // autofocus next input
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  // backspace will also autofocus previous element
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // calling callback function when all 6 inputs are filled
  React.useEffect(() => {
    const isValidated = code.every((digit) => digit.match(/^[0-9]$/));
    isValidated && callback();
  }, [code, callback]);

  return (
    <motion.div
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
      className="absolute bottom-[calc(100%+0.66rem)] left-0 w-full rounded-full bg-black border border-neutral-900 shadow-md shadow-neutral-300 text-neutral-400 flex justify-center items-center gap-1 px-6 py-2 cursor-default"
      style={{
        // this the equivalent of transform-origin: bottom; for framer motion
        originY: 1,
      }}
    >
      <motion.div layout className="flex justify-center items-center gap-1">
        {code.map((data, index) => {
          return (
            <motion.input
              key={index}
              layout
              value={data}
              maxLength={1}
              type="number"
              autoFocus={index === 0}
              pattern="\d*"
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              // holding inputs in ref so that we can perform the autofocus auto-magically
              ref={(el) => (inputs.current[index] = el)}
              className="text-white text-center bg-neutral-800 rounded-md w-full aspect-square border border-neutral-600 focus-within:border-white shadow-sm outline-none px-1 transition-[border-color] duration-75"
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
}
