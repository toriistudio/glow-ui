import React from "react";

export default function Input({
  colorA = "#e3f219",
  colorB = "#ff1b69",
  placeholder = "Type something...",
  transitionDuration = "2000ms",
  Icon,
  ...props
}: {
  colorA?: string;
  colorB?: string;
  placeholder?: string;
  transitionDuration?: string;
  Icon?: React.ReactNode;
}) {
  const [value, setValue] = React.useState("");
  const [placeholderWidth, setPlaceholderWidth] = React.useState(100);
  const spanRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (spanRef.current) {
      setPlaceholderWidth(spanRef.current.offsetWidth);
    }
  }, [placeholder]);

  const glowGradient = `conic-gradient(#000, ${colorA} 5%, #000 38%, #000 50%, ${colorB} 60%, #000 87%)`;
  const borderGradient = `conic-gradient(#1c191c, ${colorA} 5%, #1c191c 14%, #1c191c 50%, ${colorB} 60%, #1c191c 64%)`;

  return (
    <div className="flex justify-center items-center group">
      {/* Glow Layer */}
      <div
        className="absolute blur-[30px] opacity-40 overflow-hidden rounded-[12px]"
        style={{
          maxWidth: "354px",
          maxHeight: "130px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[60deg] transition-transform ease-linear group-hover:rotate-[-120deg] group-focus-within:rotate-[420deg]"
          style={{
            width: "999px",
            height: "999px",
            backgroundImage: glowGradient,
            filter: "brightness(1.3)",
            transitionDuration,
          }}
        />
      </div>

      {/* Border Layer */}
      <div
        className="absolute blur-[0.5px] overflow-hidden rounded-[11px]"
        style={{
          maxWidth: "303px",
          maxHeight: "59px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[70deg] transition-transform ease-linear group-hover:rotate-[-110deg] group-focus-within:rotate-[430deg]"
          style={{
            width: "600px",
            height: "600px",
            backgroundImage: borderGradient,
            filter: "brightness(1.3)",
            transitionDuration,
          }}
        />
      </div>

      {/* Main Input */}
      <div
        id="main"
        className="relative"
        style={{ width: "301px", height: "56px" }}
      >
        {/* Optional Icon */}
        {Icon && (
          <div className="absolute top-0 left-0 flex justify-center items-center w-[60px] h-full text-white opacity-80">
            {Icon}
          </div>
        )}

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder={placeholder}
          className="w-full h-full px-6 rounded-[10px] bg-[#010201] text-white placeholder-gray-400 outline-none"
          style={{
            paddingInlineStart: Icon ? "60px" : "1.5rem",
            paddingInlineEnd: "1.5rem",
          }}
          {...props}
        />

        {/* Mask Gradient */}
        {value === "" && (
          <div
            className="pointer-events-none absolute top-[18px] left-[70px] h-[20px] bg-gradient-to-r from-transparent to-black"
            style={{ width: `${placeholderWidth}px` }}
            aria-hidden="true"
          />
        )}

        {/* Hidden span to measure placeholder width */}
        <span
          ref={spanRef}
          className="absolute invisible whitespace-pre px-1"
          style={{
            fontSize: "16px",
            fontFamily: "inherit",
            top: "-9999px", // prevent layout shift
            left: "-9999px",
          }}
        >
          {placeholder}
        </span>

        {/* Pink Blur */}
        <div className="pointer-events-none absolute top-[10px] left-[5px] w-[30px] h-[20px] bg-[#cf30aa] blur-[20px] opacity-80 group-hover:opacity-0 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}
