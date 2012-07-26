/**
 * Computing At School Turtle
 * 
 * @package CAS Turtle
 * @subpackage Game Engine Turtle Implementation
 * 
 * @copyright (c) 2012 The Development Manager Ltd
 * @license Apache License, Version 2.0
 * 
 * @author Laurent David <laurent@tdm.info>
 */

function CTurtle() {}
CTurtle.prototype = new BasicTurtle();
CTurtle.prototype.constructor = Turtle;

// Moves forward or backward
CTurtle.prototype.forward = function(id)
{
	this.pushCommand(new GameCommand('forward',{},8));
};

// Turn left or right
CTurtle.prototype.turn = function(dirname,id)
{
	this.pushCommand(new GameCommand('turn',{direction:dirname},1));
};

var Turtle= new CTurtle();


// Whitelist of blocks to keep.
var newLanguage = {};
var keepers = ['turtle_forward', 'turtle_turn', 'controls_whileUntil',
         'logic_operation', 'logic_negate', 'math_number','math_arithmetic'];
for (var x = 0; x < keepers.length; x++) {
       newLanguage[keepers[x]] = Blockly.Language[keepers[x]];
}
Blockly.Language = newLanguage;



