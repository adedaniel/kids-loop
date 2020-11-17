import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
});

const theme = {
  ...chakraTheme,
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    mono: "Inter, sans-serif",
  },
  breakpoints,
};

export default extendTheme(theme);
