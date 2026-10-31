import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Still on the Potter’s Wheel" };

export default function Page() {
  return (
    <>
      {" "}
      <Link className="back" href="/interests">
        ← All interests
      </Link>
      <section className="page-head">
        <div className="eyebrow">05 / FAITH &amp; GRACE</div>
        <h1>
          Still on the
          <br />
          Potter’s Wheel
        </h1>
        <p className="intro">A life of faith, still being shaped by grace.</p>
      </section>
      <div className="topic-banner">
        <img
          src="/faith-photo.jpg"
          alt="A potter’s hands gently shaping clay on a wheel"
          decoding="async"
        />
      </div>
      <article className="article">
        <h2>Still being shaped.</h2>
        <p>
          A space for reflections on faith, grace, and the ongoing work of
          becoming.
        </p>
        <p className="notice">
          Personal reflections will be added here. This page is a placeholder
          for the mockup.
        </p>
        <Link className="button" href="/musings">
          Visit the notebook <span>↗</span>
        </Link>
      </article>{" "}
    </>
  );
}
