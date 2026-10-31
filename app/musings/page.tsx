import type { Metadata } from "next";
import { NotebookEntries } from "../../components/NotebookEntries";

export const metadata: Metadata = { title: "Musings" };

export default function Page() {
  return (
    <>
      {" "}
      <section className="page-head">
        <div className="eyebrow">The open notebook</div>
        <h1>
          Thinking out loud.
          <br />
          Leaving room to change.
        </h1>
        <p className="intro">
          Reflections from the intersection of making, growing, and noticing.
        </p>
        <p className="notice">
          These sample notes demonstrate the layout. They are not Jeremy’s
          published writing.
        </p>
      </section>
      <section className="section">
        <NotebookEntries />
      </section>{" "}
    </>
  );
}
