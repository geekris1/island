import { renderToString } from "react-dom/server";
import { App } from "../theme-default/App";
import { StaticRouter } from "react-router-dom/server";
export function render() {
  return renderToString(
    <StaticRouter location="/guide">
      <App></App>
    </StaticRouter>
  );
}
