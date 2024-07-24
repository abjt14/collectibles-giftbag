"use client";

import React from "react";
import { DATABASE } from "@/data/collectibles-db";
import { produce } from "immer";
import Collectibles from "@/components/Collectibles";
import DynamicButton from "@/components/DynamicButton";
import BlurOverlay from "@/components/BlurOverlay";
import { motion, AnimatePresence } from "framer-motion";
import GiftBag from "@/components/GiftBag";

export default function Home() {
  const [collectibleArray, setCollectibleArray] = React.useState(DATABASE);
  const [progress, setProgress] = React.useState("initial"); // initial | confirm | authenticate | processing | completed

  React.useEffect(() => {
    let timeoutID;

    // for demo purposes only
    // emulating a real world api response delay using a settimeout
    if (progress === "processing") {
      timeoutID = window.setTimeout(() => {
        setProgress("completed");
      }, 2000);
    }

    if (progress === "completed") {
      // once the progress has reached "completed" status
      // we find the collectibles that were selected but are still owned
      // and make their owned status false to show the remaining collectibles on home
      setCollectibleArray((prev) => {
        return produce(prev, (draftState) => {
          draftState.forEach((state) => {
            if (state.selected && state.owned) {
              state.owned = false;
            }
          });
        });
      });

      // for demo purposes only
      // checking if we have any remaining owned cards after the progress reaches "completed" status
      // we reset the data and the progress to loop the interaction
      const ownedCardCount = collectibleArray.filter(
        (card) => card.owned
      ).length;
      timeoutID = window.setTimeout(() => {
        setProgress("initial");
        if (ownedCardCount === 0) {
          setCollectibleArray(DATABASE);
        }
      }, 2000);
    }
  }, [progress, collectibleArray]);

  return (
    <main className="min-h-svh flex flex-col justify-center items-center gap-16">
      <motion.div
        layout
        layoutRoot
        className="size-80 relative grid grid-cols-2 mx-auto justify-items-center"
      >
        {/* animate presence enables us to have an exit animation when unmounting components similar to native apps */}
        <AnimatePresence>
          {progress !== "initial" && <BlurOverlay />}
        </AnimatePresence>
        <Collectibles
          collectibleArray={collectibleArray}
          setCollectibleArray={setCollectibleArray}
          progress={progress}
        />
        <AnimatePresence>
          {progress !== "initial" && (
            <GiftBag triggerCompletedAnimation={progress === "completed"} />
          )}
        </AnimatePresence>
      </motion.div>
      <DynamicButton
        progress={progress}
        setProgress={setProgress}
        collectibleArray={collectibleArray}
      />
    </main>
  );
}
