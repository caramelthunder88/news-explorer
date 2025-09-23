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
            I’m Donte Morgan owner of a moving company with 14 years of
            steamfitting experience—transitioning into web development. I work
            with JavaScript, React, React Router, HTML5/CSS, responsive layout,
            accessibility, Git/GitHub, Vite, and consuming REST APIs. I build
            clean UIs with React hooks and component-driven architecture.
          </p>
          <p className="about__text">
            At TripleTen, I’ve completed hands-on projects like News Explorer,
            translating Figma specs into responsive layouts, wiring routing and
            state, integrating external APIs, and implementing form validation
            and error states. I’ve practiced code reviews, pair programming, and
            Git branching/PR workflows, with a focus on semantic HTML and
            accessibility. I enjoy turning real operations into simple web
            tools—scheduling/quoting, job tracking, and workflow automation
            delivering reliable, maintainable features.
          </p>
        </div>
      </div>
    </section>
  );
}
