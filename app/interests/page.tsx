import type { Metadata } from "next";
import Link from "next/link";
import { TopicGrid } from "../../components/TopicGrid";

export const metadata: Metadata = { title: "Interests" };

export default function Page() {
  return (
    <>
      {" "}
      <section className="page-head">
        <div className="eyebrow">Five threads, plenty of possibilities</div>
        <h1>
          Things worth
          <br />
          getting curious about.
        </h1>
        <p className="intro">
          From new software tools to tiny living systems, with faith woven
          through everyday life. A collection of interests with plenty of room
          to evolve.
        </p>
      </section>
      <section className="section">
        <TopicGrid />
      </section>
      <p className="notice">
        Mockup: topic descriptions are placeholders; photography is
        illustrative.
      </p>{" "}
    </>
  );
}
