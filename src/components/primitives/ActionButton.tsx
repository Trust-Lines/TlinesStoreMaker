"use client";

type Variant = "solid" | "outline" | "ghost";

const variantClass: Record<Variant, string> = {
  solid: "bg-coral text-cream hover:bg-coral-dark",
  outline: "border border-forest text-forest hover:bg-forest hover:text-cream",
  ghost: "text-forest hover:text-coral",
};

export interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
}

export function ActionButton({
  label,
  onClick,
  variant = "solid",
  disabled = false,
  loading = false,
  type = "button",
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]}`}
    >
      {loading ? <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      {label}
    </button>
  );
}
