/**
 * Theme Configuration and Color Guide
 * 
 * This file documents the CSS variables available for theming.
 * The theme automatically switches between light and dark modes.
 * 
 * Usage in components:
 * - Use CSS classes with var() for dynamic theme colors
 * - Example: className="bg-[var(--background)] text-[var(--foreground)]"
 * - Or use the Tailwind theme variables defined in global.css
 */

export const THEME_COLORS = {
  LIGHT: {
    background: "#ffffff",
    foreground: "#171717",
    primary: "#15A305",
    primaryDark: "#128d04",
    primaryLight: "#F9FBE7",
    secondary: "#f3f4f6",
    secondaryForeground: "#6b7280",
    border: "#e5e7eb",
    inputBg: "#f9fafb",
    cardBg: "#ffffff",
    cardBorder: "#e5e7eb",
    error: "#ef4444",
    errorLight: "#fee2e2",
    success: "#22c55e",
    successLight: "#f0fdf4",
    warning: "#eab308",
    warningLight: "#fefce8",
    info: "#3b82f6",
    infoLight: "#eff6ff",
  },
  DARK: {
    background: "#0f172a",
    foreground: "#f1f5f9",
    primary: "#22c55e",
    primaryDark: "#16a34a",
    primaryLight: "#1e3a1f",
    secondary: "#1e293b",
    secondaryForeground: "#cbd5e1",
    border: "#334155",
    inputBg: "#1e293b",
    cardBg: "#1e293b",
    cardBorder: "#334155",
    error: "#ef4444",
    errorLight: "#7f1d1d",
    success: "#22c55e",
    successLight: "#052e16",
    warning: "#eab308",
    warningLight: "#422006",
    info: "#3b82f6",
    infoLight: "#0c1840",
  },
};

/**
 * CSS Variables Available (defined in app/global.css):
 * --background - Main background color
 * --foreground - Main text color
 * --primary - Primary brand color (green in light, adjusted for dark)
 * --primary-dark - Darker shade of primary
 * --primary-light - Light shade of primary
 * --secondary - Secondary background color
 * --secondary-foreground - Secondary text color
 * --border - Border color
 * --input-bg - Input field background
 * --card-bg - Card background
 * --card-border - Card border color
 * --error - Error/danger color
 * --error-light - Light error background
 * --success - Success color
 * --success-light - Light success background
 * --warning - Warning color
 * --warning-light - Light warning background
 * --info - Info/blue color
 * --info-light - Light info background
 */
