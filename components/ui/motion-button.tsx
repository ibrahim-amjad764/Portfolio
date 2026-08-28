// "use client";

// import React from "react";
// import { ArrowRight, type LucideIcon } from "lucide-react";

// interface MotionButtonProps {
//   label: string;
//   onClick?: () => void;
//   icon?: LucideIcon;
//   type?: "button" | "submit";
//   variant?: "primary" | "secondary";
//   href?: string;
//   target?: string;
//   rel?: string;
//   disabled?: boolean;
//   ariaLabel?: string;
//   iconClassName?: string;
//   className?: string;
// }

// export const MotionButton = ({
//   label,
//   onClick,
//   icon: Icon = ArrowRight,
//   type = "button",
//   variant = "primary",
//   href,
//   target,
//   rel,
//   disabled = false,
//   ariaLabel,
//   iconClassName = "",
//   className = "",
// }: MotionButtonProps) => {
//   const isPrimary = variant === "primary";
//   const containerClass = isPrimary
//     ? "border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] text-[var(--portfolio-text)] shadow-lg"
//     : "border border-[var(--portfolio-border)] bg-transparent text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)]";

//   // White replaced with #635bea
//   const circleClass = isPrimary ? "bg-[#635bea]" : "bg-purple-600";
//   const iconClass = isPrimary
//     ? "bg-[var(--portfolio-text)] text-[var(--portfolio-card)] group-hover:bg-transparent group-hover:text-white"
//     : "text-[var(--portfolio-text)]";
//   const labelClass = isPrimary
//     ? "text-[var(--portfolio-text)] group-hover:text-white"
//     : "text-[var(--portfolio-text)] group-hover:text-white";

//   const content = (
//     <>
//       <span
//         className={`absolute left-1 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 ease-out group-hover:w-[calc(100%-8px)] ${circleClass}`}
//       />
//       <span
//         className={`relative z-10 mr-3 flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${iconClass}`}
//       >
//         <Icon className={`h-4 w-4 ${iconClassName}`} aria-hidden="true" />
//       </span>
//       <span
//         className={`relative z-10 font-semibold transition-colors duration-300 ${labelClass}`}
//       >
//         {label}
//       </span>
//     </>
//   );

//   const classNames = `group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:pr-8 disabled:cursor-not-allowed disabled:opacity-60 ${containerClass} ${className}`;

//   if (href) {
//     return (
//       <a
//         href={href}
//         target={target}
//         rel={rel}
//         onClick={onClick}
//         className={classNames}
//         aria-label={ariaLabel || label}
//       >
//         {content}
//       </a>
//     );
//   }

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={classNames}
//       aria-label={ariaLabel || label}
//     >
//       {content}
//     </button>
//   );
// };
"use client";

import React from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { useApp } from "../../lib/AppContext";

interface MotionButtonProps {
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  ariaLabel?: string;
  iconClassName?: string;
  className?: string;
}

export const MotionButton = ({
  label,
  onClick,
  icon: Icon = ArrowRight,
  type = "button",
  variant = "primary",
  href,
  target,
  rel,
  disabled = false,
  ariaLabel,
  iconClassName = "",
  className = "",
}: MotionButtonProps) => {
  const { template } = useApp();

  const isPrimary = variant === "primary";

  const themeColor =
    template === "dark-dev"
      ? "#02c4e8"
      : template === "creative"
        ? "#de3b58"
        : "#645be9";

  // Active Theme Color Background for Primary Variant
  const containerClass = isPrimary
    ? "border border-transparent text-white shadow-md"
    : "border border-[var(--portfolio-border)] bg-transparent text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)]";

  // Solid theme background style for primary
  const primaryBgStyle = isPrimary ? { backgroundColor: themeColor } : {};

  const circleStyle = {
    backgroundColor: themeColor,
  };

  const iconClass = isPrimary
    ? "bg-[var(--portfolio-text)] text-[var(--portfolio-card)] group-hover:bg-transparent group-hover:text-white"
    : "text-[var(--portfolio-text)] group-hover:text-white";

  const labelClass = isPrimary
    ? "text-[var(--portfolio-text)] group-hover:text-white"
    : "text-[var(--portfolio-text)] group-hover:text-white";

  const content = (
    <>
      {/* 
        FULL BUTTON HOVER EXPAND:
        Starts slightly inset (left-1.5) so default state doesn't touch outer border.
        Expands to FULL button (100% width/height) on group-hover.
      */}
      <span
        className="
          absolute
          left-1.5
          top-1/2
          h-8
          w-8
          -translate-y-1/2
          rounded-full
          transition-all
          duration-500
          ease-out
          group-hover:left-0
          group-hover:top-0
          group-hover:h-full
          group-hover:w-full
          group-hover:translate-y-0
          group-hover:rounded-full
        "
        style={circleStyle}
        aria-hidden="true"
      />

      {/* ICON */}
      <span
        className={`
          relative
          z-10
          mr-3
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          group-hover:translate-x-1
          ${iconClass}
        `}
      >
        <Icon className={`h-4 w-4 ${iconClassName}`} aria-hidden="true" />
      </span>

      {/* LABEL */}
      <span
        className={`
          relative
          z-10
          font-semibold
          transition-colors
          duration-300
          ${labelClass}
        `}
      >
        {label}
      </span>
    </>
  );

  const classNames = `
    group
    relative
    inline-flex
    min-h-12
    items-center
    justify-center
    overflow-hidden
    rounded-full
    px-6
    py-3
    text-sm
    font-medium
    transition-all
    duration-300
    disabled:cursor-not-allowed
    disabled:opacity-60
    ${containerClass}
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classNames}
        aria-label={ariaLabel || label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames}
      aria-label={ariaLabel || label}
    >
      {content}
    </button>
  );
};
