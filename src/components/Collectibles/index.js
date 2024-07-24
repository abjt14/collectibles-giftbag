"use client";

import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import CollectibleCard from "./CollectibleCard";

export default function CardLayout({
  collectibleArray,
  setCollectibleArray,
  progress,
}) {
  // if we have a large number of cards, we'd be memoizing these values
  const ownedCards = collectibleArray.filter((card) => card.owned);
  const ownedAndNotSelectedCards = ownedCards.filter(
    (card) => !card.selected || (card.selected && progress === "initial")
  );
  const selectedCards = collectibleArray.filter(
    (card) => card.owned && card.selected && progress !== "initial"
  );

  return (
    <LayoutGroup>
      {ownedAndNotSelectedCards.map((card) => {
        const { slug, width, height, alt, selected } = card;

        return (
          <CollectibleCard
            key={"collectible-card-" + slug + "-default"}
            slug={slug}
            width={width}
            height={height}
            alt={alt}
            selected={selected}
            setCollectibleArray={setCollectibleArray}
            progress={progress}
          />
        );
      })}
      {selectedCards.length > 0 && (
        <motion.div className="absolute top-0 left-0 size-full pointer-events-none z-30">
          {selectedCards.map((card) => {
            const { slug, width, height, alt, selected } = card;

            // calculating index in owned cards to figure out the height
            // to which the card needs to go before going into the giftbag
            const indexInOwnedArray = ownedCards.findIndex(
              (card) => card.slug === slug
            );
            const initialYPosition =
              300 +
              50 *
                (indexInOwnedArray % 2 === 0
                  ? indexInOwnedArray
                  : indexInOwnedArray - 1);
            const finalYPosition =
              progress === "processing" || progress === "completed" ? 0 : -50;

            const random = Math.random() * 2 - 1;

            return (
              <motion.div
                layout
                key={"collectible-card-" + slug + "-selected"}
                initial={{
                  y: initialYPosition,
                  x: 0,
                  rotate: 0,
                }}
                animate={{
                  y: finalYPosition,
                  x: random * 5,
                  rotate: random * 10,
                }}
                className="absolute top-0 left-0 size-full flex justify-center items-center"
              >
                <CollectibleCard
                  slug={slug}
                  width={width}
                  height={height}
                  alt={alt}
                  selected={selected}
                  progress={progress}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </LayoutGroup>
  );
}
