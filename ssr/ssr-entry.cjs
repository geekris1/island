"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const server = require("react-dom/server");
const react = require("react");
function App() {
  let [count, setCount] = react.useState(0);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    "count:",
    count,
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        onClick: () => {
          setCount(++count);
        },
        children: "+"
      }
    )
  ] });
}
function render() {
  return server.renderToString(/* @__PURE__ */ jsxRuntime.jsx(App, {}));
}
exports.render = render;
