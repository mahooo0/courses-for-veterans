"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import splashBg from "@/shared/assets/images/splash-bg.png";

type Phase = "splash" | "cubes-in" | "hold" | "cubes-out" | "done";

const CUBE_DURATION = 0.05; // 50ms per cube fade

function shuffleArray(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getGridConfig(width: number) {
  const mobile = width < 640;
  const cols = mobile ? 5 : 15;
  const rows = mobile ? 8 : 9;
  const staggerMs = mobile ? 0.018 : 0.008;
  const total = cols * rows;
  const crossCols = cols - 1;
  const crossRows = rows - 1;
  const crossTotal = crossCols * crossRows;

  const orderIn = shuffleArray(total);
  const orderOut = shuffleArray(total);

  const delayInMap = new Array(total).fill(0);
  orderIn.forEach((cubeIdx, position) => {
    delayInMap[cubeIdx] = position * staggerMs;
  });

  const delayOutMap = new Array(total).fill(0);
  orderOut.forEach((cubeIdx, position) => {
    delayOutMap[cubeIdx] = position * staggerMs;
  });

  return {
    cols,
    rows,
    total,
    staggerMs,
    crossCols,
    crossRows,
    crossTotal,
    orderIn,
    orderOut,
    delayInMap,
    delayOutMap,
    lastCubeIn: orderIn[orderIn.length - 1],
    lastCubeOut: orderOut[orderOut.length - 1],
    maxDelay: (total - 1) * staggerMs,
  };
}

interface IntroAnimationProps {
  onComplete: () => void;
  onPhaseChange?: (phase: string) => void;
}

export function IntroAnimation({
  onComplete,
  onPhaseChange,
}: IntroAnimationProps) {
  const [phase, setPhase] = useState<Phase>("splash");
  const completedRef = useRef(false);

  // Compute grid config once — on server defaults to desktop (1024),
  // on client reads actual viewport width. Cubes are invisible during
  // splash anyway so any hydration mismatch is not visible.
  const [gridConfig] = useState(() =>
    getGridConfig(typeof window !== "undefined" ? window.innerWidth : 1024),
  );

  // Derive showSplash from phase — no setState needed
  const showSplash = phase === "splash" || phase === "cubes-in";

  // Notify parent of phase changes
  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  // Phase transitions
  useEffect(() => {
    if (phase === "splash") {
      const timer = setTimeout(() => setPhase("cubes-in"), 800);
      return () => clearTimeout(timer);
    }
    if (phase === "hold") {
      const timer = setTimeout(() => setPhase("cubes-out"), 150);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleCubeInComplete = useCallback(() => {
    setPhase("hold");
  }, []);

  const handleCubeOutComplete = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true;
      setPhase("done");
      onComplete();
    }
  }, [onComplete]);

  if (phase === "done") return null;

  const {
    cols,
    rows,
    total,
    crossCols,
    crossTotal,
    delayInMap,
    delayOutMap,
    lastCubeIn,
    lastCubeOut,
    maxDelay,
  } = gridConfig;

  const cubeIn =
    phase === "cubes-in" || phase === "hold" || phase === "cubes-out";
  const cubeOut = phase === "cubes-out";

  return (
    <div className="fixed inset-0 z-50">
      {/* Splash image layer */}
      {showSplash && (
        <div className="absolute inset-0">
          <Image
            src={splashBg}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Cube grid layer */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: total }, (_, i) => {
          const isLastIn = i === lastCubeIn;
          const isLastOut = i === lastCubeOut;

          return (
            <motion.div
              key={i}
              className="bg-green-dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: cubeOut ? 0 : cubeIn ? 1 : 0 }}
              transition={{
                duration: CUBE_DURATION,
                ease: cubeOut ? "easeIn" : "easeOut",
                delay: cubeOut ? delayOutMap[i] : delayInMap[i],
              }}
              onAnimationComplete={() => {
                if (phase === "cubes-in" && isLastIn) {
                  handleCubeInComplete();
                } else if (phase === "cubes-out" && isLastOut) {
                  handleCubeOutComplete();
                }
              }}
            />
          );
        })}
      </div>

      {/* "+" cross marks at grid intersections */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: crossTotal }, (_, i) => {
          const col = i % crossCols;
          const row = Math.floor(i / crossCols);
          const left = `${((col + 1) / cols) * 100}%`;
          const top = `${((row + 1) / rows) * 100}%`;

          const crossInDelay = (i / crossTotal) * maxDelay;
          const crossOutDelay = (i / crossTotal) * maxDelay;

          return (
            <motion.div
              key={`cross-${i}`}
              className="absolute flex items-center justify-center"
              style={{
                left,
                top,
                width: 16,
                height: 16,
                marginLeft: -8,
                marginTop: -8,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: cubeOut ? 0 : cubeIn ? 1 : 0 }}
              transition={{
                duration: CUBE_DURATION,
                ease: cubeOut ? "easeIn" : "easeOut",
                delay: cubeOut ? crossOutDelay : crossInDelay,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Vertical bar */}
                <rect x="7" y="2" width="2" height="12" fill="#2F4C4F" />
                {/* Horizontal bar */}
                <rect x="2" y="7" width="12" height="2" fill="#2F4C4F" />
              </svg>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
