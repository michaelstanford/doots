ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'impact.entity-pool',
	'game.entities.trail'
)
.defines(function() {
	EntityPlayer = ig.Entity.extend({
		type: ig.Entity.TYPE.A,	
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet('media/entities/player/player.png', 36, 36 ),
		size: {x:28,y:28},
		offset: {x:5, y:5},
		accelSpeed: 200,
		health: 20,
		hasShield: false,
		shieldTimer: new ig.Timer(),
		takeDamage: function(dam) {
			if(this.hasShield == true) {
				this.hasShield = false;
			} else {
				this.receiveDamage(dam);
			}
		},
		shield: function() {
			this.hasShield = true;
			this.shieldTimer.set(10);
			this.currentAnim = this.anims.shielded;
		},
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [0]);
			this.addAnim('shielded', 1, [1]);
		}, 
		reset: function(x, y, settings) {
			this.parent(x,y,settings);
		},
		update: function() {
			
			if(ig.input.state('left')) {
				this.accel.x = -this.accelSpeed;
			}
			else if(ig.input.state('right')) {
				this.accel.x = this.accelSpeed;
			}
			
			else if(ig.input.state('down')) {
				this.accel.y = this.accelSpeed;
			}
			else if(ig.input.state('up')) {
				this.accel.y = -this.accelSpeed;
			}

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
			ig.game.spawnEntity (EntityTrail, this.pos.x-5, this.pos.y-5, {ttd: 2});
			this.updateShield();
			this.parent();

		},
		updateShield: function() {

			if(this.shieldTimer.delta() > 0) {
				this.hasShield = false;
				this.currentAnim = this.anims.idle;
			}
			if(this.hasShield == false) {
				this.currentAnim = this.anims.idle;
			}
		},

		kill: function() {
			this.parent();
			this.onDeath();
		},
		onDeath: function() {

			ig.game.gameOver();
		},


	});

});
