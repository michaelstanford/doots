ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity',
	'game.entities.trail',
	'impact.entity-pool'
)
.defines(function() {
	EntityEnemy = ig.Entity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.ACTIVE,
		animSheet: new ig.AnimationSheet('media/entities/enemy/enemy.png', 36, 36 ),
		size: {x:28,y:28},
		offset: {x: 5, y:5},
		accelSpeed: 200,
		vel: {x: 100-Math.random()*200, y: 100-Math.random()*200},
		maxVel: {x:200, y:200},		
		accel: {x: 0, y:0},
		init: function(x, y, settings) {

			this.vel.x = 100-Math.random()*200;
			this.vel.y = 100-Math.random()*200;
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [0]);
		}, 
		reset: function(x, y, settings) {
			this.parent(x,y,settings);
		},
		check: function(other) {
			other.takeDamage(20);
		},
		
		takeDamage: function(dam) {
			return;
		},

		update: function() {
			this.parent();
			if (this.pos.x >= ig.system.width) {
				this.pos.x = -36;
			} else if(this.pos.x <= -36) {
				this.pos.x = ig.system.width;
			};
			if (this.pos.y >= ig.system.height) {
				this.pos.y = -36;
			} else if (this.pos.y <= -36) {
				this.pos.y = ig.system.height;
			};
			if(this.vel.x > 0) {
				this.vel.x += 0.1;
			} else {
				this.vel.x -=0.1;
			};
			if(this.vel.y > 0) {
				this.vel.y += 0.1;
			} else {
				this.vel.y -= 0.1;
			};
			ig.game.spawnEntity (EntityTrail, this.pos.x-5, this.pos.y-5, {ttd: 2});
		},


	});

	EntityBlackhole = ig.Entity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.ACTIVE,
		animSheet: new ig.AnimationSheet('media/entities/enemy/blackdoot.png', 36, 36 ),
		size: {x:28,y:28},
		offset: {x: 5, y:5},
		accelSpeed: 0,
		maxVel: {x:0, y:0},		
		accel: {x: 0, y:0},
		init: function(x, y, settings) {
			this.deathtimer = new ig.Timer(2);
			this.parent(x, y, settings);
			this.addAnim('idle', .2, [0,1,0,1,0,1,0,1,0,1]);
		}, 
		check: function(other) {
		},
		
		takeDamage: function(dam) {
			return;
		},

		update: function() {
			this.parent();
			if(this.deathtimer.delta() > 2) {
				this.kill();
			ig.game.spawnEntity (EntityEnemy, this.pos.x, this.pos.y, {ttd: 2});
			}
		}


	});

});
