export function IconGear(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      width="16"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v3.5" />
      <path d="M12 18.5V22" />
      <path d="M2 12h3.5" />
      <path d="M18.5 12H22" />
      <path d="m4.9 4.9 2.5 2.5" />
      <path d="m16.6 16.6 2.5 2.5" />
      <path d="m19.1 4.9-2.5 2.5" />
      <path d="m7.4 16.6-2.5 2.5" />
    </svg>
  );
}
