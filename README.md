# vaazee.net

Static site served from this repo via GitHub Pages at **vaazee.net**.

## Structure

```
index.html            Landing hub — links to Games and web-by-vaazee
games/
  index.html          Games listing
  snake/              Classic Snake game
    index.html
    main.js           UI / game loop
    snake.js          Pure game logic (deterministic stepping)
    styles.css
```

- The root page links to the **Games** page and to
  [web by vaazee](https://vaazee.github.io/web-by-vaazee/) (separate repo).
- `.nojekyll` disables Jekyll so files are served exactly as written.

## Run locally

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173>. Snake assets use relative paths, so it also
works from any subpath.

## Snake controls

Arrow keys or WASD to move, Space to pause, on-screen d-pad for touch.
