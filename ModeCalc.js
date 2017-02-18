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

var length = 5
var width = 4
var height = 3.5
var speed_of_sound = 340.29 // meters per sec
var shroeder_freq = 3*speed_of_sound/math.min(length, width, height)
var mode_freq = 0

var modes = {
	axial: []
	tangential: []
	oblique: []
};


for(int p = 0; mode_freq > shroeder_freq; p++){
	for(int q = 0; mode_freq > shroeder_freq; q++){
		for(int r = 0; mode_freq > shroeder_freq; r++){
			mode_freq = (speed_of_sound/2) * math.sqrt((p/length)^2 + (q/width)^2 + (r/height)^2)
			if(mode_freq < shroeder_freq){
				// add to appropriate bin
			}
		}
	}
}
