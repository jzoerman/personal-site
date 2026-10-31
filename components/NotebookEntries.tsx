import Link from "next/link";

export function NotebookEntries() {
  return (
    <div>
      <Link className="note" href="/musing-ai">
        <small>
          AI & SOFTWARE
          <br />
          SAMPLE NOTE
        </small>
        <div>
          <h3>The interesting part is still the question</h3>
          <p>
            A reflection on curiosity, judgment, and building with new tools.
          </p>
        </div>
        <span>↗</span>
      </Link>
      <Link className="note" href="/musing-hydroponics">
        <small>
          GROWING
          <br />
          SAMPLE NOTE
        </small>
        <div>
          <h3>A little less control, a little more observation</h3>
          <p>
            What a small growing system might teach us about paying attention.
          </p>
        </div>
        <span>↗</span>
      </Link>
      <Link className="note" href="/musing-aquascapes">
        <small>
          AQUASCAPES
          <br />
          SAMPLE NOTE
        </small>
        <div>
          <h3>Making room for slow things</h3>
          <p>
            A few thoughts on patience, planted tanks, and everyday rhythms.
          </p>
        </div>
        <span>↗</span>
      </Link>
    </div>
  );
}
