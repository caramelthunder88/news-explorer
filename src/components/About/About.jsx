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
            At TripleTen I shipped projects like News Explorer—translating Figma
            to responsive UIs with routing, state, APIs, and solid form UX.
            Practiced code reviews, pair programming, and Git branching/PRs;
            prioritized semantic HTML and accessibility. I like building
            real-world ops tools—scheduling/quoting, job tracking, and workflow
            automation that’s reliable and maintainable
          </p>
        </div>
      </div>
    </section>
  );
}
