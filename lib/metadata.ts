import type { Metadata } from "next";

import { SITE } from "@/lib/site";

/**
 * Per-page metadata with matching Open Graph tags.
 *
 * The root layout supplies the site-wide defaults, but `og:title`, `og:description`
 * and `og:url` must describe the page being shared — otherwise every link posted
 * to social platforms renders as the homepage. `path` is the absolute route, so a
 * page only has to say where it lives.
 */
export function pageMetadata({
  path,
  title,
  description,
  image = "/images/pc-stations.jpg",
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const url = `${SITE.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.fullName,
      title: `${title} | ${SITE.name}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [image],
    },
  };
}
