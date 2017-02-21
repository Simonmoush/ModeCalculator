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


console.log("shroeder frequency: " + shroeder_freq)

var p = 0
while(true){

	var q = 0
	while(true){

		var r = 0
		while(true){
			// calculate the mode frequency for the current p, q, and r
			mode_freq = (speed_of_sound/2) * Math.sqrt(Math.pow(p/length, 2) + Math.pow(q/width, 2) + Math.pow(r/height, 2))


			// add mode to list of modes
			if(mode_freq < shroeder_freq){
				if(mode_freq != 0){
					mode_list.push(new Mode(mode_freq, p, q, r))
				}
				r++ // check the next mode
			} else{
				// higher r for the current p and q will produce modes above the shroeder frequency
				// so we need to move to the next q
				break
			}
		}
		if(r == 0) {
			// if no modes were found, then  higher q for any p and r will produce modes above the shroeder frequency
			// so wee need to move to the next p
			p++
			break
		}else{
			q++ // otherwise just move to the next q
		}
	}
	if(q == 0 && r == 0){
		// if no modes were found, then higher p for any q and r will produce modes above the shroeder frequency
		// so we're done
		break
	}
}


console.log(mode_list)
for (var m in mode_list){
	console.log(m.freq + ", " + m.type + ", " + m.axis)
}

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
