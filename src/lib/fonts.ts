// Shared font stacks used across multiple sections. Montserrat per the Figma
// spec, with safe system fallbacks — not loaded from Google Fonts (see
// layout.tsx): this machine's network blocks/hangs on that, so if
// Montserrat isn't installed locally the fallback (Segoe UI) is used
// instead, and the page still loads instantly either way.
export const MONTSERRAT_STACK = '"Montserrat", "Segoe UI", system-ui, Arial, sans-serif';
