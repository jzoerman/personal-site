import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Roots, water, repeat" };

export default function Page() {
  return (
    <>
      {" "}
      <Link className="back" href="/interests">
        ← All interests
      </Link>
      <section className="page-head">
        <div className="eyebrow">03 / GROWING</div>
        <h1>Roots, water, repeat.</h1>
        <p className="intro">
          A space for hydroponic experiments and the quiet satisfaction of
          watching things grow.
        </p>
      </section>
      <div className="topic-banner">
        <img
          src="/hydroponics-photo.jpg"
          alt="Bright green lettuce growing in white hydroponic channels"
          loading="lazy"
          decoding="async"
        />
      </div>
      <article className="article">
        <p className="notice">
          Illustrative placeholder content for this personal website mockup.
        </p>
        <h2>Growing things. Learning things.</h2>
        <p>
          A tiny garden with a lot to teach. This space is an open notebook for
          questions, small experiments, and discoveries along the way.
        </p>
        <h2>On the curiosity list</h2>
        <p>
          How do light, water, and nutrients shape a growing system? What
          changes when you observe a plant closely? Where is the balance between
          tinkering and letting things grow?
        </p>
        <Link className="button" href="/musings">
          Visit the notebook <span>↗</span>
        </Link>
      </article>{" "}
    </>
  );
}
