// Define the time limit
let TIME_LIMIT = 90;

// Initialize an empty quotes array
let quotes_array = [];

// Selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];

  // Separate each character and make an element
  // out of each of them to individually style them
  current_quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  });

  // Roll over to the first quote
  if (quoteNo < quotes_array.length - 1) quoteNo++;
  else quoteNo = 0;
}

function processCurrentText() {
  // Get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split("");

  // Increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];

    // Character not currently typed
    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      // Increment number of errors
      errors++;
    }
  });

  // Display the number of errors
  error_text.textContent = total_errors + errors;

  // Update accuracy text
  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy_text.textContent = Math.round(accuracyVal);

  // If current text is completely typed
  // Irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // Update total errors
    total_errors += errors;

    // Clear the input area
    input_area.value = "";
  }
}

function startGame() {
  resetValues();
  updateQuote();

  // Clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = "Click on the area below to start the game.";
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + "s";
  error_text.textContent = 0;
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}

input_area.addEventListener("keydown", function (event) {
  var keyCode = event.keyCode || event.which;
  if (keyCode === 8 || keyCode === 46) {
    event.preventDefault();
  }
});

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    timer_text.textContent = timeLeft + "s";
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  input_area.disabled = true;
  quote_text.textContent = "Enjoy your 🏃‍♂️ heist 💰 at KRANTI 🕵🏼‍♂️";
  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
  class Progress {
    constructor(param = {}) {
      this.timestamp        = null;
      this.duration         = param.duration || Progress.CONST.DURATION;
      this.progress         = 0;
      this.delta            = 0;
      this.isLoop           = !!param.isLoop;
    
      this.reset();
    }
    
    static get CONST() {
      return {
      DURATION : 1000
      };
    }
    
    reset() {
      this.timestamp = null;
    }
    
    start(now) {
      this.timestamp = now;
    }
    
    tick(now) {
      if (this.timestamp) {
      this.delta    = now - this.timestamp;
      this.progress = Math.min(this.delta / this.duration, 1);
    
      if (this.progress >= 1 && this.isLoop) {
        this.start(now);
      }
    
      return this.progress;
      } else {
      return 0;
      }
    }
    }
    
    class Confetti {
    constructor(param) {
      this.parent         = param.elm || document.body;
      this.canvas         = document.createElement("canvas");
      this.ctx            = this.canvas.getContext("2d");
      this.width          = param.width  || this.parent.offsetWidth;
      this.height         = param.height || this.parent.offsetHeight;
      this.length         = param.length || Confetti.CONST.PAPER_LENGTH;
      this.yRange         = param.yRange || this.height * 2;
      this.progress       = new Progress({
      duration : param.duration,
      isLoop   : true
      });
      this.rotationRange  = typeof param.rotationRange === "number" ? param.rotationRange
                                     : 10;
      this.speedRange     = typeof param.speedRange     === "number" ? param.speedRange
                                     : 10;
      this.sprites        = [];
    
      this.canvas.style.cssText = [
      "display: block",
      "position: absolute",
      "top: 0",
      "left: 0",
      "pointer-events: none"
      ].join(";");
    
      this.render = this.render.bind(this);
    
      this.build();
    
      this.parent.appendChild(this.canvas);
      this.progress.start(performance.now());
    
      requestAnimationFrame(this.render);
    }
    
    static get CONST() {
      return {
        SPRITE_WIDTH  : 9,
        SPRITE_HEIGHT : 16,
        PAPER_LENGTH  : 100,
        DURATION      : 8000,
        ROTATION_RATE : 50,
        COLORS        : [
        "#EF5350",
        "#EC407A",
        "#AB47BC",
        "#7E57C2",
        "#5C6BC0",
        "#42A5F5",
        "#29B6F6",
        "#26C6DA",
        "#26A69A",
        "#66BB6A",
        "#9CCC65",
        "#D4E157",
        "#FFEE58",
        "#FFCA28",
        "#FFA726",
        "#FF7043",
        "#8D6E63",
        "#BDBDBD",
        "#78909C"
        ]
      };
    }
    
    build() {
      for (let i = 0; i < this.length; ++i) {
      let canvas = document.createElement("canvas"),
        ctx    = canvas.getContext("2d");
    
      canvas.width  = Confetti.CONST.SPRITE_WIDTH;
      canvas.height = Confetti.CONST.SPRITE_HEIGHT;
    
      canvas.position = {
        initX : Math.random() * this.width,
        initY : -canvas.height - Math.random() * this.yRange
      };
    
      canvas.rotation = (this.rotationRange / 2) - Math.random() * this.rotationRange;
      canvas.speed    = (this.speedRange / 2) + Math.random() * (this.speedRange / 2);
    
      ctx.save();
        ctx.fillStyle = Confetti.CONST.COLORS[(Math.random() * Confetti.CONST.COLORS.length) | 0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    
      this.sprites.push(canvas);
      }
    }
    
    render(now) {
      let progress = this.progress.tick(now);
    
      this.canvas.width  = this.width;
      this.canvas.height = this.height;
    
      for (let i = 0; i < this.length; ++i) {
      this.ctx.save();
        this.ctx.translate(
        this.sprites[i].position.initX + this.sprites[i].rotation * Confetti.CONST.ROTATION_RATE * progress,
        this.sprites[i].position.initY + progress * (this.height + this.yRange)
        );
        this.ctx.rotate(this.sprites[i].rotation);
        this.ctx.drawImage(
        this.sprites[i],
        -Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)) / 2,
        -Confetti.CONST.SPRITE_HEIGHT / 2,
        Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)),
        Confetti.CONST.SPRITE_HEIGHT
        );
      this.ctx.restore();
      }
    
      requestAnimationFrame(this.render);
    }
    }
    
    (() => {
    const DURATION = 8000,
        LENGTH   = 120;
    
    new Confetti({
      width    : window.innerWidth,
      height   : window.innerHeight,
      length   : LENGTH,
      duration : DURATION
    });
    
    setTimeout(() => {
      new Confetti({
      width    : window.innerWidth,
      height   : window.innerHeight,
      length   : LENGTH,
      duration : DURATION
      });
    }, DURATION / 2);
    })();

    let beat = new Audio('round3.mp3');
    beat.play();
}

const challenges = [
  {
    type: "Challenge 1",
    quotes_array: [
      "2 + 3 = 5",
      "4 - 1 = 3",
      "5 * 2 = 10",
      "8 / 4 = 2",
      "10 + 7 = 17",
      "9 - 5 = 4",
      "6 * 3 = 18",
      "15 / 3 = 5",
      "12 + 4 = 16",
      "20 - 9 = 11",
      "3 * 4 = 12",
      "7 + 8 = 15",
      "10 - 2 = 8",
      "6 / 2 = 3",
      "9 * 2 = 18",
      "12 + 6 = 18",
      "5 - 3 = 2",
      "15 / 5 = 3",
      "8 * 3 = 24",
      "10 + 5 = 15",
      "6 - 4 = 2",
      "18 / 6 = 3",
      "7 * 2 = 14",
      "9 + 3 = 12",
      "4 - 2 = 2",
      "20 / 5 = 4",
      "5 * 3 = 15",
      "8 + 4 = 12",
      "12 - 7 = 5",
      "24 / 6 = 4",
      "6 * 2 = 12",
      "15 + 6 = 21",
      "10 - 3 = 7",
      "18 / 9 = 2",
      "9 * 4 = 36",
      "14 + 5 = 19",
      "8 - 6 = 2",
      "21 / 7 = 3",
      "5 * 4 = 20",
      "12 + 8 = 20",
      "9 - 2 = 7",
      "24 / 8 = 3",
      "7 * 3 = 21",
      "15 + 4 = 19",
      "10 - 4 = 6",
      "36 / 9 = 4",
      "8 * 5 = 40",
      "14 + 7 = 21",
      "6 - 1 = 5",
      "20 / 4 = 5"
    ],
  },
  {
    type: "Challenge 2",
    quotes_array: [
      '<nav></nav>',
    'UPDATE table SET col=value;',
    'UPDATE table SET col=value WHERE condition;',
    '<p>Hello</p>',
    '<header></header>',
    'int x=5,y=10;',
    'int *p=malloc(sizeof(int));',
    'int factorial=1;',
    'char ch=getchar();',
    'CREATE TABLE name ();',
    '<main></main>',
    'DELETE FROM table WHERE condition;',
    '<span></span>',
    '<aside></aside>',
    '<summary></summary>',
    '<h1>Title</h1>',
    'SELECT * FROM table;',
    'int a=1,b=2,c;',
    'INSERT INTO table VALUES ();',
    'int max=(a>b)?a:b;',
    'int[] arr={1,2,3};',
    'import math',
    'DROP TABLE name;',
    'float pi=3.14f;',
    'class P{}',
    '<div></div>',
    'from math import *',
    '<article></article>',
    'class P:pass',
    'System.out.println("Hi");',
    'ALTER TABLE name ADD column;',
    '<footer></footer>',
    'String s="Hello";',
    '<details></details>',
    'import math',
    'UPDATE table SET col=value;',
    '<section></section>',
    '<p>Hello</p>',
    '<h1>Title</h1>',
    'int a=1,b=2,c;',
    'int max=(a>b)?a:b;',
    'class P{}',
    'UPDATE table SET col=value WHERE condition;',
    '<aside></aside>',
    '<span></span>',
    '<main></main>',
    'SELECT col FROM table;',
    '<nav></nav>',
    'boolean flag=true;',
    'INSERT INTO table () VALUES ();',
    'int x=5,y=10;'
    ],
  },
  {
    type: "Challenge 3",
    quotes_array: [
      ":-) :-D", "<3 ;-)", ":-/ :-P", ":-O :-*", ":-| :-$",
      ":-! :-S", ":-X :-@", ":-# :-C", ":-& :-^", ":-Q :-D",
      ":-|] :-{}", ":-> ;-D", ":-| :-B", ":-? :-*", ":-X :-0",
      ":-E :-[", ":-D :-<", ":-D :-|", ":-X :-C", ":-! :-D",
      ":-x :-]", ":-* :-D", ":-| :-&", ":-[ :-o", ":-) :-D",
      "<3 ;-)", ":-/ :-P", ":-O :-*", ":-| :-$", ":-! :-S",
      ":-X :-@", ":-# :-C", ":-& :-^", ":-Q :-D", ":-|] :-{}",
      ":-> ;-D", ":-| :-B", ":-? :-*", ":-X :-0", ":-E :-[",
      ":-D :-<", ":-D :-|", ":-X :-C", ":-! :-D", ":-x :-]",
      ":-* :-D", ":-| :-&", ":-[ :-o", ":-) :-D", "<3 ;-)",
      ":-/ :-P", ":-O :-*", ":-| :-$", ":-! :-S", ":-X :-@",
    ],
  },
];

const challengeRadioContainer = document.querySelector(
  ".challenge_radio_container"
);

// Function to populate radio buttons with random challenges
function populateRandomChallenges() {
  // Clear existing radio buttons
  challengeRadioContainer.innerHTML = "";

  // Shuffle the challenges array to get random order
  const shuffledChallenges = challenges.sort(() => Math.random() - 0.5);

  // Create radio buttons for each shuffled challenge
  shuffledChallenges.forEach((challenge, index) => {
    const radioBtn = document.createElement("input");
    radioBtn.setAttribute("type", "radio");
    radioBtn.setAttribute("name", "challenge_type");
    radioBtn.setAttribute("value", index);
    radioBtn.addEventListener("change", () => {
      // Call a function to update quotes_array based on the selected challenge
      updateQuotesArray(challenge.quotes_array);
      // Disable other radio buttons
      disableOtherRadioButtons(index);
    });

    const label = document.createElement("label");
    label.textContent = "Challenge " + (index + 1);

    challengeRadioContainer.appendChild(radioBtn);
    challengeRadioContainer.appendChild(label);
  });
}

// Function to disable other radio buttons
function disableOtherRadioButtons(selectedIndex) {
  const radioButtons = document.querySelectorAll(
    'input[name="challenge_type"]'
  );
  radioButtons.forEach((button, index) => {
    if (index !== selectedIndex) {
      button.disabled = true;
    }
  });
}

// Function to update quotes_array based on selected challenge
function updateQuotesArray(newQuotesArray) {
  quotes_array = newQuotesArray;
  // Call updateQuote to display the first quote of the new array
  updateQuote();
}

// Call the function to populate radio buttons with random challenges
populateRandomChallenges();
