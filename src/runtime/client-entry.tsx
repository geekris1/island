import { createRoot } from "react-dom/client";
import { App } from "../theme-default/App";
import { BrowserRouter } from "react-router-dom";
function renderInBrowser() {
  const container = document.querySelector("#root");
  createRoot(container).render(
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  );
}

renderInBrowser();
