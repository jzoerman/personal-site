import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "A little more sun-powered" };

export default function Page() {
  return (
    <>
      {" "}
      <Link className="back" href="/interests">
        ← All interests
      </Link>
      <section className="page-head">
        <div className="eyebrow">02 / ENERGY</div>
        <h1>A little more sun-powered.</h1>
        <p className="intro">
          An open notebook for DIY solar, small systems, and learning by making.
        </p>
      </section>
      <div className="topic-banner">
        <img
          src="/solar-photo.jpg"
          alt="Rows of blue solar panels beneath a cloud-filled sky"
          loading="lazy"
          decoding="async"
        />
      </div>
      <article className="article">
        <p className="notice">
          Illustrative placeholder content for this personal website mockup.
        </p>
        <h2>From sunlight to something useful.</h2>
        <p>
          Start small. Follow the sunlight. This space is an open notebook for
          questions, small experiments, and discoveries along the way.
        </p>
        <h2>On the curiosity list</h2>
        <p>
          What could a modest solar setup power? How can a system be easier to
          understand? What can be learned by measuring sunlight and energy over
          time?
        </p>
        <Link className="button" href="/musings">
          Visit the notebook <span>↗</span>
        </Link>
      </article>{" "}
    </>
  );
}
