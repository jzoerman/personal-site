import Link from "next/link";

export function TopicGrid() {
  return (
    <div className="topics">
      <Link className="topic" href="/ai">
        <div className="topic-meta">
          <span>01 / COMPUTING</span>
          <span>↗</span>
        </div>
        <div className="topic-art">
          <img
            src="/ai-photo.jpg"
            alt="Close-up of syntax-highlighted code on a computer screen"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3>Software in an AI era</h3>
        <p>
          Exploring how we build, think, and stay curious as software changes.
        </p>
      </Link>
      <Link className="topic" href="/solar">
        <div className="topic-meta">
          <span>02 / ENERGY</span>
          <span>↗</span>
        </div>
        <div className="topic-art">
          <img
            src="/solar-photo.jpg"
            alt="Rows of blue solar panels beneath a cloud-filled sky"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3>A little more sun-powered</h3>
        <p>
          An open notebook for DIY solar, small systems, and learning by making.
        </p>
      </Link>
      <Link className="topic" href="/hydroponics">
        <div className="topic-meta">
          <span>03 / GROWING</span>
          <span>↗</span>
        </div>
        <div className="topic-art">
          <img
            src="/hydroponics-photo.jpg"
            alt="Bright green lettuce growing in white hydroponic channels"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3>Roots, water, repeat</h3>
        <p>
          A space for hydroponic experiments and the quiet satisfaction of
          watching things grow.
        </p>
      </Link>
      <Link className="topic" href="/aquascapes">
        <div className="topic-meta">
          <span>04 / LIVING SYSTEMS</span>
          <span>↗</span>
        </div>
        <div className="topic-art">
          <img
            src="/aquascapes-photo.jpg"
            alt="Green aquatic plants and roots inside a planted aquarium"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3>Small worlds, underwater</h3>
        <p>
          Exploring the balance of plants, water, light, and a little patience.
        </p>
      </Link>
      <Link className="topic" href="/faith">
        <div className="topic-meta">
          <span>05 / FAITH &amp; GRACE</span>
          <span>↗</span>
        </div>
        <div className="topic-art">
          <img
            src="/faith-photo.jpg"
            alt="A potter’s hands gently shaping clay on a wheel"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3>Still on the Potter’s Wheel</h3>
        <p>A life of faith, still being shaped by grace.</p>
      </Link>
    </div>
  );
}
