export function IconCalendar(props: { className?: string }) {
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
      <rect height="15.5" width="17" x="3.5" y="5" />
      <path d="M3.5 10h17" />
      <path d="M8 2.5V7" />
      <path d="M16 2.5V7" />
    </svg>
  );
}
