import Link from "next/link";
import { musings } from "../lib/content";
import { active } from "../lib/order";

export async function NotebookEntries() {
  return (
    <div>
      {(await musings())
        .filter((item) => active(item.card) && active(item.card.link))
        .map((item) => (
          <Link className="note" href={item.card.link.url} key={item.id}>
            <small>
              {item.card.category}
              <br />
              {item.card.status}
            </small>
            <div>
              <h3>{item.card.label}</h3>
              <p>{item.card.description}</p>
            </div>
            <span>↗</span>
          </Link>
        ))}
    </div>
  );
}
