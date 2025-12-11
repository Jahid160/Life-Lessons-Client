import { useRef } from "react";
import { useAnimationFrame } from "motion/react";

export default function Loading() {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;

    const rotate = Math.sin(t / 10000) * 200;
    const y = (1 + Math.sin(t / 1000)) * -50;

    ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
  });

  return (
    <div className="cube-container">
      <div className="cube" ref={ref}>
        <div className="side front" />
        <div className="side left" />
        <div className="side right" />
        <div className="side top" />
        <div className="side bottom" />
        <div className="side back" />
      </div>
      <CubeStyles />
    </div>
  );
}

/** CSS inside JSX */
function CubeStyles() {
  return (
    <style>{`
      .cube-container {
        perspective: 800px;
        width: 200px;
        height: 200px;
        margin: 0 auto;
      }

      .cube {
        width: 200px;
        height: 200px;
        position: relative;
        transform-style: preserve-3d;
      }

      .side {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.7;
      }

      .front  { background: #ff7676; transform: rotateY(0deg) translateZ(100px); }
      .right  { background: #76a8ff; transform: rotateY(90deg) translateZ(100px); }
      .back   { background: #ffa76b; transform: rotateY(180deg) translateZ(100px); }
      .left   { background: #7dffb1; transform: rotateY(-90deg) translateZ(100px); }
      .top    { background: #d67dff; transform: rotateX(90deg) translateZ(100px); }
      .bottom { background: #ffe36b; transform: rotateX(-90deg) translateZ(100px); }
    `}</style>
  );
}
