# vaazee.net

Static site served from this repo via GitHub Pages at **vaazee.net**.

## Structure

```
index.html            Landing hub — links to Games and Pages
games/
  index.html          Games listing
  snake/              Classic Snake game
    index.html
    main.js           UI / game loop
    snake.js          Pure game logic (deterministic stepping)
    styles.css
pages/                "web by vaazee" — static pages sorted by topic
  index.html          Category listing
  music/ movies/ tv/ books/ chess/ coding/ tech/ piano/ random/
```

- The root page links to the **Games** page and to the **Pages** section
  (`pages/`, formerly the separate `web-by-vaazee` repo).
- Drop an HTML file into a `pages/<category>/` folder and it's live at
  `vaazee.net/pages/<category>/<file>.html`.
- `.nojekyll` disables Jekyll so files are served exactly as written.

## Run locally

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173>. Snake assets use relative paths, so it also
works from any subpath.

## Snake controls

Arrow keys or WASD to move, Space to pause, on-screen d-pad for touch.
