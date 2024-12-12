import React, { useEffect, useState } from "react";

const LoadingRadialProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress animation
    const interval = 100; // Update every 100ms
    const increment = 100 / (3000 / interval); // Sync with the fetch duration
    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextValue = prev + increment;
        return nextValue >= 100 ? 100 : nextValue;
      });
    }, interval);

    return () => clearInterval(timer); // Cleanup interval
  }, []);

  return progress;
};

export default LoadingRadialProgress;
