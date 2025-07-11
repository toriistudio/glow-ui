"use client";
import { motion, useAnimation } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

const rectVariants = {
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

const lineVariants = {
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

const InstagramIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 20, ...props }, ref) => {
    const rectControls = useAnimation();
    const pathControls = useAnimation();
    const lineControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          return Promise.all([
            rectControls.start("animate"),
            pathControls.start("animate"),
            lineControls.start("animate"),
          ]);
        },
        stopAnimation: () => {
          rectControls.start("normal");
          pathControls.start("normal");
          lineControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          rectControls.start("animate");
          pathControls.start("animate");
          lineControls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [lineControls, onMouseEnter, pathControls, rectControls]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          rectControls.start("normal");
          pathControls.start("normal");
          lineControls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [rectControls, pathControls, lineControls, onMouseLeave]
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
          <motion.rect
            variants={rectVariants}
            initial="normal"
            animate={rectControls}
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            ry="5"
          />
          <motion.path
            variants={pathVariants}
            initial="normal"
            animate={pathControls}
            d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
          />
          <motion.line
            variants={lineVariants}
            initial="normal"
            animate={lineControls}
            x1="17.5"
            y1="6.5"
            x2="17.51"
            y2="6.5"
          />
        </svg>
      </div>
    );
  }
);

InstagramIcon.displayName = "InstagramIcon";

export { InstagramIcon };
