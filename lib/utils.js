// ─── lib/utils.js ─────────────────────────────────────────────────────────────
// Utility function for merging Tailwind CSS classes
// Handles conditional classes and avoids duplicates

/**
 * cn - className utility for merging conditional classes
 * @param {...string} classes - Class names to merge
 * @returns {string} - Merged class string
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
