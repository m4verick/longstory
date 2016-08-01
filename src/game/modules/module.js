// JavaScript Document
/*
- satrio.budidharmawan -

|--root
  |--assets
  | |--images
  | |--fonts
  |--src
    |--3rd
    | |--js
    |--game ... (you are here)
*/

var m_font = "Arial";
var textHowTo;

function module()
{
	this.writeLog = function(strLog)
	{
		if (ENABLE_LOG)
		{
			console.log(strLog);
		}
	}
	
	this.drawString = function(textToDraw, props, color, posX, posY, containerbox, lineW, aligns)
	{
		this.writeLog("Draw String");
		textContent = new createjs.Text(textToDraw, props, color);
		var w = ( textContent.getMeasuredWidth() ) * textContent.scaleX;
		var h = ( textContent.getMeasuredHeight() ) * textContent.scaleY;
		textContent.textAlign = aligns; 
		
		//Check if need multiline
		if (lineW > 0)
		{
			textContent.lineWidth = lineW;
		}
		textContent.x = posX;
		textContent.y = posY;
		containerbox.addChild(textContent);
	}

	this.MoveToCenterY = function(spriteObject, screenHeight)
	{
		if (!spriteObject)
		{
			spriteObject.Y = screenHeight/2;
			return spriteObject.Y;
		}

	}

	this.MoveToCenterX = function(spriteObject, screenWidth)
	{
		if (!spriteObject)
		{
			spriteObject.X = screenWidth/2;
			return spriteObject.X;
		}
	}

	this.setImg = function(stage, img, x, y)
	{
		stage.addChild(img);
		img.x = x;
		img.y = y;
		stage.update();
	}

	this.resize = function (canvas, imgwidth, imgheight)
	{
		scale = Math.min(mainCanvas.width/imgwidth,mainCanvas.height/imgheight);
		return scale;
	}

	this.resize2 = function(keepAspectRatio)
	{
		// browser viewport size
		var w = window.innerWidth;
		var h = window.innerHeight;
		var scale = 0;
		// stage dimensions
		var ow = 480; // your stage width
		var oh = 800; // your stage height
		
		if (keepAspectRatio)
		{
			// keep aspect ratio
			scale = Math.min(w / ow, h / oh);
			mainStage.scaleX = scale;
			mainStage.scaleY = scale;
			
			// adjust canvas size
			mainStage.canvas.width = ow * scale;
			mainStage.canvas.height = oh * scale;
		}
		else
		{
			// scale to exact fit
			mainStage.scaleX = w / ow;
			mainStage.scaleY = h / oh;
		
			// adjust canvas size
			mainStage.canvas.width = ow * stage.scaleX;
			mainStage.canvas.height = oh * stage.scaleY;
		}
		
		 // update the stage
		mainStage.update()
	}

	this.GetDeviceSize = function()
	{
		var gameDiv = document.getElementById(mainCanvas);
		this.writeLog("module::GetDeviceSize()");
		this.writeLog("-->>::GetDeviceSize().w = "+gameDiv.offsetWidth);
		this.writeLog("-->>::GetDeviceSize().h = "+gameDiv.offsetHeight);
		return {
			width: gameDiv.offsetWidth,
			height: gameDiv.offsetHeight
		};
	}

	this.SetFont = function(font)
	{
		m_font = font;
	}
}

var module = new module();
