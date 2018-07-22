var app = {};

app.configs = {
	commandButtonClassName:"commandButton"
  , nonCommandButtonClassName:"nonCommandButton"
  , loginPageURL: "login.html"
  , templateFolderName:"templates"
  , mainStageId:"theStage"
  ,activeMenuClass:"w3-blue"
};
var cmdManager = new CommandManager(app.configs);


cmdManager.commands.editUser  = new Command();
cmdManager.commands.editUser.templateName = "editUser.html";
cmdManager.commands.editUser.Controller = new EditUserController();


cmdManager.commands.userGrid  = new Command();
cmdManager.commands.userGrid.templateName = "userGrid.html";
cmdManager.commands.userGrid.Controller = new UserGridController();


KuaminikaRouter
.addRoute(/users/,cmdManager.clickFromRoute(cmdManager.commands.userGrid))
//.check("users")
/*
.addRoute(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.addRoute(function() {
    console.log('default');
})*/
//.check('/products/12/edit/22');