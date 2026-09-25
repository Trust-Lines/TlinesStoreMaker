import type { ReactNode } from "react";

/** Renders `**word**` spans in card copy as <strong>. */
export function withBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
  );
}
