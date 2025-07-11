import { useRef } from "react";
import { IconButton } from "@toriistudio/glow-ui";
import { Playground, useControls } from "@toriistudio/v0-playground";
import { TwitchIcon } from "./components/ui/twitch";
import { YoutubeIcon } from "./components/ui/youtube";
import { InstagramIcon } from "./components/ui/instagram";

function InnerPreview() {
  const twitchRef = useRef(null);
  const youtubeRef = useRef(null);
  const instagramRef = useRef(null);

  const { backgroundColor, isGlowing, disabled } = useControls(
    {
      backgroundColor: { type: "color", value: "#171717" },
      isGlowing: { type: "boolean", value: true },
      disabled: { type: "boolean", value: false },
    },
    {
      componentName: "IconButton",
    }
  );

  const handleClick = async (ref: React.RefObject<any>, url: string) => {
    await ref.current?.startAnimation();
    window.open(url, "_blank");
  };

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <IconButton
        glowColor="#ff0033"
        backgroundColor={backgroundColor}
        isGlowing={isGlowing}
        disabled={disabled}
        onClick={() =>
          handleClick(youtubeRef, "https://www.youtube.com/@toriistudio")
        }
      >
        <YoutubeIcon ref={youtubeRef} />
      </IconButton>
      <IconButton
        glowColor="#ed01c4"
        backgroundColor={backgroundColor}
        isGlowing={isGlowing}
        disabled={disabled}
        onClick={() =>
          handleClick(instagramRef, "https://www.instagram.com/toriistudio")
        }
      >
        <InstagramIcon ref={instagramRef} />
      </IconButton>
      <IconButton
        glowColor="#9146ff"
        backgroundColor={backgroundColor}
        isGlowing={isGlowing}
        disabled={disabled}
        onClick={() =>
          handleClick(twitchRef, "https://www.twitch.tv/toriistudio")
        }
      >
        <TwitchIcon ref={twitchRef} />
      </IconButton>
    </div>
  );
}

export default function App() {
  return (
    <Playground>
      <InnerPreview />
    </Playground>
  );
}
