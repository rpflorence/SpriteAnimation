/*
---

script: SpriteAnimation.js

description: Cycles the x value of the background-position of an element to create sprite animations.  Helpful for creating javascript game animations or ajax loadings spinners.

license: MIT-style license.

authors: Ryan Florence <http://ryanflorence.com>

docs: http://moodocs.net/rpflo/mootools-rpflo/SpriteAnimation

requires:
 core/1.2.4: '*'

provides: [SpriteAnimation]

...
*/

var SpriteAnimation = new Class({
  
	Implements: [Options, Events, Loop],
  
		options: {
				/*
				onStep: $empty,
				*/
				frameWidth: 75,
				frames: 10,
				frameRate: 100,
				defaultPosition: {x: 0, y :0}
			},
 
	initialize: function(element,options){
		this.setOptions(options);
		this.setLoop(this.step, this.options.frameRate);
		this.element = document.id(element);
		var pos = this.options.defaultPosition;
		this.element.setStyle('background-position', pos.x + 'px ' + pos.y + 'px');
		this.startLoop();
	},
 
	step: function(){
		var x = this.computeX();
		var y = this.computeY();
		this.element.setStyle('background-position', x+'px '+ y+'px');
		this.fireEvent('onStep', this.count);
		return this;
	},
	
	computeX: function(){
		this.loopCount = (this.loopCount == (this.options.frames)) ? this.options.defaultPosition.x : this.loopCount
		return -this.loopCount * this.options.frameWidth;
	},
	
	computeY: function(){
		return this.options.defaultPosition.y;
	},
	
	reset: function(){
		this.loopCount = this.options.frames;
		this.step();
		return this;
	}
 
});

SpriteAnimation.implement({

	loop: function(loops){
		var c = 0;
		loops = loops * this.options.frames;
		if(this.isStopped) this.startLoop();
		this.addEvents({
			onStep: function(step){
				c++;
				if(c == loops) this.stopLoop();
			}
		});
	}
	
});