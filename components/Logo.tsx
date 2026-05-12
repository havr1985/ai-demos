type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 32, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle cx="50" cy="50" r="50" fill="var(--accent)" />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="42"
        fontWeight="500"
        fontFamily="var(--font-fraunces), Georgia, serif"
        letterSpacing="-0.02em"
        fill="var(--background)"
      >
        YH
      </text>
    </svg>
  );
}

export type { LogoProps };
