import React, { useEffect, useRef } from "react";
import "./CarryPhone.css";
const ScrollAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="container bg-cover bg-center"
      ref={containerRef}
      style={{
        backgroundImage: `url("https://i.ibb.co.com/tqHndSh/mobile-bg.png")`,
        borderRadius: "5px",
      }}
    >
      <img
        src="https://i.ibb.co.com/HNw0wHV/mobile-in-hand.png"
        alt="Sliding Animation"
        className="image"
      />
    </div>
  );
};

export default ScrollAnimation;
