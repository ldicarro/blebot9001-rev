/*
Martin Kronberg
October 2016

Updated by: Louis DiCarro December 2016

npm install johnny-five
npm install ble-serial
npm install keypress
*/

var five = require("johnny-five");
var board, motor, led;
var BLESerialPort = require('ble-serial').SerialPort;

var keypress = require('keypress');

//use the virtual serial port to send a command to a firmata device
var bleSerial = new BLESerialPort();
var board = new five.Board({port: bleSerial, repl: false});

var speed = 100;
var currentFunction = "";

board.on("ready", function(){

	//load adafruit motor shield configs
	var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
	//create each motor
	var motor1 = new five.Motor(configs.M1);
	var motor2 = new five.Motor(configs.M2);
	var motor3 = new five.Motor(configs.M3);
	var motor4 = new five.Motor(configs.M4);

	//set high level drive functions
	function forward()
	{
		motor1.forward(speed);
		motor2.forward(speed);
		motor3.forward(speed);
		motor4.forward(speed);
		console.log('forward');
	}

	function reverse(){
		motor1.reverse(speed);
		motor2.reverse(speed);
		motor3.reverse(speed);
		motor4.reverse(speed);
		console.log('reverse');
	}

	function left()
	{
		motor1.reverse(speed);
		motor2.forward(speed);
		motor3.reverse(speed);
		motor4.forward(speed);
		console.log('left');
	}

	function right()
	{
		motor1.forward(speed);
		motor2.reverse(speed);
		motor3.forward(speed);
		motor4.reverse(speed);		
		console.log('right');
	}

	function stop()
	{
		motor1.stop();
		motor2.stop();
		motor3.stop();
		motor4.stop();
		console.log('stop');
	}

	console.log('ready');

	// make `process.stdin` begin emitting "keypress" events
	keypress(process.stdin);

	// listen for the "keypress" event
	process.stdin.on('keypress', function (ch, key) {
		console.log('got "keypress"', key);

		//make it so you can close the process with ctrl-c...
		if (key && key.ctrl && key.name == 'c') {
			process.exit();
		}

		if (key && key.name == 'w') {
			forward();
			currentFunction = 'w';
		}

		if (key && key.name == 's') {
			reverse();
			currentFunction = 's';
		}

		if (key && key.name == 'a') {
			left();
			curentFunction = 'a';
		}

		if (key && key.name == 'd') {
			right();
			currentFunction = 'd';
		}

		if (key && key.name == 'q') {
			stop();
			currentFunction = 'q';
		}

		if(key && key.name == 'o')
		{
			if(speed > 0)
			{
				speed -= 10;
			}
			console.log('speed = ' + speed);
		}

		if(key && key.name == 'p')
		{
			if(speed < 250)
			{
				speed += 10;
			}
			console.log('speed = ' + speed);
		}

		if(key && key.name == 'o' || key && key.name == 'p')
		{
			switch(currentFunction)
			{
				case 'w':
					forward(speed);
					break;
				case 's':
					reverse(speed);
					break;
				case 'a':
					left(speed);
					break;
				case 'd':
					right(speed);
					break;
				default:
					break;
			}
		}

	});

	process.stdin.setRawMode(true);

});
