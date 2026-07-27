export function IconEyeOff(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      width="20"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M4 3l16 18" />
    </svg>
  );
}
