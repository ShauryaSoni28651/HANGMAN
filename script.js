/* ================================================================
   HANGMAN — script.js
   Mirrors the C++ game logic from HangMan.cpp + WordList.h
   Word format: { word, tries, hint }  — matches words.csv columns
   ================================================================ */

'use strict';

// ────────────────────────────────────────────────────────────────
// DEFAULT WORD LIST  (loaded from words.csv at runtime if available)
// To add/edit words, modify words.csv — format: word,tries,hint
// ────────────────────────────────────────────────────────────────
const DEFAULT_WORDS = [
  { word: 'cat',          tries: 7, hint: 'a common household pet' },
  { word: 'map',          tries: 7, hint: 'used for navigation' },
  { word: 'drum',         tries: 7, hint: 'a percussion instrument' },
  { word: 'flame',        tries: 6, hint: 'produced by fire' },
  { word: 'grape',        tries: 6, hint: 'grows in clusters on a vine' },
  { word: 'account',      tries: 5, hint: 'used to store money in a bank' },
  { word: 'almost',       tries: 5, hint: 'not quite but very close' },
  { word: 'opinion',      tries: 5, hint: 'a personal point of view' },
  { word: 'distance',     tries: 5, hint: 'the space between two points' },
  { word: 'luggage',      tries: 5, hint: 'bags carried while travelling' },
  { word: 'secrets',      tries: 4, hint: 'things kept hidden from others' },
  { word: 'mystery',      tries: 4, hint: 'something unexplained or unknown' },
  { word: 'broccoli',     tries: 4, hint: 'a green vegetable often disliked by kids' },
  { word: 'spaghetti',    tries: 4, hint: 'a type of Italian pasta' },
  { word: 'beautiful',    tries: 4, hint: 'pleasing to the senses' },
  { word: 'rhythm',       tries: 3, hint: 'a pattern of beats in music' },
  { word: 'sphinx',       tries: 3, hint: 'a mythical creature with a human head' },
  { word: 'quartz',       tries: 3, hint: 'a hard crystalline mineral' },
  { word: 'fjord',        tries: 3, hint: 'a narrow inlet carved by a glacier' },
  { word: 'nymph',        tries: 3, hint: 'a nature spirit from mythology' },
  { word: 'ant',          tries: 7, hint: 'a tiny insect that lives in colonies' },
  { word: 'bag',          tries: 7, hint: 'used to carry things' },
  { word: 'cup',          tries: 7, hint: 'you drink from this' },
  { word: 'dog',          tries: 7, hint: 'a loyal domestic animal' },
  { word: 'egg',          tries: 7, hint: 'laid by a bird' },
  { word: 'fan',          tries: 7, hint: 'used to cool yourself' },
  { word: 'hat',          tries: 7, hint: 'worn on the head' },
  { word: 'ink',          tries: 7, hint: 'used in pens for writing' },
  { word: 'jam',          tries: 7, hint: 'a sweet fruit spread' },
  { word: 'kite',         tries: 7, hint: 'flown in the wind on a string' },
  { word: 'lamp',         tries: 7, hint: 'provides light in a room' },
  { word: 'mug',          tries: 7, hint: 'a large cup with a handle' },
  { word: 'net',          tries: 7, hint: 'a mesh used for catching things' },
  { word: 'owl',          tries: 7, hint: 'a nocturnal bird of prey' },
  { word: 'pen',          tries: 7, hint: 'a tool used for writing' },
  { word: 'rug',          tries: 7, hint: 'a floor covering' },
  { word: 'sun',          tries: 7, hint: 'the star at the center of our solar system' },
  { word: 'tap',          tries: 7, hint: 'controls the flow of water' },
  { word: 'van',          tries: 7, hint: 'a large vehicle for transporting goods' },
  { word: 'web',          tries: 7, hint: 'spun by a spider' },
  { word: 'axe',          tries: 7, hint: 'a tool for chopping wood' },
  { word: 'bee',          tries: 7, hint: 'an insect that makes honey' },
  { word: 'cob',          tries: 7, hint: 'the core of a corn plant' },
  { word: 'den',          tries: 7, hint: 'a cozy private room' },
  { word: 'elf',          tries: 7, hint: 'a small magical creature from folklore' },
  { word: 'fog',          tries: 7, hint: 'a thick mist close to the ground' },
  { word: 'gem',          tries: 7, hint: 'a precious stone' },
  { word: 'hop',          tries: 7, hint: 'to jump on one foot' },
  { word: 'ivy',          tries: 7, hint: 'a climbing plant that grows on walls' },
  { word: 'jaw',          tries: 7, hint: 'the lower part of the face' },
  { word: 'bench',        tries: 6, hint: 'a long seat for multiple people' },
  { word: 'brave',        tries: 6, hint: 'showing courage in the face of danger' },
  { word: 'cabin',        tries: 6, hint: 'a small wooden house in the woods' },
  { word: 'dairy',        tries: 6, hint: 'related to milk and its products' },
  { word: 'eagle',        tries: 6, hint: 'a large bird of prey with keen eyesight' },
  { word: 'fable',        tries: 6, hint: 'a short story with a moral lesson' },
  { word: 'giant',        tries: 6, hint: 'an unusually large person or creature' },
  { word: 'herbs',        tries: 6, hint: 'plants used in cooking or medicine' },
  { word: 'index',        tries: 6, hint: 'an alphabetical list at the back of a book' },
  { word: 'jewel',        tries: 6, hint: 'a precious gemstone' },
  { word: 'kneel',        tries: 6, hint: 'to rest on your knees' },
  { word: 'lemon',        tries: 6, hint: 'a sour yellow citrus fruit' },
  { word: 'melon',        tries: 6, hint: 'a large sweet juicy fruit' },
  { word: 'nurse',        tries: 6, hint: 'a healthcare professional' },
  { word: 'orbit',        tries: 6, hint: 'the curved path of a planet around a star' },
  { word: 'piano',        tries: 6, hint: 'a large musical keyboard instrument' },
  { word: 'queen',        tries: 6, hint: 'a female ruler of a kingdom' },
  { word: 'raven',        tries: 6, hint: 'a large black bird associated with mystery' },
  { word: 'sheep',        tries: 6, hint: 'a woolly animal farmed for its fleece' },
  { word: 'tiger',        tries: 6, hint: 'a large striped wild cat' },
  { word: 'uncle',        tries: 6, hint: 'the brother of your parent' },
  { word: 'valve',        tries: 6, hint: 'controls the flow of liquid or gas' },
  { word: 'wheat',        tries: 6, hint: 'a grain used to make flour and bread' },
  { word: 'xerox',        tries: 6, hint: 'a brand name used to mean photocopying' },
  { word: 'yacht',        tries: 6, hint: 'a recreational sailing boat' },
  { word: 'zebra',        tries: 6, hint: 'an African animal with black and white stripes' },
  { word: 'absorb',       tries: 5, hint: 'to take in or soak up' },
  { word: 'ballot',       tries: 5, hint: 'a method of secret voting' },
  { word: 'canopy',       tries: 5, hint: 'a covering that hangs overhead' },
  { word: 'debris',       tries: 5, hint: 'scattered fragments of wreckage' },
  { word: 'eleven',       tries: 5, hint: 'the number after ten' },
  { word: 'famine',       tries: 5, hint: 'a severe shortage of food' },
  { word: 'gossip',       tries: 5, hint: 'informal talk about other people' },
  { word: 'hamlet',       tries: 5, hint: 'a small settlement smaller than a village' },
  { word: 'ignite',       tries: 5, hint: 'to set something on fire' },
  { word: 'jungle',       tries: 5, hint: 'a dense tropical forest' },
  { word: 'kettle',       tries: 5, hint: 'used to boil water' },
  { word: 'locket',       tries: 5, hint: 'a small ornamental case worn on a chain' },
  { word: 'mellow',       tries: 5, hint: 'soft and smooth in tone or flavor' },
  { word: 'nickel',       tries: 5, hint: 'a silver-colored metallic element' },
  { word: 'oyster',       tries: 5, hint: 'a shellfish that can produce pearls' },
  { word: 'pastry',       tries: 5, hint: 'a dough used in baking pies and tarts' },
  { word: 'quiver',       tries: 5, hint: 'to shake slightly or a case for arrows' },
  { word: 'rustle',       tries: 5, hint: 'a soft crackling sound like leaves' },
  { word: 'saddle',       tries: 5, hint: 'a seat for a horse rider' },
  { word: 'temple',       tries: 5, hint: 'a place of worship' },
  { word: 'umbrella',     tries: 4, hint: 'carried in the rain for protection' },
  { word: 'arrange',      tries: 4, hint: 'to put things in a particular order' },
  { word: 'buffalo',      tries: 4, hint: 'a large heavy bovine animal' },
  { word: 'capsule',      tries: 4, hint: 'a small container or a space vehicle' },
  { word: 'dolphin',      tries: 4, hint: 'an intelligent marine mammal' },
  { word: 'eclipse',      tries: 4, hint: 'when one celestial body blocks another' },
  { word: 'fantasy',      tries: 4, hint: 'imaginative fiction involving magic' },
  { word: 'glucose',      tries: 4, hint: 'a simple sugar used for energy' },
  { word: 'harmony',      tries: 4, hint: 'a pleasing combination of musical notes' },
  { word: 'improve',      tries: 4, hint: 'to make something better' },
  { word: 'lantern',      tries: 4, hint: 'a portable light in a case' },
  { word: 'mustard',      tries: 4, hint: 'a yellow condiment made from seeds' },
  { word: 'nuclear',      tries: 4, hint: 'relating to the nucleus of an atom' },
  { word: 'penguin',      tries: 4, hint: 'a flightless bird native to Antarctica' },
  { word: 'quantum',      tries: 4, hint: 'the smallest discrete unit of energy' },
  { word: 'rooster',      tries: 4, hint: 'a male chicken' },
  { word: 'suspend',      tries: 4, hint: 'to hang from above or to pause temporarily' },
  { word: 'tycoon',       tries: 4, hint: 'a wealthy and powerful businessperson' },
  { word: 'walrus',       tries: 4, hint: 'a large marine mammal with tusks' },
  { word: 'xylophone',    tries: 3, hint: 'a musical instrument played with mallets' },
  { word: 'labyrinth',    tries: 3, hint: 'a complicated network of paths or tunnels' },
  { word: 'physician',    tries: 3, hint: 'a medical doctor' },
  { word: 'nostalgia',    tries: 3, hint: 'a sentimental longing for the past' },
  { word: 'microwave',    tries: 3, hint: 'an appliance that heats food with radiation' },
  { word: 'kaleidoscope', tries: 3, hint: 'a tube with mirrors creating colorful patterns' },
  { word: 'juxtapose',    tries: 3, hint: 'to place two things side by side for contrast' },
  { word: 'hypnosis',     tries: 3, hint: 'a trance-like state of focused attention' },
  { word: 'guerrilla',    tries: 3, hint: 'an irregular fighter using surprise tactics' },
  { word: 'flourish',     tries: 3, hint: 'to grow or develop in a healthy way' },
];

// ────────────────────────────────────────────────────────────────
// Body part IDs — order controls reveal sequence
// ────────────────────────────────────────────────────────────────
const BODY_PARTS = [
  'part-head',
  'part-torso',
  'part-arm-l',
  'part-arm-r',
  'part-leg-l',
  'part-leg-r',
];

// ────────────────────────────────────────────────────────────────
// Game State
// ────────────────────────────────────────────────────────────────
let words        = [...DEFAULT_WORDS]; // word pool (can be replaced via CSV)
let currentWord  = '';                 // the secret word
let currentHint  = '';                 // hint for current word
let maxWrong     = 6;                  // wrong tries allowed (from CSV column)
let guessedSet   = new Set();          // all letters guessed so far
let wrongGuesses = [];                 // only the wrong ones
let gameActive   = false;              // is a round in progress?

// ────────────────────────────────────────────────────────────────
// DOM References
// ────────────────────────────────────────────────────────────────
const dom = {
  wordDisplay:  document.getElementById('wordDisplay'),
  keyboard:     document.getElementById('keyboard'),
  hintText:     document.getElementById('hintText'),
  triesPips:    document.getElementById('triesPips'),
  wrongList:    document.getElementById('wrongList'),
  statusMsg:    document.getElementById('statusMsg'),
  modalOverlay: document.getElementById('modalOverlay'),
  modalIcon:    document.getElementById('modalIcon'),
  modalTitle:   document.getElementById('modalTitle'),
  modalDesc:    document.getElementById('modalDesc'),
  modalWord:    document.getElementById('modalWord'),
  modalPlayAgain: document.getElementById('modalPlayAgain'),
  newGameBtn:   document.getElementById('newGameBtn'),
  csvFileInput: document.getElementById('csvFileInput'),
  toastContainer: document.getElementById('toastContainer'),
};

// ────────────────────────────────────────────────────────────────
// Initialise on DOM ready
// ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildKeyboard();
  startNewGame();

  // Button listeners
  dom.newGameBtn.addEventListener('click', startNewGame);
  dom.modalPlayAgain.addEventListener('click', () => { hideModal(); startNewGame(); });
  dom.csvFileInput.addEventListener('change', handleCSVUpload);

  // Physical keyboard support
  document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    const ch = e.key.toLowerCase();
    if (/^[a-z]$/.test(ch)) handleGuess(ch);
  });

  // Try to load words.csv from the same folder (works when served via a web server)
  fetch('words.csv')
    .then(r => {
      if (!r.ok) throw new Error('Not found');
      return r.text();
    })
    .then(text => {
      const parsed = parseCSV(text);
      if (parsed.length > 0) {
        words = parsed;
        console.log(`[Hangman] Loaded ${words.length} words from words.csv`);
        // Restart so the newly loaded list is used
        startNewGame();
      }
    })
    .catch(() => {
      console.log('[Hangman] words.csv not auto-loaded — using built-in defaults. ' +
                  'Place words.csv next to index.html or use the "Load CSV" button.');
    });
});

// ────────────────────────────────────────────────────────────────
// Core Game Functions
// (Mirror the logic in HangMan.cpp: giveRandomWord, underscoreWord,
//  isInGuess, decrementWrongTries, ifCorrect)
// ────────────────────────────────────────────────────────────────

/** Pick a random entry and reset all state — equivalent to main() setup in C++ */
function startNewGame() {
  const entry    = words[Math.floor(Math.random() * words.length)];
  currentWord    = entry.word.toLowerCase().trim();
  currentHint    = entry.hint.trim();
  maxWrong       = entry.tries;
  guessedSet     = new Set();
  wrongGuesses   = [];
  gameActive     = true;

  clearBodyParts();
  renderHint();
  renderWordDisplay();
  renderTriesPips();
  renderWrongLetters();
  resetKeyboard();
  clearStatus();
  hideModal();
}

/**
 * Handle a letter guess.
 * Mirrors: isInGuess() → returns early if duplicate;
 *          ifCorrect()  → either reveals letters or calls decrementWrongTries().
 */
function handleGuess(letter) {
  if (!gameActive) return;

  // Already guessed? (mirrors isInGuess returning true → "try again")
  if (guessedSet.has(letter)) {
    showStatus(`'${letter.toUpperCase()}' already guessed — try another.`, 'wrong', 1500);
    return;
  }

  // Register the guess (mirrors: noOfTries += 1; guess.push_back(letter))
  guessedSet.add(letter);

  const correct = currentWord.includes(letter);

  if (correct) {
    // Mirrors: found = true, usWord[i] = letter
    setKeyState(letter, 'correct');
    showStatus(`✓  '${letter.toUpperCase()}' is in the word!`, 'correct');
  } else {
    // Mirrors: decrementWrongTries → noOfWrongTriesLeft -= 1; wrongTries.push_back(letter)
    wrongGuesses.push(letter);
    setKeyState(letter, 'wrong');
    showStatus(`✗  '${letter.toUpperCase()}' is not in the word.`, 'wrong');
    updateBodyParts();
    shakeWordDisplay();
  }

  renderWordDisplay();
  renderTriesPips();
  renderWrongLetters();
  checkGameOver();
}

/**
 * Win / lose check.
 * Mirrors the while-loop condition: (TriesLeft() > 0) && !(word == original)
 */
function checkGameOver() {
  const won  = [...currentWord].every(l => guessedSet.has(l));
  const lost = wrongGuesses.length >= maxWrong;

  if (won) {
    gameActive = false;
    setTimeout(() => showModal(true), 450);
  } else if (lost) {
    gameActive = false;
    // Reveal the death face last
    document.getElementById('part-face').classList.add('revealed');
    // Make sure all body parts are visible on loss
    BODY_PARTS.forEach(id => document.getElementById(id).classList.add('revealed'));
    setTimeout(() => showModal(false), 900);
  }
}

// ────────────────────────────────────────────────────────────────
// Rendering Helpers
// ────────────────────────────────────────────────────────────────

/** Render hint text */
function renderHint() {
  dom.hintText.textContent = currentHint;
}

/**
 * Render the word as blanks + revealed letters.
 * Mirrors: underscoreWord() producing '_' for unknown letters.
 */
function renderWordDisplay() {
  dom.wordDisplay.innerHTML = '';
  for (const letter of currentWord) {
    const tile = document.createElement('div');
    tile.className = 'letter-tile';

    if (guessedSet.has(letter)) {
      tile.classList.add('revealed');
      tile.textContent = letter.toUpperCase();
    }
    // Blank tile if not yet guessed (the underscore equivalent)
    dom.wordDisplay.appendChild(tile);
  }
}

/** Render the tries-left pips */
function renderTriesPips() {
  const left = maxWrong - wrongGuesses.length;
  dom.triesPips.innerHTML = '';

  for (let i = 0; i < maxWrong; i++) {
    const pip = document.createElement('div');
    pip.className = 'pip ' + (i < left ? 'pip-active' : 'pip-used');
    dom.triesPips.appendChild(pip);
  }
}

/** Render wrong-letters list (mirrors printWrongLetters()) */
function renderWrongLetters() {
  if (wrongGuesses.length === 0) {
    dom.wrongList.textContent = '—';
  } else {
    dom.wrongList.textContent = wrongGuesses.map(l => l.toUpperCase()).join('  ');
  }
}

// ────────────────────────────────────────────────────────────────
// Hangman SVG Body Parts
// ────────────────────────────────────────────────────────────────

/**
 * Reveal body parts proportionally.
 * e.g. word with 7 tries: wrong guesses spread across 6 body parts.
 * e.g. word with 3 tries: 2 parts appear per wrong guess.
 */
function updateBodyParts() {
  const partsToShow = Math.ceil((wrongGuesses.length / maxWrong) * BODY_PARTS.length);
  BODY_PARTS.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (idx < partsToShow) el.classList.add('revealed');
  });
}

/** Hide all body parts (used when starting a new game) */
function clearBodyParts() {
  BODY_PARTS.forEach(id => document.getElementById(id).classList.remove('revealed'));
  document.getElementById('part-face').classList.remove('revealed');
}

// ────────────────────────────────────────────────────────────────
// Keyboard
// ────────────────────────────────────────────────────────────────

/** Build the A–Z on-screen keyboard once */
function buildKeyboard() {
  dom.keyboard.innerHTML = '';
  for (let code = 65; code <= 90; code++) {
    const letter = String.fromCharCode(code).toLowerCase();
    const btn    = document.createElement('button');
    btn.className       = 'key-btn';
    btn.textContent     = letter.toUpperCase();
    btn.dataset.letter  = letter;
    btn.setAttribute('aria-label', `Guess letter ${letter.toUpperCase()}`);
    btn.addEventListener('click', () => handleGuess(letter));
    dom.keyboard.appendChild(btn);
  }
}

/** Reset all keyboard buttons to default state */
function resetKeyboard() {
  document.querySelectorAll('.key-btn').forEach(btn => {
    btn.className = 'key-btn';
    btn.disabled  = false;
  });
}

/** Mark a keyboard key as correct or wrong */
function setKeyState(letter, state) {
  const btn = dom.keyboard.querySelector(`[data-letter="${letter}"]`);
  if (!btn) return;
  btn.classList.add(state === 'correct' ? 'key-correct' : 'key-wrong');
  btn.disabled = true;
}

// ────────────────────────────────────────────────────────────────
// Status Message
// ────────────────────────────────────────────────────────────────
let _statusTimer = null;

function showStatus(msg, type = '', duration = 2500) {
  dom.statusMsg.textContent = msg;
  dom.statusMsg.className   = 'status-msg ' + type;

  clearTimeout(_statusTimer);
  _statusTimer = setTimeout(() => {
    dom.statusMsg.classList.add('fade');
    setTimeout(() => {
      dom.statusMsg.textContent = '';
      dom.statusMsg.className   = 'status-msg';
    }, 300);
  }, duration);
}

function clearStatus() {
  clearTimeout(_statusTimer);
  dom.statusMsg.textContent = '';
  dom.statusMsg.className   = 'status-msg';
}

// ────────────────────────────────────────────────────────────────
// Animations
// ────────────────────────────────────────────────────────────────

/** Shake the word display on a wrong guess */
function shakeWordDisplay() {
  dom.wordDisplay.classList.remove('shake');
  void dom.wordDisplay.offsetWidth; // force reflow to restart animation
  dom.wordDisplay.classList.add('shake');
}

// ────────────────────────────────────────────────────────────────
// Modal
// ────────────────────────────────────────────────────────────────

/**
 * Show the win/lose result modal.
 * @param {boolean} won  true = player won, false = player lost
 */
function showModal(won) {
  if (won) {
    dom.modalIcon.textContent  = '🎉';
    dom.modalTitle.textContent = 'You Won!';
    dom.modalDesc.textContent  =
      `Guessed "${currentWord.toUpperCase()}" in ${guessedSet.size} guess${guessedSet.size !== 1 ? 'es' : ''} ` +
      `with ${wrongGuesses.length} mistake${wrongGuesses.length !== 1 ? 's' : ''}.`;

    // All letters shown in gold
    dom.modalWord.innerHTML = [...currentWord]
      .map(l => `<span class="reveal-letter all-correct">${l.toUpperCase()}</span>`)
      .join('');
  } else {
    dom.modalIcon.textContent  = '💀';
    dom.modalTitle.textContent = 'Game Over';
    dom.modalDesc.textContent  = 'The word was:';

    // Green = player had guessed it, red = missed
    dom.modalWord.innerHTML = [...currentWord]
      .map(l => {
        const cls = guessedSet.has(l) ? 'guessed' : 'missed';
        return `<span class="reveal-letter ${cls}">${l.toUpperCase()}</span>`;
      })
      .join('');
  }

  dom.modalOverlay.classList.add('visible');
  dom.modalOverlay.setAttribute('aria-hidden', 'false');
  dom.modalPlayAgain.focus();
}

function hideModal() {
  dom.modalOverlay.classList.remove('visible');
  dom.modalOverlay.setAttribute('aria-hidden', 'true');
}

// Close modal on backdrop click
dom.modalOverlay.addEventListener('click', (e) => {
  if (e.target === dom.modalOverlay) { hideModal(); startNewGame(); }
});

// ────────────────────────────────────────────────────────────────
// CSV Parsing  (mirrors loadWordsFromFile() from WordList.h)
// Format: word,tries,hint
// ────────────────────────────────────────────────────────────────

/**
 * Parse CSV text into an array of { word, tries, hint } objects.
 * Skips header line and blank lines; handles hints that may contain commas.
 * @param {string} text  Raw CSV content
 * @returns {{ word: string, tries: number, hint: string }[]}
 */
function parseCSV(text) {
  const lines  = text.replace(/\r/g, '').split('\n');
  const result = [];

  // Start at index 1 to skip the header row (word,tries,hint)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const firstComma  = line.indexOf(',');
    const secondComma = line.indexOf(',', firstComma + 1);

    if (firstComma === -1 || secondComma === -1) continue; // malformed line

    const word  = line.substring(0, firstComma).trim().toLowerCase();
    const tries = parseInt(line.substring(firstComma + 1, secondComma).trim(), 10);
    const hint  = line.substring(secondComma + 1).trim();

    // Validate — mirrors the empty-check in WordList.h
    if (!word || isNaN(tries) || tries < 1 || !hint) continue;

    result.push({ word, tries, hint });
  }
  return result;
}

/** Handle the file-input "Load CSV" button */
function handleCSVUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const parsed = parseCSV(event.target.result);
    if (parsed.length > 0) {
      words = parsed;
      showToast(`✓ Loaded ${parsed.length} words from "${file.name}"`, 'success');
      startNewGame();
    } else {
      showToast(`⚠ No valid words found. Make sure the CSV follows: word,tries,hint`, 'error');
    }
  };
  reader.readAsText(file);

  // Reset so re-uploading the same file still fires 'change'
  e.target.value = '';
}

// ────────────────────────────────────────────────────────────────
// Toast Notifications
// ────────────────────────────────────────────────────────────────

/**
 * Show a brief, self-dismissing notification at the bottom of the screen.
 * @param {string} msg    Message text
 * @param {'info'|'success'|'error'} type  Visual style
 * @param {number} [duration=3500]  Auto-dismiss delay in ms
 */
function showToast(msg, type = 'info', duration = 3500) {
  const el = document.createElement('div');
  el.className   = `toast ${type}`;
  el.textContent = msg;
  dom.toastContainer.appendChild(el);

  // Trigger the show transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('show'));
  });

  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, duration);
}
