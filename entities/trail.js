ig.module(
	'game.entities.trail'
)
.requires(
	'impact.entity'
)
.defines(function() {
	EntityTrail = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/entities/player/trail.png', 36, 36),
		
		init:function(x, y, settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 0.1, [1,3,5,7,9,11],true);	
			this.timer = new ig.Timer(0.6);
			this.currentAnim = this.anims.idle;
			this.currentAnim.alpha = 0.1;
			this.zIndex = -10;
		},

		takeDamage: function(dam) {
			return;
		},
		update:function(){
			if(this.timer.delta() > 0) {
				this.kill();
			}
			this.parent();
		}
	})
});
