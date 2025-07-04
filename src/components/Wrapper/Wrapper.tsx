import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type WrapperProps = {
  children: React.ReactElement<any>;
  glow?: boolean;
  glowSize?: number | string;
  glowColor?: string;
  glowSpeed?: string;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
  glow = true,
  glowSize = 1,
  glowColor = "#ff9966",
  glowSpeed = "5s",
}) => {
  const measureRef = useRef<HTMLElement>(null);
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

  const diagonal = Math.sqrt(childSize.width ** 2 + childSize.height ** 2);
  const glowWidth = Math.min(childSize.width, childSize.height);
  const glowHeight = diagonal;

  const wrapperWidth = childSize.width + resolvedGlowSize * 2;
  const wrapperHeight = childSize.height + resolvedGlowSize * 2;

  const glowStyle = {
    "--glow-color": glowColor,
    "--glow-speed": glowSpeed,
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
          className="relative inline-block"
          style={{
            width: `${Math.ceil(wrapperWidth)}px`,
            height: `${Math.ceil(wrapperHeight)}px`,
          }}
        >
          {glow && (
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
              style={glowStyle}
            >
              <div
                className={clsx(
                  "absolute",
                  "animate-[rotation-z_var(--glow-speed)_linear_infinite]",
                  "bg-[linear-gradient(90deg,transparent,var(--glow-color),var(--glow-color),var(--glow-color),var(--glow-color),transparent)]"
                )}
                style={{
                  width: `${glowWidth}px`,
                  height: `${glowHeight}px`,
                  borderRadius: childRadius,
                }}
              />
            </div>
          )}

          <div
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
