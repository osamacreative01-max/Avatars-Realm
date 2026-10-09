import type { ReactNode } from "react";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "red" | "blue";
  className?: string;
  as?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "red",
  className = "",
  as: Heading = "h2",
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`.trim()}
    >
      {eyebrow ? (
        <p className={`eyebrow ${centered ? "justify-center" : ""} ${tone === "blue" ? "eyebrow-blue" : ""}`.trim()}>
          {eyebrow}
        </p>
      ) : null}
      <Heading className={eyebrow ? "mt-4 display-2" : "display-2"}>
        {title}
      </Heading>
      {lede ? <p className="lede mt-5">{lede}</p> : null}
    </div>
  );
}
