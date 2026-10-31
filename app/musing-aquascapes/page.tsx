import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Making room for slow things" };

export default function Page() {
  return (
    <>
      {" "}
      <Link className="back" href="/musings">
        ← The notebook
      </Link>
      <section className="page-head">
        <div className="eyebrow">AQUASCAPES / SAMPLE NOTE</div>
        <h1>Making room for slow things.</h1>
        <p className="intro">
          A few thoughts on patience, planted tanks, and everyday rhythms.
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
        <Link className="text-link" href="/aquascapes">
          Explore this interest ↗
        </Link>
      </article>{" "}
    </>
  );
}
