# News Explorer —

## About Project

Frontend This is a small, focused React app where you type a topic and get recent articles back. I built it to practice translating a Figma design into a clean, accessible UI without over-engineering the stack. The home page has a fixed-framing hero image (so it doesn’t “zoom” at different sizes), a search pill that floats just below the hero, and an “About the author” section that follows the spacing in the design. The layout responds at 1440, 768, and 320, and I paid attention to typography, spacing, and keyboard focus so it feels good to use, not just good to look at.

## Features

News Explorer lets you search for recent news by topic using NewsAPI (with your own API key) and presents results in a responsive layout that holds up across 1440, 768, and 320 breakpoints. The hero image keeps a consistent visual crop so it doesn’t “zoom” between sizes, while a floating search pill sits just below the hero without pushing the layout around. There’s an “About the author” section laid out to match the design’s spacing, and overall the UI pays attention to accessibility with clear typography, sensible spacing, and visible keyboard focus states. This repository is frontend-only, so the Saved Articles page is a UI shell to show the flow and visuals; and because scrollbars aren’t hidden globally, the footer remains reachable even on short viewports (like when DevTools is docked).

## Technologies Used

The app is built with React and Vite, uses React Router for client-side routing, and leans on plain CSS with custom properties, Flexbox/Grid, and media queries. Stable hero framing is achieved with the aspect-ratio property and a fixed background-position, and environment configuration is handled via Vite’s VITE\_\* variables (for example, VITE_NEWS_API_KEY). Article data is fetched directly from NewsAPI on the client using the Fetch API, keeping the stack simple and focused on the frontend.

## Links

- [Figma Design] https://www.figma.com/design/3ottwMEhlBt95Dbn8dw1NH/Your-Final-Project?node-id=22618-1974&t=LD5qgl8IPdjZafT9-0

- Deployed site: https://caramelthunder88.github.io/news-explorer/
- Frontend repository: https://github.com/caramelthunder88/news-explorer
