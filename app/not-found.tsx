import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="display-2 mt-4">Page not found</h1>
      <p className="lede mt-4 max-w-xl">
        The page you are looking for does not exist or has moved.
      </p>
      <Link href="/" className="arrow-link mt-8">
        Back to home <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
