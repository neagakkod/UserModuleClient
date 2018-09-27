



app.cmdManager = new CommandManager(app.configs);

	app.token = userAccount.token;
	app.currentUser = userAccount.user;

var cmdManager = app.cmdManager;

//updatePassword

cmdManager.addCommand("editUser","editUser.html",EditUserController);
cmdManager.addCommand("userGrid","userGrid.html",UserGridController);
cmdManager.addCommand("changePassword","changePassword.html",ChangePasswordController);
/*
cmdManager.commands.editUser  = new Command();
cmdManager.commands.editUser.templateName = "editUser.html";
cmdManager.commands.editUser.Controller = new EditUserController();
cmdManager.commands.userGrid  = new Command();
cmdManager.commands.userGrid.templateName = "userGrid.html";
cmdManager.commands.userGrid.Controller = new UserGridController();
*/
var currentLocation = KuaminikaRouter.getCurrentLocation();
KuaminikaRouter
.addRoute(/users$/,cmdManager.clickFromRoute(cmdManager.commands.userGrid))
.addRoute(/users\/changePassword\/\d+/,cmdManager.clickFromRoute(cmdManager.commands.changePassword))

KuaminikaRouter.check(currentLocation)
/*
.addRoute(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.addRoute(function() {
    console.log('default');
})*/
//.check('/products/12/edit/22');