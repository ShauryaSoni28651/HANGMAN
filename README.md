# 🪢 Hangman

A classic Hangman game built as a modern web app — originally written in C++, converted to a fully responsive HTML/CSS/JS website.

Live at: `https://shauryasoni28651.github.io/hangman`

---

## How to Play

1. A random word is chosen with a hint shown at the top
2. Guess letters using the on-screen keyboard or your physical keyboard
3. Each wrong guess reveals a part of the hangman figure
4. **Win** by guessing the word before the figure is complete
5. **Lose** if you run out of wrong tries

---

## Adding Words

All words live in `words.csv`. Each row follows this format:

```
word,tries,hint
```

| Column  | Description                                      |
|---------|--------------------------------------------------|
| `word`  | The word to guess (lowercase)                    |
| `tries` | Number of wrong guesses allowed (e.g. 3–7)       |
| `hint`  | A one-line clue shown to the player              |

**Example rows:**
```csv
galaxy,5,a system of millions of stars
cactus,6,a plant that thrives in the desert
rhythm,3,a pattern of beats in music
```

> **Tip:** Harder/longer words should get fewer tries. Short common words can have 6–7.

To add words, edit `words.csv` directly on GitHub — click the file, hit the pencil icon, add your rows, and commit. The site updates in ~30 seconds.
Users can also add their own words using `Load CSV` option. This uses their words instead of the default ones.

---

## File Structure

```
hangman/
├── index.html      — Game layout and structure
├── styles.css      — All styling and responsive design
├── script.js       — Game logic (ported from C++)
└── words.csv       — Word list (edit this to add words)
```

---

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks, no dependencies
- Responsive across desktop, tablet, and mobile
- Words loaded dynamically from `words.csv` at runtime

---

## Original Source

This project was originally written in C++ (`HangMan.cpp` + `WordList.h`) as a terminal game. The web version preserves all the original logic including random word selection, duplicate guess detection, proportional hangman reveal, and win/loss conditions.
