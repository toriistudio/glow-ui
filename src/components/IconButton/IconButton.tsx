import React, { useRef } from "react";
import Wrapper from "@/components/Wrapper";

type IconProps = {
  isGlowing?: boolean;
  glowColor?: string;
  glowSize?: number | string;
  disabled?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const IconButton: React.FC<IconProps> = ({
  isGlowing = true,
  glowColor = "red",
  glowSize = 1,
  disabled = false,
  backgroundColor = "#1d1b4b",
  children,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const Icon = (
    <div
      ref={containerRef}
      onClick={!disabled ? onClick : undefined}
      className="relative w-[40px] h-[42px] flex items-center justify-center rounded-[10px] border border-transparent transition-opacity duration-200 group"
      style={{
        backgroundColor,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      <div className="transition-transform duration-300 ease-out group-hover:scale-110">
        {children}
      </div>
    </div>
  );

  return isGlowing ? (
    <Wrapper glowColor={glowColor} glowSize={glowSize} glow={!disabled}>
      {Icon}
    </Wrapper>
  ) : (
    Icon
  );
};

export default IconButton;
