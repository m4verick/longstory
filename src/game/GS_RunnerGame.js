
var stage;
var rendered;

function init()
{
	stage = new PIXI.Container();
	renderer = PIXI.autoDetectRenderer(1024,768,{view:document.getElementById("game-canvas")});

	var farParallaxTexture = PIXI.Texture.fromImage("assets/images/parallax__.png");

	farParallax = new PIXI.extras.TilingSprite(farParallaxTexture, 1024, 768);
	farParallax.position.x = 0;
	farParallax.position.y = 0;
	farParallax.tilePosition.x = 0;
	farParallax.tilePosition.y = 0;

	stage.addChild(farParallax);

	var midParallaxTexture = PIXI.Texture.fromImage("assets/images/parallax.png");

	midParallax = new PIXI.extras.TilingSprite(midParallaxTexture, 1024, 768);
	midParallax.position.x = 0;
	midParallax.position.y = 30;
	midParallax.tilePosition.x = 0;
	midParallax.tilePosition.y = 30;

	stage.addChild(midParallax);

	requestAnimationFrame(update);
}

function update()
{
	farParallax.tilePosition.x -= 0.5;
	midParallax.tilePosition.x -= 8;

	renderer.render(stage);

	requestAnimationFrame(update);
}
