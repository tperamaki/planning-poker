"use client";

import { useState } from "react";

export default function JoinGame() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
