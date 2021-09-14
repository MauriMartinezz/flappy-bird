let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext("2d");

let WIDTH = 300;
let HEIGHT = 530;

let CANVAS_WIDTH = 300;
let CANVAS_HEIGHT = 530;

canvas.width = WIDTH;
canvas.height = HEIGHT;

//Vars
let score = 0;
const FPS = 60;
const gravity = 1.5;
let character = {
	x: 50,
	y: 150,
	w: 50,
	h: 50
}
const pipes = new Array();
pipes[0] = {
	x: canvas.width,
	y: 0
}

//Audio
let point = new Audio();
point.src = './assets/audios/mechamecha.mp3';

// Images
const bird = new Image();
bird.src = './assets/imagenes/bird.png';

const background = new Image();
background.src = './assets/imagenes/background.png';

const upperPipe = new Image();
upperPipe.src = './assets/imagenes/tuberiaNorte.png';

const lowerPipe = new Image();
lowerPipe.src = './assets/imagenes/tuberiaSur.png';

const floor = new Image();
floor.src = './assets/imagenes/suelo.png';

// Controls
const pressButton = () => {
	character.y -= 35;
}
const resize = () => {
	CANVAS_HEIGHT = window.innerHeight;
	CANVAS_WIDTH = window.innerWidth;

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	canvas.style.height = "" + CANVAS_HEIGHT + "px";
}
//Game
const loop = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Background
	ctx.drawImage(background, 0, 0);
	ctx.drawImage(floor, 0, canvas.height - floor.height);

	//Character
	ctx.drawImage(bird, character.x, character.y);

	//Pipes
	//Conditions

	for (let i = 0; i < pipes.length; i++) {

		let constantOffset = upperPipe.height + 140;
		ctx.drawImage(upperPipe, pipes[i].x, pipes[i].y);
		ctx.drawImage(lowerPipe, pipes[i].x, pipes[i].y + constantOffset);
		pipes[i].x--;

		if (pipes[i].y + upperPipe.height < 80) {
			pipes[i].y = 0;
		}

		if (pipes[i].x == 150) {
			pipes.push({
				x: canvas.width,
				y: Math.floor(Math.random() * upperPipe.height) - upperPipe.height
			})
		}

		//Colitions
		if(character.x + bird.width >= pipes[i].x 
			&& character.x <= pipes[i].x + upperPipe.width
			&& (character.y <= pipes[i].y + upperPipe.height 
			|| character.y + bird.height >= pipes[i].y + constantOffset)
			|| character.y + bird.height >= canvas.height - floor.height){
			location.reload();
		} 
			if(pipes[i].x === character.x){
				score++;
				point.play();
			}


	}
	//conditions
	character.y += gravity;
	ctx.fillStyle = "rgba(20,20,20,1)";
	ctx.font = "25px Arial";
	ctx.fillText("Score: " + score, 10, canvas.height - 45);
}
//Events
setInterval(loop, 1000 / FPS);
resize();
window.addEventListener("resize", resize);
window.addEventListener("keydown", pressButton);
