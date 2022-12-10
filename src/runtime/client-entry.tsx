import { createRoot } from "react-dom/client";
import { App } from "../theme-default/App";

function renderInBrowser() {
  const container = document.querySelector("#root");
  createRoot(container).render(<App></App>);
}

renderInBrowser();
