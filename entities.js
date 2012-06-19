/**
 * Computing At School Turtle
 * 
 * @package CAS Turtle
 * @subpackage Entities
 * 
 * @copyright (c) 2012 The Development Manager Ltd
 * @license Apache License, Version 2.0
 * 
 * @author Laurent David <laurent@tdm.info>
 */

var PlayerEntity = me.ObjectEntity.extend({

	init: function(x, y, settings) {
		// call the constructor
		this.parent(x, y, settings);

		// set the walking & jumping speed
		this.setVelocity(1, 1);
		this.setMaxVelocity(3, 3);
		// direction angle. Angle is taken from the (X,-Y) axe, so PI/2 means
		// going up, 0 means going right...
		this.direction = 90;

		this.addAnimation("walkup", [
				0, 1, 2, 3
		]);
		this.addAnimation("walkright", [
				4, 5, 6, 7
		]);
		this.addAnimation("walkdown", [
				8, 9, 10, 11
		]);
		this.addAnimation("walkleft", [
				16, 17, 18, 19
		]);
		this.setCurrentAnimation("walkup");
		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

	},

	update: function() {
		var command = Turtle.shiftCommand();
		if (command != null) {
			cmdname = command.name;
			switch (cmdname) {
				case "forward":
					switch (this.direction) {
						case 0:
							dirx = 1;
							diry = 0;
							break;
						case 180:
							dirx = -1;
							diry = 0;
							break;
						case 90:
							dirx = 0;
							diry = -1;
							break;
						case 270:
							dirx = 0;
							diry = 1;
							break;
					}
					this.vel.x += dirx * this.accel.x * me.timer.tick;
					this.vel.y += diry * this.accel.y * me.timer.tick;
					break;
				case "turn":
					this.vel.x = this.vel.y = 0;
					sign = -1;
					if (command.params.direction == "left") {
						sign = 1;
					}
					this.direction += sign * 90;
					if (this.direction >= 360) {
						this.direction -= 360;
					}
					if (this.direction < 0) {
						this.direction = 360 + this.direction;
					}
					switch (this.direction) {
						case 0:
							this.setCurrentAnimation("walkright");
							break;
						case 180:
							this.setCurrentAnimation("walkleft");
							break;
						case 90:
							this.setCurrentAnimation("walkup");
							break;
						case 270:
							this.setCurrentAnimation("walkdown");
							break;
					}
					break;
			}
			command.iterations -= 1;
			if (command.iterations > 0) {
				Turtle.pushBackCommand(command);
			}
			// check & update player movement
			this.updateMovement();
			this.parent(this);
			return true;
		}
		return false;
	}

});
