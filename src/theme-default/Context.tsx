import { useState } from "react";
import configData from "virtual:island-config";
import { Link } from "react-router-dom";
function Context() {
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
      <Link to="/guide">guide</Link>
    </div>
  );
}

export default Context;
