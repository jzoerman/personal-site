import { Fragment } from "react";
import { active, ordered } from "../lib/order";
import type { HomeSection as Section } from "../lib/models";
import { TextLines, ContentLinkView, ContentImageView } from "./Content";
import { TopicGrid } from "./TopicGrid";
import { NotebookEntries } from "./NotebookEntries";

export function HomeSection({ content: s }: { content: Section }) {
  if (!active(s)) return null;
  switch (s.id) {
    case "hero": {
      const lines = ordered(s.headingLines);
      const tagClasses = [
        "tag-one",
        "tag-two",
        "tag-three",
        "tag-four",
        "tag-five",
      ];
      return (
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">{s.eyebrow}</div>
            <h1>
              {lines[0]?.text}
              {lines.length > 1 && (
                <>
                  <br />
                  <em>
                    {lines.slice(1).map((line, index) => (
                      <Fragment key={index}>
                        {index > 0 && <br />}
                        {line.text}
                      </Fragment>
                    ))}
                  </em>
                </>
              )}
            </h1>
            <p className="intro">{s.intro}</p>
            <div className="hero-actions">
              <ContentLinkView item={s.primaryLink} className="button" />
              <ContentLinkView item={s.secondaryLink} className="quiet-link" />
            </div>
            <div className="hero-status">
              <span className="dot" /> {s.status}
            </div>
          </div>
          {active(s.orbital) && (
            <div className="art orbital">
              <div className="orbital-top">
                {ordered(s.orbital.topLabels).map((item, i) => (
                  <span key={i}>{item.text}</span>
                ))}
              </div>
              <ContentImageView item={s.orbital.image} lazy={false} />
              {ordered(s.orbital.children).map((item, i) => (
                <span
                  className={`orbit-tag ${tagClasses[i] || "tag-five"}`}
                  key={i}
                >
                  {item.text}
                </span>
              ))}
              <div className="orbital-bottom">
                {ordered(s.orbital.bottomLabels).map((item, i) => (
                  <span key={i}>{item.text}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      );
    }
    case "topic-strip":
      return (
        <div className="strip">
          {ordered(s.children).map((item, i) => (
            <span key={i}>{item.text}</span>
          ))}
        </div>
      );
    case "interests":
      return (
        <section className="section" id="interests">
          <div className="section-title">
            <div>
              <div className="eyebrow">{s.eyebrow}</div>
              <h2>
                <TextLines items={s.headingLines} />
              </h2>
            </div>
            <ContentLinkView item={s.link} />
          </div>
          <TopicGrid />
        </section>
      );
    case "notebook":
      return (
        <section className="section journal">
          <div>
            <div className="eyebrow">{s.eyebrow}</div>
            <h2>{s.heading}</h2>
            <p
              className="intro"
              style={{ fontSize: "14px", whiteSpace: "pre-line" }}
            >
              {s.intro}
            </p>
            <ContentLinkView item={s.link} />
          </div>
          <NotebookEntries />
        </section>
      );
    case "about":
      return (
        <section className="about">
          <div>
            <div className="eyebrow">{s.eyebrow}</div>
            <h2>{s.heading}</h2>
            <p>{s.text}</p>
            <ContentLinkView item={s.link} />
          </div>
          <span className="asterisk" aria-hidden="true">
            ↗
          </span>
        </section>
      );
  }
}
