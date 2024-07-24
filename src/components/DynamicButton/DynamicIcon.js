import { motion } from "framer-motion";

export default function DynamicIcon({ progress }) {
  switch (progress) {
    case "authenticate":
      return <ConfirmIcon />;
    case "processing":
      return <ProcessingIcon />;
    case "completed":
      return <CompleteIcon />;
    default:
      return;
  }
}

function ConfirmIcon() {
  return (
    <motion.div
      layoutId={"confirm-icon"}
      key={"confirm-icon"}
      layout
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1.125,
      }}
      transition={{
        delay: 0.1,
      }}
      className="size-4 relative"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
        />
      </svg>
    </motion.div>
  );
}

function ProcessingIcon() {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 0.8,
      }}
      transition={{
        delay: 0.1,
      }}
      className="size-4 relative"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="size-full animate-spin"
        style={{
          animationDuration: "0.33s",
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2a10 10 0 1 1-4.546 18.91"
        />
      </svg>
    </motion.div>
  );
}

function CompleteIcon() {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1.125,
      }}
      transition={{
        delay: 0.1,
      }}
      className="size-4 relative"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </motion.div>
  );
}
