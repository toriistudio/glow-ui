import * as LucideIcons from "lucide-react";
import { Input } from "@toriistudio/glow-ui";
import { Playground, useControls } from "@toriistudio/v0-playground";

const ICON_NAMES = [
  "Send",
  ...[...Object.keys(LucideIcons)]
    .sort(() => 0.5 - Math.random())
    .slice(0, 100),
];

function Grid() {
  return (
    <div
      className="absolute inset-0 w-screen h-screen z-[0] blur-[1px]"
      style={{
        backgroundImage: `
      linear-gradient(to right,rgb(13, 13, 13) 1px, transparent 1px),
      linear-gradient(to bottom,rgb(13, 13, 13) 1px, transparent 1px)
    `,
        backgroundSize: "1rem 1rem",
        backgroundPosition: "center",
      }}
    />
  );
}

function InnerPreview() {
  const { placeholder, colorA, colorB, icon } = useControls(
    {
      placeholder: { type: "string", value: "Type something..." },
      colorA: { type: "color", value: "#e3f219" },
      colorB: { type: "color", value: "#ff1b69" },
      icon: {
        type: "select",
        options: ICON_NAMES,
        value: ICON_NAMES[0],
      },
    },
    {
      componentName: "Input",
    }
  );

  const IconComponent = LucideIcons[icon] ?? LucideIcons.Search;

  return (
    <>
      <Grid />
      <Input
        placeholder={placeholder}
        colorA={colorA}
        colorB={colorB}
        Icon={<IconComponent />}
      />
    </>
  );
}

export default function App() {
  return (
    <Playground>
      <InnerPreview />
    </Playground>
  );
}
