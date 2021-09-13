let context = document.getElementById('game-canvas');
const ctx = context.getContext("2d");
let WIDTH = 300;
let HEIGHT = 530;
let CANVAS_WIDTH = 300;
let CANVAS_HEIGHT = 530;

context.width = WIDTH;
context.height = HEIGHT;

//Vars
const FPS = 60;
const gravedad = 1.5;
let character = {
	x: 50,
	y: 150,
	w: 50,
	h: 50
}
let score = 0;
const pipes = new Array();
pipes[0] = {
	x: context.width,
	y:0
}
//Audio

let point = new Audio();
point.src = './assets/audios/mechamecha.mp3';
// Images
const bird = new Image();
bird.src= './assets/imagenes/bird.png';

const background = new Image();
background.src= './assets/imagenes/background.png';

const upperPipe = new Image();
upperPipe.src= './assets/imagenes/tuberiaNorte.png';

const lowerPipe = new Image();
lowerPipe.src= './assets/imagenes/tuberiaSur.png';

const floor = new Image();
floor.src= './assets/imagenes/suelo.png';

// Controls
const pressButton = ()=>{
	character.y -= 35;
}
const resize = ()=>{
	CANVAS_HEIGHT = window.innerHeiht;
	CANVAS_WIDTH = window.innerWidth;

	context.width = WIDTH;
	context.height = HEIGHT;

	context.style.height= ""+ CANVAS_HEIGHT +"px";
}
//Game
const loop = ()=>{
	ctx.clearRect(0,0, context.width, context.height);
	
	//Background
	context.drawImage(background, 0 , 0);
	context.drawImage(floor,0, context.height - floor.height);
	
	//Character
	context.drawImage(bird, character.x, character.y);

	//Pipes
	//Conditions
	
	for(let i = 0; i < pipes.length; i++){
	let constantOffset = upperPipe.height + 100;
	context.drawImage(upperPipe, pipes[i].x,pipes[i].y);
	context.drawImage(lowerPipe, pipes[i].x,pipes[i].y + constantOffset);
	pipes[i].x--;
		if(pipes[i].x + upperPipe.height< 100){
	pipes[i].y = 0;
		}
	if(pipes[i].x == 150){
	pipes.push({
	x: context.width,
	y: Math.floor(Math.random()*upperPipe.height) - upperPipe.height
	})
	}
		//Colitions
/*
	if(character.x + bird.width >= pipes[i].x 
		&& character.x <= pipes[i].x + upperPipe.width
		&& (character.y <= pipes[i].y + upperPipe.height || character.y + bird.height >= pipes[i].y + constantOffset)
		|| character.y + bird.height >= context.canvas.height - floor.height){
		location.reload();
	} */
		if(pipes[i].x === character.x){
			score++;
			point.play();
		}
	
	
	//conditions
	character.y += gravedad;
	context.fillStyle ="rgba(20,20,20,1)";
	context.font = "25px Arial";
	context.fillText("Score: " + score, 10, context.height-45);
}
}
//Events
setInterval(loop,1000/FPS);
window.addEventListener("resize",resize());
window.addEventListener("keydown",pressButton());
