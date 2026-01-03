import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const outlineSpringConfig = { damping: 40, stiffness: 300, mass: 0.8 };
  const outlineXSpring = useSpring(cursorX, outlineSpringConfig);
  const outlineYSpring = useSpring(cursorY, outlineSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => document.body.classList.add("cursor-active");
    const handleMouseUp = () => document.body.classList.remove("cursor-active");

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="cursor-dot fixed pointer-events-none z-[9999] bg-primary h-2 w-2 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
      <motion.div
        className="cursor-outline fixed pointer-events-none z-[9998] border border-primary/50 h-10 w-10 rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          left: outlineXSpring,
          top: outlineYSpring,
        }}
      />
    </>
  );
}
