import React from "react";
import {
  Button as UIButton,
  ButtonProps as UIButtonProps,
} from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";

type ButtonProps = {
  isGlowing?: boolean;
  glowColor?: string;
  glowSize?: number | string;
} & UIButtonProps;

const Button: React.FC<ButtonProps> = ({
  isGlowing = true,
  glowColor = "red",
  disabled = false,
  glowSize = 1,
  children,
  ...props
}) => {
  const button = (
    <UIButton disabled={disabled} {...props}>
      {children}
    </UIButton>
  );

  return isGlowing ? (
    <Wrapper glowColor={glowColor} glowSize={glowSize} glow={!disabled}>
      {button}
    </Wrapper>
  ) : (
    button
  );
};

export default Button;
