"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1>Arvin</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}