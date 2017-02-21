/*
	By Simon Moushabeck
	SIA Acoustics
	2.17.17
	Room Mode Calculator for Rectangular Rooms

	Based on the following equation:
	F = (c/2) * sqrt((p/L)^2 + (q/W)^2 + (r/H)^2)

	where:
	F = Mode center frequency
	c = speed of sound
	p = length mode number
	q = width mode number
	r = height mode number

	Using the following approximation for the Shroeder frequency:
	S = 3c/d
	
	where:
	S = Shroeder frequency
	c = speed of sound
	d = the smallest representive dimension of the room
*/



//TODO fix the data here to take imperial units too
var length = 5
var width = 4
var height = 3.5
var speed_of_sound = 340.29 // meters per sec
var shroeder_freq = 3*speed_of_sound/Math.min(length, width, height)
var mode_freq = 0
var length_freq = 0
var width_freq = 0
var height_freq = 0

var mode_list = [];



//TODO fix this shit

var p = 0
while(length_freq < shroeder_freq){
	length_freq = (speed_of_sound/2) * Math.sqrt(Math.pow(p/length, 2))

	var q = 0
	while(width_freq < shroeder_freq){
		width_freq = (speed_of_sound/2) * Math.sqrt(Math.pow(p/length, 2) + Math.pow(q/width, 2))

		var r = 0
		while(height_freq < shroeder_freq){
			height_freq = (speed_of_sound/2) * Math.sqrt(Math.pow(p/length, 2) + Math.pow(q/width, 2) + Math.pow(r/height, 2))
		}
	}
}


for(var p = 0; length_freq < shroeder_freq; p++){
	for(var q = 0; width_freq < shroeder_freq; q++){
		for(var r = 0; height_freq < shroeder_freq; r++){
			mode_freq = (speed_of_sound/2) * Math.sqrt(Math.pow(p/length, 2) + Math.pow(q/width, 2) + Math.pow(r/height, 2))
			if(mode_freq < shroeder_freq && mode_freq != 0){
				// add to appropriate bin
				mode_list.push(new Mode(mode_freq, p, q, r))
			}
		}
	}
}

console.log(mode_list)

function Mode(freq, p, q, r){
	// set frequency
	this.freq = freq

	// determine type and axis
	if(p == 0 && q == 0){ // axial r
		this.type = "Axial"
		this.axis = "Height"
	}else if(p == 0 && r == 0){ // axial q
		this.type = "Axial"
		this.axis = "Width"
	}else if(q == 0 && r == 0){ // axial p
		this.type = "Axial"
		this.axis = "Length"
	}else if(p == 0){ // Tangential q+r
		this.type = "Tangential"
		this.axis = "Width + Height"
	}else if(q == 0){ // Tangential p+r
		this.type = "Tangential"
		this.axis = "Length + Height"
	}else if(r == 0){ // Tangential p+q
		this.type = "Tangential"
		this.axis = "Length + Width"
	}else{ // Oblique
		this.type = "Oblique"
		this.axis = "Length + Width + Height"
	}
}
