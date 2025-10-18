import { useEffect, useRef, useState } from "react";
import Letter from "./components/Letter";
import "./App.css";

function App() {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const lang = [
    "HTML",
    "CSS",
    "Javascript",
    "React",
    "Typscript",
    "Node.js",
    "Python",
    "Ruby",
    "Assembly",
  ];
  const words = [
    "apple",
    "banana",
    "orange",
    "grape",
    "mango",
    "cherry",
    "peach",
    "pear",
    "plum",
    "kiwi",
    "melon",
    "lemon",
    "lime",
    "apricot",
    "blueberry",
    "blackberry",
    "raspberry",
    "strawberry",
    "coconut",
    "pineapple",
    "river",
    "mountain",
    "forest",
    "valley",
    "desert",
    "ocean",
    "island",
    "lake",
    "stream",
    "canyon",
    "dream",
    "shadow",
    "light",
    "storm",
    "rain",
    "cloud",
    "sun",
    "moon",
    "star",
    "sky",
    "flame",
    "stone",
    "wind",
    "snow",
    "fire",
    "ice",
    "leaf",
    "tree",
    "flower",
    "grass",
    "book",
    "pen",
    "paper",
    "music",
    "song",
    "poem",
    "story",
    "voice",
    "sound",
    "melody",
    "heart",
    "soul",
    "mind",
    "hope",
    "fear",
    "love",
    "peace",
    "truth",
    "faith",
    "grace",
    "city",
    "village",
    "castle",
    "bridge",
    "tower",
    "road",
    "street",
    "garden",
    "window",
    "door",
    "night",
    "morning",
    "evening",
    "day",
    "time",
    "moment",
    "memory",
    "future",
    "past",
    "present",
    "human",
    "child",
    "man",
    "woman",
    "friend",
    "stranger",
    "king",
    "queen",
    "warrior",
    "hero",
    "dreamer",
    "hunter",
    "traveler",
    "artist",
    "thinker",
    "builder",
    "writer",
    "singer",
    "dancer",
    "teacher",
    "earth",
    "water",
    "air",
    "fire",
    "metal",
    "stone",
    "wood",
    "sand",
    "dust",
    "clay",
    "freedom",
    "power",
    "justice",
    "honor",
    "wisdom",
    "courage",
    "strength",
    "destiny",
    "vision",
    "victory",
    "circle",
    "square",
    "triangle",
    "line",
    "shape",
    "color",
    "pattern",
    "texture",
    "motion",
    "energy",
  ];

  const [keyboard, setKeyBoard] = useState(() => generateNewKeyboard());
  const [languages, setLanguages] = useState(() => generateLanguages());
  const [word, setword] = useState(() => generateRandomWord());
  const ref = useRef(null);
  

  let win = false;
  let lose = false;
  let count = 0;
  if (word.every((letter) => letter.isShown)) {
    win = true;
  }
  languages.forEach(lang => {
    if(lang.isDead) return count++
  });
  if(count === 8){
    lose = true;
  }

  useEffect(() => {
    if (win || lose) {
      ref.current.focus();
    }
  }, [win,lose]);

  function generateNewKeyboard() {
    return letters.map((letter, index) => ({
      id: index,
      value: letter,
      isCorrect: null,
    }));
  }
  function generateLanguages() {
    const colors = [
      "#FF0000", // red
      "#FFA500", // orange
      "#FFFF00", // yellow
      "#008000", // green
      "#0000FF", // blue
      "#4B0082", // indigo
      "#EE82EE", // violet
      "#FFC0CB", // pink
      "#008080", // teal
    ];
    return lang.map((lang, index) => ({
      id: index + 26,
      color: colors[index],
      lang,
      isDead: false,
    }));
  }
  function generateRandomWord() {
    return [...words[Math.floor(Math.random() * words.length)]].map(
      (letter, index) => ({ id: index + 100, letter, isShown: false })
    );
  }

  function clickKeyBoard(id) {
    let arrword = [];
    let newkey = [];
    let indexoftheclickedkey;
    let correct = false;

    keyboard.map((key, index) => {
      if (key.id === id) {
        indexoftheclickedkey = index;
        let count = 0;
        for (const letter of word) {
          if (letter.letter === key.value) {
            newkey.push({ ...key, isCorrect: true });
            break;
          } else if (letter.letter !== key.value) {
            ++count;
            if (count === word.length) {
              newkey.push({ ...key, isCorrect: false });
            }
          }
        }
      } else {
        newkey.push({ ...key });
      }
    });

    word.map((letter) => {
      if (keyboard[indexoftheclickedkey].value === letter.letter) {
        arrword.push({ ...letter, isShown: true });
        correct = true;
      } else {
        arrword.push({ ...letter });
      }
    });
    setLanguages((prev) => {
      let countlang = 0;
      return prev.map((lang) => {
        if (!correct && !lang.isDead && countlang === 0) {
          countlang++;

          return { ...lang, isDead: true };
        } else {
          return { ...lang };
        }
      });
    });

    setKeyBoard((prev) => [...newkey]);
    setword((prev) => [...arrword]);
  }

  function restart() {
    setword(generateRandomWord());
    setLanguages(generateLanguages);
    setKeyBoard(generateNewKeyboard());
  }
  const onlydeadlanguage = languages
    .filter((lang) => lang.isDead)
    .map((e) => e.lang);
  const deadlanguage =
    onlydeadlanguage.length > 0 ? onlydeadlanguage[onlydeadlanguage.length - 1] : "";

  return (
    <main>
      <div className="container">
        <div className="text">
          <h3>Assembly: Endgame</h3>
          <p>
            Guess the word in under 8 attempts to keep the programming world
            safe from Assembly!
          </p>
          {win ? (
            <div className={`notice`} style={{ backgroundColor: "green" }}>
              Congratulations!
            </div>
          ) : lose ? (
            <div className={`notice`} style={{ backgroundColor: "red" }}>
              Sorry you Lose! Better to start learning Assembly
            </div>
          ) : (
            <div className={`notice ${!deadlanguage ? "nonotice" : ""}`}>
              {deadlanguage} are Dead
            </div>
          )}
        </div>
        <div className="eleminations">
          {languages.map((lang) => (
            <span
              style={{ backgroundColor: lang.color }}
              className={`${lang.isDead ? "isdead" : ""}`}
              key={lang.id}
            >
              {lang.lang}
            </span>
          ))}
        </div>
        <div className="word-container">
          {word.map((word) => (
            <div key={word.id} className={`letter`}>
              {lose ? (
                <span className={word.isShown ? "text-white" : "text-red"}>
                  {word.letter}
                </span>
              ) : word.isShown ? (
                <span className="text-white">{word.letter}</span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="keyboard">
          {keyboard.map((letter) => (
            <Letter
              endgame={win || lose}
              handleClick={() => clickKeyBoard(letter.id)}
              isCorrect={letter.isCorrect}
              key={letter.id}
              letter={letter.value}
            />
          ))}
        </div>
        {win | lose ? (
          <button className="endgame-btn" ref={ref} onClick={restart}>
            {win ? "New Game" : lose ? "give it another try" : null}
          </button>
        ) : null}
      </div>
    </main>
  );
}

export default App;
