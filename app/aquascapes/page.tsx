import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Small worlds, underwater" };

export default function Page() {
  return (
    <>
      {" "}
      <Link className="back" href="/interests">
        ← All interests
      </Link>
      <section className="page-head">
        <div className="eyebrow">04 / LIVING SYSTEMS</div>
        <h1>Small worlds, underwater.</h1>
        <p className="intro">
          Exploring the balance of plants, water, light, and a little patience.
        </p>
      </section>
      <div className="topic-banner">
        <img
          src="/aquascapes-photo.jpg"
          alt="Green aquatic plants and roots inside a planted aquarium"
          loading="lazy"
          decoding="async"
        />
      </div>
      <article className="article">
        <p className="notice">
          Illustrative placeholder content for this personal website mockup.
        </p>
        <h2>A landscape at a different scale.</h2>
        <p>
          Finding a landscape inside a glass box. This space is an open notebook
          for questions, small experiments, and discoveries along the way.
        </p>
        <h2>On the curiosity list</h2>
        <p>
          How do plants and hardscape shape a sense of scale? What makes an
          underwater scene feel natural? How does a small world change as it
          matures?
        </p>
        <Link className="button" href="/musings">
          Visit the notebook <span>↗</span>
        </Link>
      </article>{" "}
    </>
  );
}
