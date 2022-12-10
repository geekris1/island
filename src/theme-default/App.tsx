import { useState } from "react";

export function App() {
  let [count, setCount] = useState(0);
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
