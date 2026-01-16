import { Config } from 'tailwindcss';

/**
 * Educacross Design System - Tailwind Preset
 *
 * This preset extends Tailwind CSS with design tokens from the Educacross Design System.
 * All values reference CSS custom properties defined in styles.css.
 *
 * Usage in consumer apps:
 * ```ts
 * // tailwind.config.ts
 * import { educacrossPreset } from "@educacross/ui/tailwind-preset";
 *
 * export default {
 *   presets: [educacrossPreset],
 *   content: [
 *     "./src/** /*.{ts,tsx}",
 *     "./node_modules/@educacross/ui/dist/** /*.js",
 *   ],
 * };
 * ```
 */
declare const educacrossPreset: Config;

export { educacrossPreset as default, educacrossPreset };
