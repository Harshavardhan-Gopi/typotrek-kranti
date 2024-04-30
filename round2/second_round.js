// define the time limit 
let TIME_LIMIT = 90; 

// define quotes to be used 
let quotes_array = [ 
	"th!rone", "m!agic", "d@ragon", "trea$sure", "w!izard", "my$stery", "e!lves", "f!orge", "g@oblin", "s!hadow",
    "e!scape", "q^uest", "s!pell", "k@night", "c!astle", "a!dventure", "h!oard", "a!lchemy", "p^otion", "r!ogue",
    "d@ungeon", "Ex!pelliarmus","Lu@mos",
    "Al-ohomora",
    "Exp#ecto Patronum",
    "Wing!ardium Leviosa",
    "Acci&o",
    "Ava-da Kedavra",
    "Im!perio",
    "Cruci!o",
    "Prot&ego",
    "Stupef#y",
    "Petri!ficus Totalus",
    "Incen!dio",
    "Rid&dikulus",
    "Oblivi@ate",
    "Agu@amenti","m!ystic", "t!hief", "s^orcerer", "e!xile", "d!agger", "c!rypt", "t@alisman", "g!uardian", "l^egend",
    "s!pecter", "s!cepter", "a@ssassin", "e!nigma", "s!aboteur", "t@reasure", "w!arlock", "s!cheme", "m@agician",
    "f!orsaken", "i!llusion", "d@eception", "q^uarry", "s!orcery", "r!elic", "b@andit", "f!east", "f^lame", "s!ilhouette",
    "s!hackle", "d@isguise", "t@reasure", "w!yrm", "p^ilfer", "m!irage", "t!reachery", "r!ansom", "a@rtifact", "g!rimoire",
    "q^uestion", "t!respass", "s!pellbook", "f!rostbite", "a@mbush", "e!ntanglement", "r!eservoir", "t@hiti", "g!riffin",
    "b@asilisk", "m!arauder", "e!xodus", "p^lunder", "s!tealth", "t@arget", "w!arfare", "s!mmer", "m!anticore", "q^uiver",
    "s!hiv", "r!iches", "f!orsake", "g@ambling", "t!arot", "m@agistrate", "b@ounty", "t!reachery", "r!ebel", "t@reachery",
    "b!lackmail", "s!washbuckler", "s^hadowy", "m!edallion", "e!lixir", "r!ansom", "g@old", "f!amine", "w!anderer", "r!iddle",
    "s!parrow", "e!ncryption"
]; 

// selecting required elements 
let timer_text = document.querySelector(".curr_time"); 
let accuracy_text = document.querySelector(".curr_accuracy"); 
let error_text = document.querySelector(".curr_errors"); 
let cpm_text = document.querySelector(".curr_cpm"); 
let wpm_text = document.querySelector(".curr_wpm"); 
let quote_text = document.querySelector(".quote"); 
let input_area = document.querySelector(".input_area"); 
//let restart_btn = document.querySelector(".restart_btn"); 
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
    // Select a random index from quotes_array
    const randomIndex = Math.floor(Math.random() * quotes_array.length);
    current_quote = quotes_array[randomIndex];
    
    // Separate each character and make an element 
    // out of each of them to individually style them 
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quote_text.appendChild(charSpan);
    });
}

// function updateQuote() { 
// 	quote_text.textContent = null; 
// 	current_quote = quotes_array[quoteNo]; 
	
// 	// separate each character and make an element 
// 	// out of each of them to individually style them 
// 	current_quote.split('').forEach(char => { 
// 		const charSpan = document.createElement('span') 
// 		charSpan.innerText = char 
// 		quote_text.appendChild(charSpan) 
// 	}) 
	
// 	// roll over to the first quote 
// 	if (quoteNo < quotes_array.length - 1) 
// 		quoteNo++; 
// 	else
// 		quoteNo = 0; 
// 	} 

	function processCurrentText() { 

		// get current input text and split it 
		curr_input = input_area.value; 
		curr_input_array = curr_input.split(''); 
		
		// increment total characters typed 
		characterTyped++; 
		
		errors = 0; 
		
		quoteSpanArray = quote_text.querySelectorAll('span'); 
		quoteSpanArray.forEach((char, index) => { 
			let typedChar = curr_input_array[index] 
		
			// character not currently typed 
			if (typedChar == null) { 
			char.classList.remove('correct_char'); 
			char.classList.remove('incorrect_char'); 
		
			// correct character 
			} else if (typedChar === char.innerText) { 
			char.classList.add('correct_char'); 
			char.classList.remove('incorrect_char'); 
		
			// incorrect character 
			} else { 
			char.classList.add('incorrect_char'); 
			char.classList.remove('correct_char'); 
		
			// increment number of errors 
			errors++; 
			} 
		}); 
		
		// display the number of errors 
		error_text.textContent = total_errors + errors; 
		
		// update accuracy text 
		let correctCharacters = (characterTyped - (total_errors + errors)); 
		let accuracyVal = ((correctCharacters / characterTyped) * 100); 
		accuracy_text.textContent = Math.round(accuracyVal); 
		
		// if current text is completely typed 
		// irrespective of errors 
		if (curr_input.length == current_quote.length) { 
			updateQuote(); 
		
			// update total errors 
			total_errors += errors; 
		
			// clear the input area 
			input_area.value = ""; 
		} 
		} 

		function startGame() { 

			resetValues(); 
			updateQuote(); 
			
			// clear old and start a new timer 
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
			quote_text.textContent = 'Click on the area below to start the game.'; 
			accuracy_text.textContent = 100; 
			timer_text.textContent = timeLeft + 's'; 
			error_text.textContent = 0; 
			//restart_btn.style.display = "none"; 
			cpm_group.style.display = "none"; 
			wpm_group.style.display = "none"; 
			} 

			// Add event listener to input area to prevent usage of backspace and delete keys
input_area.addEventListener('keydown', function(event) {
    // Get the keyCode of the pressed key
    var keyCode = event.keyCode || event.which;

    // Check if the pressed key is backspace (keyCode 8) or delete (keyCode 46)
    if (keyCode === 8 || keyCode === 46) {
        // Prevent the default behavior of the key
        event.preventDefault();
    }
});

			function updateTimer() { 
				if (timeLeft > 0) { 
					// decrease the current time left 
					timeLeft--; 
				
					// increase the time elapsed 
					timeElapsed++; 
				
					// update the timer text 
					timer_text.textContent = timeLeft + "s"; 
				} 
				else { 
					// finish the game 
					finishGame(); 
				} 
				} 

				function finishGame() { 
					// stop the timer 
					clearInterval(timer); 
					
					// disable the input area 
					input_area.disabled = true; 
					
					// show finishing text 
					quote_text.textContent = "Enjoy your 🏃‍♂️ heist 💰 at KRANTI 🕵🏼‍♂️"; 
					
					// display restart button 
					//restart_btn.style.display = "block"; 
					
					// calculate cpm and wpm 
					cpm = Math.round(((characterTyped / timeElapsed) * 60)); 
					wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60)); 
					
					// update cpm and wpm text 
					cpm_text.textContent = cpm; 
					wpm_text.textContent = wpm; 
					
					// display the cpm and wpm 
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
					  let beat = new Audio('round2.mp3');
    				  beat.play();
					}
