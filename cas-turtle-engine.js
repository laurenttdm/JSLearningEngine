/**
 * Computing At School Turtle
 * 
 * @package CAS Turtle
 * @subpackage Game Engine
 * 
 * @copyright (c) 2012 The Development Manager Ltd
 * @license Apache License, Version 2.0
 * 
 * @author Laurent David <laurent@tdm.info>
 */

/*
 * The main play screen We use that screen as a basis for moving the Turtle
 * around.
 * 
 */
var TurtlePlayScreen = me.ScreenObject.extend({
	/*
	 * This is the reset function when we change state (game state).
	 */
	onResetEvent: function() {
		// me.video.clearSurface(context, "black");
		me.levelDirector.loadLevel("level1");
	},

	/*
	 * action to perform when game is finished (state change)
	 */
	onDestroyEvent: function() {},
});

/*
 * This is the main application Mainly inspired from the tutorial
 */
var jsApp = {
	/*
	 * Initialize the jsApp
	 */
	onload: function() {

		// init the video
		if (!me.video.init('gameapp', 480, 360, false, 1.0)) {
			alert("Sorry but your browser does not support html 5 canvas.");
			return;
		}
		// initialize the "audio"
		me.audio.init("mp3,ogg");

		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);

		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);

		// Strip out unneeded blocks.
		delete Blockly.Language.controls_forEach;
		delete Blockly.Language.controls_whileUntil;
		delete Blockly.Language.controls_flow_statements;
		// Add the blocky code
		Blockly.inject(document.getElementById('right'), {
			path: 'lib/google-blockly/'
		});

		me.sys.gravity = 0;

	},

	/*
	 * ---
	 * 
	 * callback when everything is loaded
	 * 
	 * ---
	 */
	loaded: function() {
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new TurtlePlayScreen());
		// add our player entity in the entity pool
		me.entityPool.add("Player", PlayerEntity);
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");

		// start the game
		me.state.change(me.state.PLAY);
	}

};

// bootstrap
window.onReady(function() {
	jsApp.onload();
});

window.onbeforeunload = function() {
	if (Blockly.mainWorkspace.getAllBlocks().length > 1) {
		return 'Leaving this page will result in the loss of your work.';
	}
	return null;
};

/* Turtle basic definition */

function BasicTurtle() {
	this.commands = new Array();
};
BasicTurtle.prototype.showCode = function() {
	var code = Blockly.Generator.workspaceToCode('JavaScript');
	code += '\n\n[The serial numbers are just used to highlight blocks when run.]';
	alert(code);
};
BasicTurtle.prototype.shiftCommand = function() {
	return this.commands.shift();
};
BasicTurtle.prototype.pushBackCommand = function(command) {
	return this.commands.unshift(command);
};
BasicTurtle.prototype.pushCommand = function(command) {
	return this.commands.push(command);
};
BasicTurtle.prototype.runButtonClick = function() {
	document.getElementById('runButton').style.display = 'none';
	document.getElementById('resetButton').style.display = 'inline';
	this.run();
};
BasicTurtle.prototype.resetButtonClick = function() {
	document.getElementById('runButton').style.display = 'inline';
	document.getElementById('resetButton').style.display = 'none';
	this.reset();
};
BasicTurtle.prototype.run = function() {
	var code = Blockly.Generator.workspaceToCode('JavaScript');
	// try {
	eval(code);
	/*
	 * } catch (e) { // A boolean is thrown for normal termination. // Abnormal
	 * termination is a user error. if (typeof e != 'boolean') { alert(e); } }
	 */
};
BasicTurtle.prototype.reset = function () {
	jsApp.loaded();
};

function GameCommand(name, params, iterations) {
	this.name = name;
	this.params = params;
	this.iterations = iterations;
};

