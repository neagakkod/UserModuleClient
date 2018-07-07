var app = {};
app.configs = {
	commandButtonClassName:"commandButton"
  , loginPageURL: "login.html"
  , templateFolderName:"templates"
  , mainStageId:"mainStage"
};
var cmdManager = new CommandManager(app.configs);

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

