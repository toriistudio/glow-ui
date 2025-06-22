# ✨ Glow UI ✨

A collection of headless, themeable React components with built-in support for Tailwind CSS, custom animations, and design tokens.

## ✅ Features

- Headless components with sensible defaults
- Fully themeable via Tailwind CSS
- Includes animations like `glow-spin`
- Dark mode ready
- Designed to scale with your design system

---

## 🚀 Installation

Install the package and its required peer dependencies:

```bash
npm install @toriistudio/glow-ui

# or with yarn
yarn add @toriistudio/glow-ui
```

## 🧩 Tailwind Setup

To use `@toriistudio/glow-ui` properly, you must add our preset to your `tailwind.config.ts`:

```ts
import preset from "@toriistudio/glow-ui/preset";

export default {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@toriistudio/**/*.{js,ts,jsx,tsx}", // 👈 Required
  ],
};
```

## 📦 Usage

```ts
import { Button } from "@toriistudio/glow-ui";

export default function Example() {
  return <Button>Click me</Button>;
}
```

## 🤙 License

MIT
