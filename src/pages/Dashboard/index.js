import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const handleCountClick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    alert("data changed");
  }, [count]);

  return (
    <div>
      Click me for increasing count :
      <button onClick={handleCountClick}>Click!</button>
      <h1> {count}</h1>
    </div>
  );
}
