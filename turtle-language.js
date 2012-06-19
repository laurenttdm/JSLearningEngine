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
/* Extensions to Blockly's language and JavaScript generator, inspired by the demos "maze" */

// Define Language and JavaScript, in case this file is loaded too early.
if (!Blockly.Language) {
  Blockly.Language = {};
}
Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.Language.turtle_forward = {
  // Block for moving forward
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(290);
    this.addTitle('forward');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Moves forward one space.');
  }
};

Blockly.JavaScript.turtle_forward = function() {
  // Generate JavaScript for moving forward.
  return 'Turtle.forward( "' + this.id + '");\n';
};

Blockly.Language.turtle_turn = {
  // Block for turning left or right.
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(290);
    this.addTitle('turn');
    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.turtle_turn.DIRECTIONS;
    });
    this.addTitle(dropdown);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns left or right by 90 degrees.');
  }
};

Blockly.Language.turtle_turn.DIRECTIONS = ['left', 'right'];

Blockly.JavaScript.turtle_turn = function() {
  // Generate JavaScript for turning left or right.
  var direction = this.getTitleText(1);
  return 'Turtle.turn("' + direction + '", "' + this.id + '");\n';
};
