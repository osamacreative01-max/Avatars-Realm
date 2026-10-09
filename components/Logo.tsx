import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

/**
 * Approved Avatars Realm lockup — AR monogram, dragon and stacked wordmark.
 * Cropped from the company letterhead and exported as a transparent PNG.
 */
export default function Logo({
  className = "h-20 sm:h-24",
  priority = false,
}: Props) {
  return (
    <Image
      src="/images/logo.png"
      alt="Avatars Realm — Esports Academy and Gaming Arena"
      width={444}
      height={171}
      priority={priority}
      sizes="(max-width: 640px) 208px, 250px"
      className={`w-auto ${className}`.trim()}
    />
  );
}
