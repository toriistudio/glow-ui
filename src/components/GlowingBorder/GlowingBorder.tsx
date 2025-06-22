import React from "react";
import clsx from "clsx";

type GlowingBorderProps = {
  children: React.ReactNode;
  color?: string;
  animationDuration?: string;
  borderRadius?: string;
  disabled?: boolean;
};

const GlowingBorder: React.FC<GlowingBorderProps> = ({
  children,
  color = "red",
  animationDuration = "3s",
  borderRadius = "8px",
  disabled = false,
}) => {
  const style = {
    "--glowing-color": color,
    "--glowing-border-speed": animationDuration,
    "--glowing-radius": borderRadius,
  } as React.CSSProperties;

  return (
    <div
      className={clsx(
        "relative overflow-hidden w-fit",
        "z-0",
        !disabled && "z-10"
      )}
      style={{ ...style, borderRadius }}
    >
      <div className="p-[1px] rounded-[var(--glowing-radius)]">
        {children}
        {!disabled && (
          <div
            className={clsx(
              "absolute top-[-150%] left-0 w-full h-[400%] z-[-1]",
              "blur-sm rounded-full",
              "bg-[conic-gradient(from_0_at_50%_50%,var(--glowing-color),#fff0_80deg,#fff0_280deg,var(--glowing-color)_360deg)]",
              "animate-glow-spin"
            )}
          />
        )}
      </div>
    </div>
  );
};

export default GlowingBorder;
