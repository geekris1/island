import { useState } from "react";
import configData from "virtual:island-config";
export function App() {
  let [count, setCount] = useState(0);
  console.log(configData);
  return (
    <div>
      count:{count}
      <button
        onClick={() => {
          setCount(++count);
        }}
      >
        +
      </button>
    </div>
  );
}
