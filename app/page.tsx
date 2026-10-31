import type { Metadata } from "next";
import Link from "next/link";
import { TopicGrid } from "../components/TopicGrid";
import { NotebookEntries } from "../components/NotebookEntries";

export const metadata: Metadata = {
  title: { absolute: "Home — Jeremy Zoerman" },
};

export default function Page() {
  return (
    <>
      {" "}
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">THE PERSONAL SIDE / JEREMY ZOERMAN</div>
          <h1>
            Good questions.
            <br />
            <em>
              Interesting
              <br />
              possibilities.
            </em>
          </h1>
          <p className="intro">
            A personal space for the things that spark my curiosity. Software,
            sunlight, growing systems, a life of faith, and the occasional
            thought worth following.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/interests">
              Follow the curiosity <span>↗</span>
            </Link>
            <Link className="quiet-link" href="/musings">
              Open the notebook →
            </Link>
          </div>
          <div className="hero-status">
            <span className="dot"></span> ALWAYS A WORK IN PROGRESS
          </div>
        </div>
        <div className="art orbital">
          <div className="orbital-top">
            <span>JZ / EXPLORATIONS</span>
            <span>PERSONAL SYSTEMS — 01</span>
          </div>
          <img
            src="/orbit.svg"
            alt="Wireframe globe with intersecting orbits, representing connected interests"
          />
          <span className="orbit-tag tag-one">01 / SOFTWARE & AI</span>
          <span className="orbit-tag tag-two">02 / DIY SOLAR</span>
          <span className="orbit-tag tag-three">03 / HYDROPONICS</span>
          <span className="orbit-tag tag-four">04 / AQUASCAPES</span>
          <span className="orbit-tag tag-five">05 / FAITH &amp; GRACE</span>
          <div className="orbital-bottom">
            <span>+ IDEAS → POSSIBILITIES</span>
            <span>∞ / STILL EXPLORING</span>
          </div>
        </div>
      </section>
      <div className="strip">
        <span>A FEW CONNECTED INTERESTS</span>
        <span>CODE / ENERGY / GROWING / SMALL WORLDS / FAITH</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
      <section className="section" id="interests">
        <div className="section-title">
          <div>
            <div className="eyebrow">Following the threads</div>
            <h2>
              Different worlds.
              <br />
              Same curiosity.
            </h2>
          </div>
          <Link className="text-link" href="/interests">
            All interests ↗
          </Link>
        </div>
        <TopicGrid />
      </section>
      <section className="section journal">
        <div>
          <div className="eyebrow">The open notebook</div>
          <h2>A few musings.</h2>
          <p className="intro" style={{ fontSize: "14px" }}>
            Ideas in progress. Things noticed.
            <br />
            Questions worth sitting with.
          </p>
          <Link className="text-link" href="/musings">
            Browse the notebook ↗
          </Link>
        </div>
        <NotebookEntries />
      </section>
      <section className="about">
        <div>
          <div className="eyebrow">A bit of context</div>
          <h2>More than one kind of making.</h2>
          <p>
            This is my personal space for interests, experiments, and
            reflections. For the résumé, professional projects, and what I do
            for work, there’s a separate corner of the web.
          </p>
          <Link className="text-link" href="/elsewhere#professional">
            Find the professional side ↗
          </Link>
        </div>
        <span className="asterisk" aria-hidden="true">
          ↗
        </span>
      </section>{" "}
    </>
  );
}
