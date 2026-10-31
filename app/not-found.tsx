import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head">
      <div className="eyebrow">404 / A loose thread</div>
      <h1>
        This page is
        <br />
        still unexplored.
      </h1>
      <p className="intro">The page you’re looking for could not be found.</p>
      <Link className="button" href="/">
        Back to the personal side <span>↗</span>
      </Link>
    </section>
  );
}
