import { Playground, useControls } from "@toriistudio/v0-playground";
import { Button } from "@toriistudio/glow-ui";

function InnerPreview() {
  const { text, variant, glowColor, disabled } = useControls(
    {
      text: { type: "string", value: "Hello World" },
      variant: {
        type: "select",
        value: "default",
        options: ["default", "secondary", "ghost"],
      },
      glowColor: { type: "color", value: "#d3ea1b" },
      disabled: { type: "boolean", value: false },
    },
    {
      componentName: "Button",
    }
  );

  return (
    <Button
      glowColor={glowColor}
      variant={variant as "default" | "secondary" | "ghost"}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}

export default function App() {
  return (
    <Playground>
      <InnerPreview />
    </Playground>
  );
}
