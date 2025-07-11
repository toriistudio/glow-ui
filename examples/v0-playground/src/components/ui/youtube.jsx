"use client";
import { motion, useAnimation } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

const pathVariants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const triangleVariants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const YoutubeIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 20, ...props }, ref) => {
    const pathControls = useAnimation();
    const triangleControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          return Promise.all([
            pathControls.start("animate"),
            triangleControls.start("animate"),
          ]);
        },
        stopAnimation: () => {
          pathControls.start("normal");
          triangleControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          pathControls.start("animate");
          triangleControls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [onMouseEnter, pathControls, triangleControls]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          pathControls.start("normal");
          triangleControls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [pathControls, triangleControls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            variants={pathVariants}
            initial="normal"
            animate={pathControls}
            d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
          />
          <motion.path
            variants={triangleVariants}
            initial="normal"
            animate={triangleControls}
            d="M10 15l5-3-5-3z"
          />
        </svg>
      </div>
    );
  }
);

YoutubeIcon.displayName = "YoutubeIcon";

export { YoutubeIcon };
