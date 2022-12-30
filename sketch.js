let audio;
let ct;
let unlocked = true;
var startButton;
let loopStart;
let loopStart1;

function preload(){
	audio = loadSound('data/English.mp3');
	audio1 = loadSound('data/English.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	// put setup code here

	audio.playMode('restart');
	audio1.playMode('restart');
	// audio.addCue(loopStart+loopEnd, start);

	audio.pan(-1);
	audio1.pan(1);

	loopStart = random(.9, 1.02);
	loopStart1 = random(.9, 1.02);

	if (audio.isLoaded() && audio1.isLoaded()){
		console.log('loaded!');
		console.log(audio.duration());
	}

	startButton = createButton("play");
	//startButton.position(width/2, height/2);
	startButton.mousePressed(start);
	startButton.center();
	// let stopButton = createButton("stop");
	// stopButton.position(width/2 + 20, height/2);
	// stopButton.mousePressed(stop);
}

function start(){
	if (unlocked){
		// audio.loop(0, 1, .5, 0);
		// audio1.loop(0, 1.002, .5, 0);
		audio.loop(0, loopStart, .5, 0);
		audio1.loop(0, loopStart1, .5, 0);
		startButton.html('stop');
		unlocked = false;
	} else if (!unlocked) {
		audio.stop();
		audio1.stop();
		startButton.html('play');
		loopStart = random(.9, 1.02);
		loopStart1 = random(.9, 1.02);
		unlocked = true;
		console.log('loopStart is: ' + loopStart);
		console.log('loopStart1 is: ' + loopStart1);
	}

}

function stop(){
	audio.stop();
	audio1.stop();
}

function draw() {
	// put drawing code here  
	//background(251);
	background(158, 161, 212);

	//rgb(253, 138, 138) for text

	//stroke(84, 22, 144);
	stroke(241, 247, 181);
	let x1 = map(audio.currentTime(), 0, audio.duration(), 0, width);
	line(x1, height/2 - height/4, x1, (height/2 - height/4) + height/2);

	let x2 = map(audio1.currentTime(), 0, audio1.duration(), 0, width);
	line(x2, height/2 - height/4, x2, (height/2 - height/4) + height/2);

	let peaks = audio.getPeaks(64);


	push();
	for (let i = 0; i < peaks.length; i++){
		let x3 = map(i, 0, peaks.length, 0, width);
		let y3 = map(peaks[i], -1, 1, height, 0);
		
		//stroke(255, 73, 73);
		stroke(168, 209, 209);
		strokeWeight(3);
		line(x3, y3, x3, height - y3);
	}
	pop();
}

