/**
 * Equilibrado brand colors - Modern, professional color scheme
 * Inspired by the olive green and beige tones that promote calm and balance
 */

import { Platform } from "react-native";

// Brand Colors
const oliveGreen = "#4A5F4C";
const softOlive = "#5C7A5E";
const warmBeige = "#F5F3ED";
const creamWhite = "#FDFCF8";
const darkOlive = "#3A4A3C";
const accentTeal = "#5A8B8A";
const softGray = "#8B9B8D";
const lightGray = "#E8EBE6";

const tintColorLight = oliveGreen;
const tintColorDark = warmBeige;

export const Colors = {
  light: {
    text: "#2C3A2D",
    background: creamWhite,
    tint: tintColorLight,
    icon: softGray,
    tabIconDefault: softGray,
    tabIconSelected: tintColorLight,
    primary: oliveGreen,
    secondary: warmBeige,
    accent: accentTeal,
    card: "#FFFFFF",
    border: lightGray,
    success: "#6B9F71",
    warning: "#D4A574",
    error: "#C07A7A",
    textSecondary: "#6B7869",
  },
  dark: {
    text: warmBeige,
    background: "#1F2821",
    tint: tintColorDark,
    icon: softGray,
    tabIconDefault: softGray,
    tabIconSelected: tintColorDark,
    primary: softOlive,
    secondary: darkOlive,
    accent: accentTeal,
    card: "#2A3529",
    border: "#3F4F41",
    success: "#6B9F71",
    warning: "#D4A574",
    error: "#C07A7A",
    textSecondary: "#A8B5A6",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
