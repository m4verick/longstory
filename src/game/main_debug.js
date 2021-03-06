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

function main_debug()
{
	this.Init_Game = function()
	{
		//module.writeLog(TEXT.EN.SPLASH_TEXT_HACK);
		module.writeLog("Init Game");
		if (m_currentState == 0)
		{
			setState = GAME_STATE_SPLASH;
			//GS_Splash.GS_Splash_Init();
		}
		UI_Preload.Init_Builder();
	}
	
	this.setState = function(st)
	{
		m_currentState = st;
	}
	
	this.getState = function()
	{
		return m_currentState;
	}
	
	this.gotoNextState = function()
	{
		return m_currentState << 1;
	}
	this.changeState = function (st)
	{
		this.setState(st);
		//TODO : remove all elements
		//TODO : re-preload all assets for specific state
		
	}
	this.Button_onClick = function (e)
	{
		module.writeLog("Button Click");
		if(m_currentState == GAME_STATE_SPLASH)
		{
			GS_Splash.onButtonClick(e);
			module.writeLog("FINISH Button Click");
		}
		else
		if(m_currentState == GAME_STATE_PLAY)
		{
			GS_Gameplay.onButtonClick(e);
			module.writeLog("TUTORIAL BOX Button Click");
		}
		else
		if(m_currentState == GAME_STATE_FINISH)
		{
			GS_Finish.onButtonClick(e);
			module.writeLog("FINISH Button Click");
		}
	}
	
	this.showUI = function()
	{
		//module.writeLog("Show UI");
		mainContainer.addChildAt(finish_containerbox);
		module.setImg( mainStage, mainContainer, 0, 0 );
		
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick",mainStage);
	}
		
	this.Update_Game = function ()
	{
		module.writeLog("Update game");
		var tempState = 0;
		var prevState = 0;
		
		switch (m_currentState)
		{
			case GAME_STATE_SPLASH:
				GS_Splash.GS_Splash_Init();
				break;
			case GAME_STATE_PLAY:
				GS_Gameplay.GS_Gameplay_Init();
				break;
			case GAME_STATE_FINISH:
				GS_Finish.GS_Finish_Init();
				break;
			default:
				module.writeLog("Game state not found!!");
		}
	}
}

var main_debug = new main_debug();