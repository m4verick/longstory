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

    State Finish :
    this state triggered when user finish the game (whether success or failed)
*/

var bg		= null; //background
var m_state	= 0;
var finish_containerbox = null;
var manifest;
var canvasH;
var canvasW;
var tempWidthBg;
var tempHeightBg;

function UI_Preload()
{
	function setupManifest()
	{
		var tempManifest;
		var imgPath = "assets/images/";
		var sfxPath = "assets/sounds/sfx/";
		if(m_currentState <= 0)
		{
			m_currentState = GAME_STATE_SPLASH;
		}
		switch (m_currentState)
		{
			case GAME_STATE_SPLASH:
				tempManifest = [
				{
					src: imgPath + "splash_bg.png",
					id: "bg"
				},
				{
					src: imgPath + "message_box.png",
					id: "msgBox"
				},
				{
					src: imgPath + "cellphone.png",
					id: "cellphone"
				},
				{
					src: imgPath + "hack_button.png",
					id: "actButton"
				},
				/*
				{
					src: imgPath + "currency_icon_large.png",
					id: "currency"
				},
				*/
				/*,
				{
					src: imgPath + "hacker.png",
					id: "hacker"
				},*/
				//also do sound assets preload in here!
				{
					src: sfxPath + "bgm_Splash.mp3",
					id: "sfxBgmSplash"
				},
				{
					src: sfxPath + "bgm_Gameplay.mp3",
					id: "sfxBgmGameplay"
				},
				{
					src: sfxPath + "sfx_click1.mp3",
					id: "sfxClick1"
				},
				{
					src: sfxPath + "sfx_click2.mp3",
					id: "sfxClick2"
				},
				{
					src: sfxPath + "sfx_click3.mp3",
					id: "sfxClick3"
				},
				{
					src: sfxPath + "sfx_confirmButton.mp3",
					id: "sfxButton"
				},
				{
					src: sfxPath + "sfx_correctGuess.mp3",
					id: "sfxCorrect"
				},
				{
					src: sfxPath + "sfx_wrongGuess.mp3",
					id: "sfxWrong"
				},
				{
					src: sfxPath + "sfx_Finish.mp3",
					id: "sfxFinish"
				},
				{
					src: sfxPath + "sfx_showTutorial.mp3",
					id: "sfxTutorial"
				}
				];
				break;
			case GAME_STATE_PLAY:
				tempManifest = [
				{
					src: imgPath + "splash_bg.png",
					id: "bg"
				},
				{
					src: imgPath + "digicode_bg_num.png",
					id: "digicode"
				},
				{
					src: imgPath + "page_frame.png",
					id: "pgframe"
				},
				{
					src: imgPath + "text_box.png",
					id: "txtbox"
				}
				];
				break;
			case GAME_STATE_FINISH:
				tempManifest = [
				{
					src: imgPath + "splash_bg.png",
					id: "bg"
				},
				{
					src: imgPath + "text_box.png",
					id: "textBox"
				},
				{
					src: imgPath + "Visa_logo.png",
					id: "visaLogo"
				},
				{
					src: imgPath + "message_box_w_border.png",
					id: "msgBox"
				},
				{
					src: imgPath + "hack_button.png",
					id: "actButton"
				}
				];
				break;
			default:
				module.writeLog("State not found!");
		}
		manifest = tempManifest;
	}
	this.callPreload = function()
	{
		startPreload();
		module.writeLog("callPreload state:" + m_currentState);
	}
	function startPreload()
	{
		preload = new createjs.LoadQueue(true);
		preload.installPlugin(createjs.Sound);
		preload.on("fileload", handleFileLoad);
		preload.on("progress", handleFileProgress);
		preload.on("complete", loadComplete);
		preload.on("error", loadError);
		preload.loadManifest(manifest);

	}

	function handleFileLoad(event)
	{
		//module.writeLog("A file has loaded of type: " + event.item.type);
		var bgBounds;
		//var scaleContainer = module.resize( mainCanvas, 1024, 768);
		canvasH = mainCanvas.height;
		canvasW = mainCanvas.width;
		module.writeLog("handleFileLoad : currentState " + m_currentState);
		switch (m_currentState)
		{
			case GAME_STATE_SPLASH:
				if(event.item.id == "actButton")
				{
					var imgActButton	= new createjs.Bitmap(event.result);
					var a = imgActButton.getBounds();
					imgActButton.x = FAR_ANCHOR + 55;
					imgActButton.y = (FAR_ANCHOR << 2) + 150;
					imgActButton.on("click",main_debug.Button_onClick);
					imgActButton.scaleX = 0.5;
					imgActButton.scaleY = 0.8;
					finish_containerbox.addChild(imgActButton);
				}
				else
				if(event.item.id == "msgBox")
				{
					var imgMsgBox	= new createjs.Bitmap(event.result);
					var a = imgMsgBox.getBounds();
					imgMsgBox.x = SIDE_ANCHOR;//((canvasW-a.width)/2);
					imgMsgBox.y = (FAR_ANCHOR << 1);
					imgMsgBox.scaleX = imgMsgBox.scaleY = 0.8;
					finish_containerbox.addChild(imgMsgBox);
				}
				else
				if(event.item.id == "bg")
				{
					//create bitmap here
					var imgSplash	= new createjs.Bitmap(event.result);
					var a = imgSplash.getBounds();
					bgBounds = a;
					imgSplash.x = 0;//((canvasW-a.width)/2);
					tempWidthBg = a.width;
					finish_containerbox.addChild(imgSplash);
				}
				else
				if(event.item.id == "cellphone")
				{
					//create bitmap here
					var imgCellPhone	= new createjs.Bitmap(event.result);
					var a = imgCellPhone.getBounds();
					imgCellPhone.x = (FAR_ANCHOR << 1) + 80;
					imgCellPhone.y = (FAR_ANCHOR << 1) + 55;
					imgCellPhone.scaleX = imgCellPhone.scaleY = 0.5;
					finish_containerbox.addChild(imgCellPhone);
				}
				/*
				else
				if(event.item.id == "currency")
				{
					//create bitmap here
					var imgCurrency	= new createjs.Bitmap(event.result);
					var a = imgCurrency.getBounds();
					imgCurrency.x = (FAR_ANCHOR) + 50;
					imgCurrency.y = (FAR_ANCHOR << 1) + 85;
					imgCurrency.scaleX = imgCurrency.scaleY = 1.5;
					finish_containerbox.addChild(imgCurrency);
				}*/
				
				/*
				else
				if(event.item.id == "hacker")
				{
					//create bitmap here
					var imgCurrency	= new createjs.Bitmap(event.result);
					var a = imgCurrency.getBounds();
					imgCurrency.x = 0;
					imgCurrency.y = (FAR_ANCHOR << 2) + 100;
					imgCurrency.scaleX = imgCurrency.scaleY = 1;
					finish_containerbox.addChild(imgCurrency);
				}*/
				break;
			case GAME_STATE_PLAY:
				if(event.item.id == "digicode")
				{
					var imgDigiCode	= new createjs.Bitmap(event.result);
					var a = imgDigiCode.getBounds();
					imgDigiCode.x = 75;//((canvasW-a.width)/2);
					imgDigiCode.y = (FAR_ANCHOR<<1);
					//imgDigiCode.on("click",main_debug.Button_onClick);
					imgDigiCode.scaleX = imgDigiCode.scaleY = 0.8;
					finish_containerbox.addChild(imgDigiCode);
				}
				else
				if(event.item.id == "pgframe")
				{
					var imgPgFrame	= new createjs.Bitmap(event.result);
					var a = imgPgFrame.getBounds();
					imgPgFrame.x = 75;//((canvasW-a.width)/2);
					imgPgFrame.y = (FAR_ANCHOR << 2) + 100;
					imgPgFrame.scaleX = imgPgFrame.scaleY = 0.8;
					finish_containerbox.addChild(imgPgFrame);
				}
				else
				if(event.item.id == "bg")
				{
					var imgSplash	= new createjs.Bitmap(event.result);
					var a = imgSplash.getBounds();
					bgBounds = a;
					//to get width and height
					tempWidthBg = a.width;
					tempHeightBg = a.height;
					module.writeLog(tempWidthBg);
					module.writeLog(tempHeightBg);
					imgSplash.x = 0;//((canvasW-a.width)/2);
					finish_containerbox.addChild(imgSplash);
				}else
				if(event.item.id == "txtbox")
				{
					var imgTextBox	= new createjs.Bitmap(event.result);
					var a = imgTextBox.getBounds();
					bgBounds = a;
					imgTextBox.on("click",main_debug.Button_onClick);
					imgTextBox.x = 30;
					imgTextBox.y = (FAR_ANCHOR<<1) + 50;
					imgTextBox.scaleX = imgTextBox.scaleY = 0.8;
					finish_containerbox.addChildAt(imgTextBox,3);
				}
				break;
			case GAME_STATE_FINISH:
				if(event.item.id == "actButton")
				{
					var imgActButton	= new createjs.Bitmap(event.result);
					var a = imgActButton.getBounds();
					imgActButton.x = MED_ANCHOR;//((canvasW-a.width)/2);
					imgActButton.y = (FAR_ANCHOR<<3) - 150;
					imgActButton.on("click",main_debug.Button_onClick);
					finish_containerbox.addChild(imgActButton);
				}
				else
				if(event.item.id == "msgBox")
				{
					//module.writeLog("-->>Messagebox is loaded");
					//create bitmap here
					var imgMsgBox	= new createjs.Bitmap(event.result);
					var a = imgMsgBox.getBounds();
					imgMsgBox.x = SIDE_ANCHOR<<1;//((canvasW-a.width)/2);
					finish_containerbox.addChild(imgMsgBox);
				}
				else
				if(event.item.id == "bg")
				{
					//create bitmap here
					var imgSplash	= new createjs.Bitmap(event.result);
					var a = imgSplash.getBounds();
					bgBounds = a;
					imgSplash.x = 0;//((canvasW-a.width)/2);
					finish_containerbox.addChild(imgSplash);
				}
				else
				if(event.item.id == "visaLogo")
				{
					//create bitmap here
					var imgVisa	= new createjs.Bitmap(event.result);
					var a = imgVisa.getBounds();
					imgVisa.x = SIDE_ANCHOR<<2;//((FAR_ANCHOR*5 + a.width)/2);
					imgVisa.y = (((FAR_ANCHOR<<1) + a.height));
					finish_containerbox.addChild(imgVisa);
				}
				break;
			default:
				module.writeLog("handleFileLoad error : state not found!");
		}


		//Scale and contains the manifest to the stage
		finish_containerbox.scaleX = finish_containerbox.scaleY = Math.min(window.innerHeight/800,window.innerWidth/480);
		
		//;
		main_debug.showUI();
	}

	function loadError(evt)
	{
		module.writeLog("Error!",evt.text);
	}

	function handleFileProgress(event)
	{
		mainStage.update();
	}

	function loadComplete(event)
	{
		module.writeLog("Finished Loading Assets");
		finish_containerbox.x = (window.innerWidth - tempWidthBg)/2;
		main_debug.Update_Game();
	}
	this.Init_Builder = function()
	{
		module.writeLog("Init_Buidler()");
		mainStage = new createjs.Stage(document.getElementById("testCanvas"));
		mainCanvas = document.getElementById("testCanvas");

		mainCanvas.width =  window.innerWidth;
		mainCanvas.height =  window.innerHeight;
		finish_containerbox = new createjs.Container();
		setupManifest();
		startPreload();
		mainStage.update();
	}

}

var UI_Preload = new UI_Preload();
