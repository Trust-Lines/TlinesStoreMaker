export interface WhatsAppButtonProps {
  phone: string;
  message?: string;
}

export function WhatsAppButton({ phone, message }: WhatsAppButtonProps) {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";

  return (
    <a
      href={`https://wa.me/${phone}${query}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M16.004 4C9.377 4 4 9.373 4 15.996c0 2.114.556 4.176 1.612 5.992L4 28l6.163-1.585a11.99 11.99 0 0 0 5.84 1.489h.005c6.627 0 12.003-5.373 12.003-11.996C28.011 9.286 22.63 4 16.004 4Z"
          fill="#25D366"
        />
        <path
          d="M22.05 19.084c-.335-.168-1.982-.978-2.29-1.09-.307-.112-.53-.168-.754.168-.223.335-.865 1.09-1.06 1.314-.196.223-.39.251-.726.084-.335-.168-1.415-.522-2.696-1.665-.997-.889-1.67-1.987-1.865-2.322-.196-.335-.021-.516.147-.683.15-.15.335-.39.502-.586.168-.196.223-.335.335-.558.112-.223.056-.419-.028-.586-.084-.168-.754-1.816-1.033-2.487-.272-.653-.549-.565-.754-.575-.196-.01-.419-.012-.642-.012-.223 0-.586.084-.893.419-.307.335-1.172 1.145-1.172 2.793 0 1.649 1.2 3.242 1.367 3.465.168.223 2.362 3.607 5.723 5.058.8.345 1.424.551 1.91.706.803.255 1.534.219 2.112.133.644-.096 1.982-.81 2.262-1.593.279-.782.279-1.453.196-1.593-.084-.14-.307-.223-.642-.39Z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
