import React from "react";
import { ThemeProvider } from "@emotion/react";

import globalTheme from "./shared/GlobalTheme";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={globalTheme}>
        <Dashboard />
      </ThemeProvider>
    </div>
  );
}
