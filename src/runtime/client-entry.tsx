import { createRoot } from "react-dom/client";
import { Default } from "../theme-default";

function renderInBrowser() {
  const container = document.querySelector("#root");
  createRoot(container).render(<Default></Default>);
}

renderInBrowser();
