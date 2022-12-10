import { renderToString } from "react-dom/server";
import { App } from "../theme-default/App";
export function render() {
  return renderToString(<App></App>);
}
