import React from "react";
import { ThemeProvider } from "@emotion/react";

import globalTheme from "../shared/GlobalTheme";

export default function MockTheme({ children }) {
  return <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>;
}
