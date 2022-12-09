import { useState } from "react";

export function Default() {
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
