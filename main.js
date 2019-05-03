ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
//	'impact.debug.debug',
	'game.levels.starfield',
	'game.entities.player',
	'game.entities.enemy',
	'game.entities.powerupkill',
	'game.entities.powerupshield',
	'game.entities.poweruppoints'
)
.defines(function(){

Doots = ig.Game.extend({
	
	// Load a font
	scoreText: new ig.Font('media/fonts/roboto.font.png'),
	bgMusic: new ig.Sound('media/sounds/bg.ogg'),
	score: 0,
	init: function() {
		// Initialize your game here; bind keys etc.
		this.timer = new ig.Timer(0);
		this.EnemySpawnTimer = new ig.Timer(2);
		this.PowerupTimer = new ig.Timer(4);

		this.StartingEnemyLimit = 15;
		this.NumberOfStartingEnemiesSpawned = 0;

		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

		ig.input.bind(ig.KEY.F, 'killone');
		this.bgMusic.play();
		
		this.loadLevel( LevelStarfield );
		this.spawnEntity(EntityPlayer, ig.system.width/4, ig.system.height/2);
		this.spawnEntity(EntityBlackhole, ig.system.width/2+Math.random()*100, ig.system.height/2+Math.random()*100);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		ig.game.sortEntitiesDeferred();	
		if(this.PowerupTimer.delta() > 0) {
			var killpowerups = this.getEntitiesByType('EntityPowerupkill').length;
			var shieldpowerups = this.getEntitiesByType('EntityPowerupshield').length;
			var pointpowerups = this.getEntitiesByType('EntityPoweruppoints').length;

			if(killpowerups < 1 && shieldpowerups < 1 && pointpowerups < 1) {
				var powerups = [EntityPowerupkill, EntityPowerupshield, EntityPoweruppoints];

				var powerupToSpawn = powerups[Math.floor(Math.random()*powerups.length)];
				this.spawnEntity(powerupToSpawn, Math.random()*ig.system.width, Math.random()*ig.system.height);
				this.PowerupTimer.reset();
			}
		};

			if(this.EnemySpawnTimer.delta() > 0) {
				if(this.NumberOfStartingEnemiesSpawned <= this.StartingEnemyLimit) {
					enemySettings = {vel: {x: 100-Math.random()*200, y: 100-Math.random()*200}};
					this.spawnEntity(EntityBlackhole, Math.random()*ig.system.width, Math.random()*ig.system.height, enemySettings);
					this.EnemySpawnTimer.reset();
					this.NumberOfStartingEnemiesSpawned++;
				}
			};
		
		var blobs = this.getEntitiesByType('EntityEnemy');
		var blobToKill = blobs[Math.floor(Math.random()*blobs.length)];
		
		if(ig.input.pressed('killone')) {
				blobToKill.kill();
			}

		this.parent();
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		ig.game.score = Math.ceil(this.timer.delta()*20);	
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2,
			bottomleft ={x: 40,y:ig.system.height - 40};
		this.scoreText.draw("Score: " + ig.game.score,bottomleft.x,bottomleft.y,ig.Font.ALIGN.LEFT);
	},
	gameOver: function() {
		ig.score = ig.game.score;	
		this.bgMusic.stop();
		ig.system.setGame(GameOver);
	},
});
GameOver = ig.Game.extend({
	gameOverText: new ig.Font('media/fonts/roboto.font.png'),
	init: function() {
		ig.input.bind(ig.KEY.SPACE, 'restart');
	},
	update: function() {
		if(ig.input.pressed('restart')){
			ig.system.setGame(Doots);
		}
		this.parent();
	}, 
	draw: function() {

		this.parent();
		var x = ig.system.width/2,
		y = ig.system.height/2 - 10;
		
		this.gameOverText.draw("Game Over",x, y, ig.Font.ALIGN.CENTER);
		
		this.gameOverText.draw("Score: " + ig.score,x, y+40, ig.Font.ALIGN.CENTER);

		this.gameOverText.draw("Press Space To Play Again",x, y+80, ig.Font.ALIGN.CENTER);
	},
});

StartScreen = ig.Game.extend({

	menuText: new ig.Font('media/fonts/roboto.font.png'),
	logo: new ig.Image('media/doots.png'),
	init: function() {

		this.loadLevel( LevelStarfield );
		ig.input.bind( ig.KEY.SPACE, 'start');
		for(var i = 0;i < 20;i++) {
			this.spawnEntity(EntityEnemy, Math.random()*ig.system.width, Math.random()*ig.system.height);
		}

	},
	update: function() {
		
		ig.game.sortEntitiesDeferred();	
		if(ig.input.pressed('start')) {
			ig.system.setGame(Doots);
		}
			this.parent();
	},
	draw: function() {
		this.parent();
		var x = ig.system.width/2,
		y = ig.system.height/2 - 10;
		this.logo.draw(x-this.logo.width/2,y-60);	
		this.menuText.draw("Press Space To Play Doots",x, y, ig.Font.ALIGN.CENTER);
	},
});
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 960, 640, 1 );

});
