import React from "react";
import {
  Button as UIButton,
  ButtonProps as UIButtonProps,
} from "@/components/ui/button";
import GlowingBorder from "@/components/GlowingBorder";

type ButtonProps = {
  isGlowing?: boolean;
  glowColor?: string;
} & UIButtonProps;

const Button: React.FC<ButtonProps> = ({
  isGlowing = true,
  glowColor = "red",
  disabled = false,
  children,
  ...props
}) => {
  const button = (
    <UIButton disabled={disabled} {...props}>
      {children}
    </UIButton>
  );

  return isGlowing ? (
    <GlowingBorder color={glowColor} disabled={disabled}>
      {button}
    </GlowingBorder>
  ) : (
    button
  );
};

export default Button;
