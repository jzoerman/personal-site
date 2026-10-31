import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The interesting part is still the question",
};

export default function Page() {
  return (
    <>
      {" "}
      <Link className="back" href="/musings">
        ← The notebook
      </Link>
      <section className="page-head">
        <div className="eyebrow">AI & SOFTWARE / SAMPLE NOTE</div>
        <h1>The interesting part is still the question.</h1>
        <p className="intro">
          A reflection on curiosity, judgment, and building with new tools.
        </p>
      </section>
      <article className="article">
        <p className="notice">
          Sample editorial copy for this mockup, not a personal claim or
          published essay.
        </p>
        <p>
          There’s something compelling about an experiment with an uncertain
          outcome. You begin with a question, make a small change, and pay
          attention to what happens next.
        </p>
        <p>
          The most useful part may be the observation itself: noticing what you
          assumed, what surprised you, and what deserves a second look.
        </p>
        <h2>A question to carry forward</h2>
        <p>
          What would change if the next step were simply to look more closely?
        </p>
        <Link className="text-link" href="/ai">
          Explore this interest ↗
        </Link>
      </article>{" "}
    </>
  );
}
