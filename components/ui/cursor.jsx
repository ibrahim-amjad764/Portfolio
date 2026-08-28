// components/ui/cursor.jsx
"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useApp } from "../../lib/AppContext";

const CursorContext = React.createContext(null);

/* =========================================================
   CURSOR CONFIG
   Each template has separate DARK + LIGHT colors.
   ========================================================= */

const cursorConfig = {
  minimal: {
    label: "Web Developer",

    dark: "#625AE9",
    light: "#5148D8",
  },

  "dark-dev": {
    label: "Full-Stack Developer",

    dark: "#02C6E9",
    light: "#198ECB",
  },

  creative: {
    label: "Prompt Engineer",

    dark: "#DD3A56",
    light: "#C52F4B",
  },

  default: {
    label: "Web Developer",

    dark: "#625AE9",
    light: "#5148D8",
  },
};

/* =========================================================
   CURSOR PROVIDER
   ========================================================= */

export function CursorProvider({ children, global = true }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useSpring(mouseX, {
    stiffness: 900,
    damping: 45,
    mass: 0.25,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 900,
    damping: 45,
    mass: 0.25,
  });

  const followX = useSpring(mouseX, {
    stiffness: 400,
    damping: 35,
    mass: 0.5,
  });

  const followY = useSpring(mouseY, {
    stiffness: 400,
    damping: 35,
    mass: 0.5,
  });

  React.useEffect(() => {
    if (!global) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) return;

    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [global, mouseX, mouseY]);

  return (
    <CursorContext.Provider
      value={{
        mouseX,
        mouseY,
        cursorX,
        cursorY,
        followX,
        followY,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

/* =========================================================
   CURSOR ICON
   ========================================================= */

function CursorIcon({ color }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
      }}
    >
      <path d="M3 2L6.5 21L11 15.5L17 18.5L3 2Z" fill={color} />
    </svg>
  );
}

/* =========================================================
   MAIN CURSOR
   ========================================================= */

export function Cursor({ className = "", ...props }) {
  const context = React.useContext(CursorContext);

  const { template, theme } = useApp();

  if (!context) {
    return null;
  }

  const { cursorX, cursorY } = context;

  const config = cursorConfig[template] || cursorConfig.default;

  const color = theme === "dark" ? config.dark : config.light;

  return (
    <motion.div
      {...props}
      className={`
        pointer-events-none
        fixed
        left-0
        top-0
        z-[99999]
        ${className}
      `}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "0%",
        translateY: "0%",
      }}
    >
      <CursorIcon color={color} />
    </motion.div>
  );
}

/* =========================================================
   CURSOR FOLLOW LABEL
   ========================================================= */

export function CursorFollow({
  children,
  className = "",
  sideOffset = 18,
  ...props
}) {
  const context = React.useContext(CursorContext);

  const { template, theme } = useApp();

  if (!context) {
    return null;
  }

  const { followX, followY } = context;

  const config = cursorConfig[template] || cursorConfig.default;

  const color = theme === "dark" ? config.dark : config.light;

  return (
    <motion.div
      {...props}
      className={`
        pointer-events-none
        fixed
        left-0
        top-0
        z-[99998]
        ${className}
      `}
      style={{
        x: followX,
        y: followY,
        translateX: "-100%",
        translateY: sideOffset,
      }}
    >
      <motion.div
        key={`${template}-${theme}`}
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          backgroundColor: color,
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.20)",
          boxShadow: `0 8px 30px ${color}55`,
          borderRadius: "999px",
        }}
        className="
          whitespace-nowrap
          px-4
          py-2
          text-xs
          font-semibold
          backdrop-blur-md
          select-none
        "
      >
        {children || config.label}
      </motion.div>
    </motion.div>
  );
}
