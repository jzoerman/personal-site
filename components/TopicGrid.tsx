import Link from "next/link";
import { topics } from "../lib/content";
import { active } from "../lib/order";
import { ContentImageView } from "./Content";

export async function TopicGrid() {
  return (
    <div className="topics">
      {(await topics())
        .filter((item) => active(item.card) && active(item.card.link))
        .map((item) => (
          <Link className="topic" href={item.card.link.url} key={item.id}>
            <div className="topic-meta">
              <span>{item.card.category}</span>
              <span>↗</span>
            </div>
            {active(item.card.image) && (
              <div className="topic-art">
                <ContentImageView item={item.card.image} />
              </div>
            )}
            <h3>{item.card.label}</h3>
            <p>{item.card.description}</p>
          </Link>
        ))}
    </div>
  );
}
