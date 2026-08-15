---
name: add-raga
description: Add a new raga to the interactive Carnatic piano page. Use when the user asks to add support for a raga (e.g. "add the Pantuvarali raga to the carnatic music webpage").
---

# Add a Raga

Add a new raga entry to the interactive Carnatic piano webpage so its scale lights up, its
gamaka swaras are marked, and its popular compositions are listed.

## Arguments

$ARGUMENTS

The argument is the raga name (e.g. `Pantuvarali`). If none is given, ask which raga to add.

## Target file

`pages/random/carnatic-piano-2026-06-08.html`

Everything is driven by a single JavaScript array, `const RAGAS=[ … ]` (search for
`/* ---------- Ragas:`). Adding one object to that array wires up the dropdown, the
key-lighting, arohana/avarohana, the gamaka ∿ markings, the note, and the compositions list —
**no other edits are needed.** The dropdown is populated by `RAGAS.forEach(...)` and the
scale is derived by `autoScale()` when no explicit `aro`/`avaro` is supplied.

## Sarali Varisai feature (automatic)

The page also has a **Sarali Varisai** player (a selector + Play button) that runs the seven
graded beginner exercises *in the currently selected raga*, plus a readout line showing the
exact swara sequence. This is driven off the raga's `map` — you do **not** write any
Sarali data per raga. Two things to know when adding a raga:

- **Sampoorna ragas** (whose `map` contains all seven swaras — one each of S, R, G, M, P, D, N)
  get the Sarali Varisai player automatically. `isSampoorna()` derives this by reading the
  first letter of each `map` value, so the swaras just need to be present in `map` (a vakra
  `aro`/`avaro` does not matter).
- **Ragas missing a swara** — pentatonic (audava) ragas like Mohanam, Hindolam, Madhyamavati,
  or any raga whose `map` lacks one of the seven letters — automatically **disable** the Sarali
  controls (greyed out, with an explanatory tooltip/readout). This is expected behaviour, not a
  bug: the exercises reference all seven swaras and are undefined otherwise. No action needed.

So no extra work is required, but if you're adding a pentatonic or otherwise gapped scale, don't
be surprised that its Sarali controls are disabled.

## The 12 swarasthanas → semitone offsets

The `map` uses semitone offset from Sa (0–11) as the key and the displayed swara symbol as the
value. Use the correct symbol for the position — a raga never uses both names of a dual-name
position.

| pos | symbol(s)       | name |
|-----|-----------------|------|
| 0   | S               | Shadjam |
| 1   | R₁              | Shuddha Rishabham |
| 2   | R₂ / G₁         | Chatushruti Ri / Shuddha Ga |
| 3   | R₃ / G₂         | Shatshruti Ri / Sadharana Ga |
| 4   | G₃              | Antara Gandharam |
| 5   | M₁              | Shuddha Madhyamam |
| 6   | M₂              | Prati Madhyamam |
| 7   | P               | Panchamam |
| 8   | D₁              | Shuddha Dhaivatam |
| 9   | D₂ / N₁         | Chatushruti Da / Shuddha Ni |
| 10  | D₃ / N₂         | Shatshruti Da / Kaisiki Ni |
| 11  | N₃              | Kakali Nishadam |

Copy the subscript digits exactly (₁₂₃) and use the curly quotes `“ ” ’` already used in the
file — do not introduce ASCII quotes.

## The entry shape

```js
{id:'shortid', name:'Displayname (melakarta# · descriptor)', map:{0:'S',1:'R₁',4:'G₃',6:'M₂',7:'P',8:'D₁',11:'N₃'},
  gamaka:{1:'R₁ — kampita, hugging S',8:'D₁ — heavy kampita (its emotional pivot)'},
  gnote:'One or two sentences: what makes the raga distinctive — its mood, its signature phrases, which swaras carry gamakas, and what a fixed-pitch keyboard can and cannot capture.',
  comps:['“Composition” — Composer','“Composition” — Composer','“Composition” — Composer']},
```

Field rules:
- **`id`** — short lowercase, unique across the array.
- **`name`** — human label shown in the dropdown. Convention: `Name (melakarta-number · short descriptor)`, e.g. `Pantuvarali (51 · Kasiramakriya · prati-Ma Mayamalavagowla)`. For a janya, note its parent: `Name (janya of Parent · parent# · descriptor)`.
- **`map`** — the swaras of the raga, offset → symbol. Sampoorna (7-note symmetric) ragas need only `map`.
- **`aro` / `avaro`** (optional) — arrays of semitone offsets (ending in 12 for the upper Sa) **only** when the ascent/descent is asymmetric, vakra (zig-zag), or omits notes. Look at `kambhoji`, `darbari`, `begada`, `kadana` for examples. Omit both for a plain symmetric scale.
- **`gamaka`** (optional but expected) — offset → short description of the oscillation on that swara (`kampita`, `andolana`, `nokku`, `jaru`, `jaaru`). These get the wavy ∿ glyph. Only mark swaras that genuinely carry a defining gamaka.
- **`gnote`** — the prose note. May contain `<b>…</b>`. Match the tone of the existing notes: specific, musical, and honest about what the keyboard can't bend.
- **`comps`** — 2–4 well-attributed popular compositions, `“Title” — Composer`. Verify the composition is actually in this raga (beware near-namesakes, e.g. Pantuvarali vs Shubhapantuvarali).

## Always include the parent melakarta

If the raga you are adding is a **janya** (derived — including pentatonic/audava ragas like
Mohanam, Hindolam, Madhyamavati), check whether its **parent melakarta** is already in the
`RAGAS` array. **If the parent is not present, add it too**, in the same edit, as its own
sampoorna entry (following the shape above). Every janya on the page should have its janaka
melakarta selectable as well.

- Identify the parent from the janya's melakarta number (e.g. Kambhoji, Mohanam, Desh and
  Kedaragowla are all janyas of **Harikambhoji, 28**; Darbari and Hindolam are janyas of
  **Natabhairavi, 20**).
- Search the array for that melakarta (by name or number) before assuming it is missing.
- A parent added this way is a full 7-swara melakarta, so it needs only `map` (no `aro`/`avaro`)
  and it will get the Sarali Varisai player automatically.
- If the user names only the janya, still add the missing parent — but mention that you did.

## Placement & the dropdown grouping

The dropdown is **built dynamically**, grouped into `<optgroup>`s by parent melakarta and sorted
alphabetically within each group (see `buildRagaSelect` in the script). So the raga's **position
in the `RAGAS` array no longer controls where it shows up** — grouping is derived at build time.

What drives the grouping is the **melakarta number in the `name`**:

- Every entry's group is the first integer found in its `name`. For a melakarta that is its own
  number (`Shankarabharanam (29 · …)`); for a janya it is the parent number
  (`Kambhoji (janya of Harikambhoji · 28 · …)`). **The number must be present in the name** —
  this is load-bearing, so never write a raga name without its melakarta number.
- An entry is treated as the **melakarta heading** for its group if its `name` does *not* contain
  the word "janya". Keep melakarta names free of "janya" and janya names containing it.
- The `chromatic` entry (and anything with no number) falls into a trailing **"Other"** group.

So you don't need to place the object at a particular index. Still, for a readable source file,
keep melakartas near the top and add a janya among similar ragas; and end each entry with a comma.
A parent melakarta added alongside a janya just needs the right name — it will group itself.

## Procedure

1. Research the raga if unsure: its melakarta number (or parent for a janya), exact swaras,
   arohana/avarohana, characteristic gamakas, and 2–4 popular compositions.
2. Read the `RAGAS` array to see the current entries and pick the insertion point.
3. If the raga is a janya, check whether its **parent melakarta** is already in the array; if
   not, add the parent too (see "Always include the parent melakarta").
4. Insert the entry (or entries) following the shape above. Do not touch any other code.
5. Verify: `node -e` parse-check the `<script>` blocks compile and the new `id` is present
   (see the pattern already used in the repo), or open the file in the browser and select the
   raga from the dropdown.
6. Once the parse-check passes, **always commit and push** — no need to ask. Commit directly to
   `main` (that is this repo's convention for raga additions; do not open a branch or PR), staging
   only the page file, with the message `Add <Raga> raga to Carnatic piano page`. If a parent
   melakarta was added in the same edit, name both: `Add <Janya> and <Parent> ragas to Carnatic
   piano page`. Then `git push`. Do not commit if the parse-check failed — fix it first.

## Verify script still parses

```sh
node -e '
const fs=require("fs");
const html=fs.readFileSync("pages/random/carnatic-piano-2026-06-08.html","utf8");
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
let ok=true;
scripts.forEach((s,i)=>{try{new Function(s);}catch(e){ok=false;console.log("block "+i+":",e.message);}});
console.log("all parse:",ok);
'
```
