import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
  alt: string;
  index?: number;
};

/** One module of the proposed Starter Edition. */
export default function AreaCard({ title, description, image, alt, index }: Props) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="card-media relative aspect-[4/3]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
        />
        {typeof index === "number" ? (
          <span className="absolute right-4 bottom-3 font-mono text-[0.75rem] font-medium tracking-[0.2em] text-paper-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display-3">{title}</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300">
          {description}
        </p>
      </div>
    </article>
  );
}
