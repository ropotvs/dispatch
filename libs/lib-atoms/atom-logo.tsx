export function AtomLogo(props: { height?: number }) {
  return (
    <span
      className="font-bold tracking-tight select-none"
      style={{ fontSize: props.height ?? 24, lineHeight: 1 }}
    >
      telex
      <span className="text-accent">.</span>
    </span>
  );
}
