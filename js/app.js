var app = {};
app.getCurrentUser = function()
{
	return { userName:"heduke",
			firstName:"Neg",
		 	 lastName:"Morne",
			    email:"neg.morne@gmail.com"
		    }
};
app.configs = {
	commandButtonClassName:"commandButton"
  , loginPageURL: "login.html"
  , templateFolderName:"templates"
  , mainStageId:"theStage"
};
var cmdManager = new CommandManager(app.configs);


cmdManager.commands.editUser  = new Command();
cmdManager.commands.editUser.templateName = "editUser.html";
cmdManager.commands.editUser.Controller = new EditUserController();