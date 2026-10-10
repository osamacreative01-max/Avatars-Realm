import Image from "next/image";

/**
 * Branded loading mark — the Asset 7 dragon bobbing while a stylised fire
 * breath pulses out of its mouth, over a soft red halo.
 */
export default function DragonLoader({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[441/336] w-[min(78vw,24rem)] ${className}`.trim()}
    >
      {/* Soft red halo breathing behind the mark. */}
      <div
        aria-hidden="true"
        className="loader-halo absolute inset-[-22%] rounded-full bg-[radial-gradient(circle,rgba(255,43,85,0.38),transparent_65%)] blur-2xl"
      />

      <div className="loader-bob relative h-full w-full">
        <Image
          src="/images/Asset%207.svg"
          alt=""
          aria-hidden="true"
          width={441}
          height={336}
          priority
          unoptimized
          className="relative h-full w-full"
        />

        {/* Fire breath, anchored to the mouth at ~95% x / 42% y of the art. */}
        <div
          aria-hidden="true"
          className="loader-breath absolute top-[42%] left-[93%] h-[15%] w-[60%] bg-[linear-gradient(90deg,#ffd24a,#ff7a18_42%,rgba(225,18,37,0.45)_76%,transparent)] blur-[1.5px] [clip-path:polygon(0_45%,16%_16%,38%_36%,58%_6%,78%_32%,100%_50%,78%_68%,58%_94%,38%_64%,16%_84%)]"
        />
        {/* Inner hot core of the flame. */}
        <div
          aria-hidden="true"
          className="loader-breath-2 absolute top-[43%] left-[93%] h-[8%] w-[38%] bg-[linear-gradient(90deg,#fff6c9,#ffd24a_55%,transparent)] blur-[1px] [clip-path:polygon(0_50%,22%_22%,52%_42%,74%_14%,100%_50%,74%_86%,52%_58%,22%_78%)]"
        />
        {/* Embers drifting off the breath. */}
        <span className="loader-ember absolute top-[40%] left-[95%] h-1.5 w-1.5 rounded-full bg-[#ff9a2e]" />
        <span className="loader-ember-2 absolute top-[47%] left-[95%] h-1 w-1 rounded-full bg-[#ffd24a]" />
      </div>
    </div>
  );
}

