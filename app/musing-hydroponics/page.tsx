import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A little less control, a little more observation",
};

export default function Page() {
  return (
    <>
      {" "}
      <Link className="back" href="/musings">
        ← The notebook
      </Link>
      <section className="page-head">
        <div className="eyebrow">GROWING / SAMPLE NOTE</div>
        <h1>A little less control, a little more observation.</h1>
        <p className="intro">
          What a small growing system might teach us about paying attention.
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
        <Link className="text-link" href="/hydroponics">
          Explore this interest ↗
        </Link>
      </article>{" "}
    </>
  );
}
