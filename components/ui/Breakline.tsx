type BreaklineProps = {
  className?: string;
  [propName: string]: string | undefined;
};

export default function Breakline({
  className = "",
  ...others
}: BreaklineProps) {
  return (
    <div
      className={`border-t ${className}`}
      data-testid="breakline"
      {...others}
    ></div>
  );
}
