import configData from "virtual:island-config";
import Context from "./Context";
import Router from "./Router";
export function App() {
  return (
    <div>
      <hi>island</hi>
      <Context></Context>
      <Router></Router>
    </div>
  );
}
