import "./About.css";

export default function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about__inner">
        <div className="about__photo-wrap" aria-hidden="true">
          <div className="about__photo-placeholder">
            <span>
              Placeholder image
              <br />
              Put an image of yourself here.
            </span>
          </div>
        </div>

        <div className="about__content">
          <h2 id="about-title" className="about__title">
            About the author
          </h2>
          <p className="about__text">
            Donte Morgan — from trades to tech. I craft accessible, responsive
            UIs with React, Router, and Vite. JS/HTML/CSS, Git/GitHub, REST;
            component-driven code.
          </p>
          <p className="about__text">
            At TripleTen I shipped projects like News Explorer—turning Figma
            designs into responsive apps with routing, state, APIs, and strong
            form UX. I practiced reviews/pairing and Git workflows, prioritized
            accessible semantic HTML, and built reliable ops tools for
            quoting/scheduling, job tracking, and automation.
          </p>
        </div>
      </div>
    </section>
  );
}
