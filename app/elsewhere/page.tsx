import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Elsewhere" };

export default function Page() {
  return (
    <>
      {" "}
      <section className="page-head">
        <div className="eyebrow">Around the web</div>
        <h1>
          A few other
          <br />
          places to find me.
        </h1>
        <p className="intro">
          A home for the connections between my personal and professional
          worlds.
        </p>
      </section>
      <section className="article">
        <h2>Say hello</h2>
        <p>Contact and social links will live here.</p>
        <p className="notice">
          Placeholder · Email and social profiles have not been added yet.
        </p>
        <h2 id="professional">The professional side</h2>
        <p>
          A separate .dev site will focus on experience, case studies, technical
          writing, and professional projects.
        </p>
        <p className="notice">
          Coming later · The professional domain is a placeholder.
        </p>
        <Link className="button" href="/">
          Back to this little corner <span>↗</span>
        </Link>
      </section>{" "}
    </>
  );
}
