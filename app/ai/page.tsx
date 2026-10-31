import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Software in an AI era" };

export default function Page() {
  return (
    <>
      {" "}
      <Link className="back" href="/interests">
        ← All interests
      </Link>
      <section className="page-head">
        <div className="eyebrow">01 / COMPUTING</div>
        <h1>Software in an AI era.</h1>
        <p className="intro">
          Exploring how we build, think, and stay curious as software changes.
        </p>
      </section>
      <div className="topic-banner">
        <img
          src="/ai-photo.jpg"
          alt="Close-up of syntax-highlighted code on a computer screen"
          loading="lazy"
          decoding="async"
        />
      </div>
      <article className="article">
        <p className="notice">
          Illustrative placeholder content for this personal website mockup.
        </p>
        <h2>New tools. Better questions.</h2>
        <p>
          What stays human when the tools get smarter? This space is an open
          notebook for questions, small experiments, and discoveries along the
          way.
        </p>
        <h2>On the curiosity list</h2>
        <p>
          How do AI tools change the way we learn and build? Where does human
          judgment matter most? What makes the process of creating software
          satisfying?
        </p>
        <Link className="button" href="/musings">
          Visit the notebook <span>↗</span>
        </Link>
      </article>{" "}
    </>
  );
}
