import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type WrapperProps = {
  children: React.ReactElement<any>;
  glow?: boolean;
  glowSize?: number | string;
  glowColor?: string;
  glowSpeed?: {
    default?: string;
    hover?: string;
  };
  glowBackgroundImage?: string;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
  glow = true,
  glowSize = 1,
  glowColor = "#ff9966",
  glowSpeed = {
    default: "5s",
    hover: "2.5s",
  },
  glowBackgroundImage,
}) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [childSize, setChildSize] = useState({ width: 0, height: 0 });
  const [childRadius, setChildRadius] = useState("5px");

  const resolvedGlowSize =
    typeof glowSize === "number" ? glowSize : parseFloat(glowSize);

  // 🔍 ResizeObserver logic
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const { offsetWidth: width, offsetHeight: height } = el;
      const computedStyle = getComputedStyle(el);
      const borderRadius = computedStyle.borderRadius || "5px";

      setChildSize({ width, height });
      setChildRadius(borderRadius);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [children]);

  const handleMouseEnter = () => {
    if (glowRef.current) {
      glowRef.current.style.setProperty(
        "--glow-speed",
        glowSpeed.hover ?? glowSpeed.default ?? "5s"
      );
    }

    if (wrapperRef.current) {
      wrapperRef.current.style.filter = "brightness(1.5)";
    }
  };

  const handleMouseLeave = () => {
    if (glowRef.current) {
      glowRef.current.style.setProperty(
        "--glow-speed",
        glowSpeed.default ?? "5s"
      );
    }

    if (wrapperRef.current) {
      wrapperRef.current.style.filter = "brightness(1)";
    }
  };

  const diagonal = Math.sqrt(childSize.width ** 2 + childSize.height ** 2);
  const glowWidth = Math.min(childSize.width, childSize.height);
  const glowHeight = diagonal;

  const wrapperWidth = childSize.width + resolvedGlowSize * 2;
  const wrapperHeight = childSize.height + resolvedGlowSize * 2;

  const glowStyle = {
    "--glow-color": glowColor,
    "--glow-speed": glowSpeed.default,
    borderRadius: childRadius,
  } as React.CSSProperties;

  const measuredChild = React.cloneElement(children, {
    ref: measureRef,
    style: { visibility: "hidden", position: "absolute" },
  });

  const renderedChild = React.cloneElement(children, {});

  return (
    <>
      {/* Invisible clone for measurement */}
      {measuredChild}

      {/* Actual wrapper */}
      {childSize.width > 0 && (
        <div
          className="relative inline-block group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: `${Math.ceil(wrapperWidth)}px`,
            height: `${Math.ceil(wrapperHeight)}px`,
          }}
        >
          {glow && (
            <div
              ref={glowRef}
              className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
              style={glowStyle}
            >
              <div
                className={clsx(
                  "absolute",
                  "animate-[rotation-z_var(--glow-speed)_linear_infinite]",
                  glowBackgroundImage
                    ? ""
                    : "bg-[linear-gradient(90deg,transparent,var(--glow-color),var(--glow-color),var(--glow-color),var(--glow-color),transparent)]"
                )}
                style={{
                  width: `${glowWidth}px`,
                  height: `${glowHeight}px`,
                  borderRadius: childRadius,
                  backgroundImage: glowBackgroundImage,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            </div>
          )}

          <div
            ref={wrapperRef}
            className="absolute z-10"
            style={{
              left: `${resolvedGlowSize}px`,
              top: `${resolvedGlowSize}px`,
            }}
          >
            {renderedChild}
          </div>
        </div>
      )}
    </>
  );
};

export default Wrapper;
