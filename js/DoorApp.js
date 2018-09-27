var app = {};
app.configs = {
	commands:{
		  commandButtonClassName:"commandButton"
		, templateFolderName:"templates"
		, mainStageId:"mainStage"
  }	
  , security : {
	  loginPageURL: "login.html",
	  outsideTemplates:["register.html","recover.html"],
	  currentInfoKeyName:"currentInfo"
  }
};
app.cmdManager = new CommandManager(app.configs.commands);
CurrentSecurity.init(app.configs.security);
var cmdManager= app.cmdManager;
//seting loginh command
cmdManager.commands.login  = new Command();
cmdManager.commands.login.templateName = "login.html";
cmdManager.commands.login.Controller = new LoginController();

$(document).ready(cmdManager.commands.login.Controller.launch);
//setting register command
cmdManager.commands.register  = new Command();
cmdManager.commands.register.templateName = "register.html";
cmdManager.commands.register.Controller = new RegisterController();
//setting recover command
cmdManager.commands.recover  = new Command();
cmdManager.commands.recover.templateName = "recover.html";
cmdManager.commands.recover.Controller = new RecoverController();

