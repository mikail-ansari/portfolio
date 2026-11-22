import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domMax } from "framer-motion";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./lib/theme.jsx";
import { SmoothScroll } from "./lib/smooth.jsx";

// domMax is needed for layout animations (nav indicator, filters) and drag (lightbox swipe)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LazyMotion features={domMax} strict>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </LazyMotion>
    </ThemeProvider>
  </StrictMode>
);
