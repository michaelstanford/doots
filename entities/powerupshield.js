ig.module(
	'game.entities.powerupshield'
)
.requires(
	'impact.entity',
	'game.entities.enemy'
)
.defines(function() {
	EntityPowerupshield = ig.Entity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet('media/entities/powerup/blue_tick.png', 17, 17 ),
		size: {x:17,y:17},
		offset: {x: 5, y:5},
		accelSpeed: 200,
		maxVel: {x:200, y:200},		
		accel: {x: 0, y:0},
		gatherSfx: new ig.Sound('media/sounds/powerup.ogg'),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [0]);
		}, 
		
		takeDamage: function(dam) {
			return;
		},

		update: function() {
			this.parent();

			if (this.pos.x > ig.system.width) {
				this.pos.x = -36;
			} else if(this.pos.x < -36) {
				this.pos.x = ig.system.width;
			};
			if (this.pos.y > ig.system.height) {
				this.pos.y = -36;
			} else if (this.pos.y < -36) {
				this.pos.y = ig.system.height;
			};
		},

		check: function(other) {
			this.kill();
			other.shield();
			this.gatherSfx.play();	
		}


	})
});
