/*var imported = document.createElement('script');
imported.src = 'js/UserLoginController.js';
document.head.appendChild(imported);
*/
var app = {}
app.loginPageURL = "login.html";
app.contentId = "content";
app.activeMenuClass = "active";
app.templateFolderName = "template";
app.loggedIn= true;
app.userFormId = "userForm";
app.getCurrentUser = function()
{
	return { userName:"heduke",
			firstName:"Neg",
		 	 lastName:"Morne",
			    email:"neg.morne@gmail.com"
		    }
}



var cmdManager = new CommandManager(app);

cmdManager.commands.profile.controller = new UserProfileController(app);
cmdManager.commands.buyTokens.controller = new TokenMarketController(app);
////////

var onLoginPage = location.href.indexOf(app.loginPageURL)>0
var notOnLoginPageIlleagaly = !app.loggedIn && !onLoginPage;
if(notOnLoginPageIlleagaly || onLoginPage)
{
	
	try
	{
		
		$.getScript('js/UserLoginController.js', function()
		{
			if(notOnLoginPageIlleagaly)
				location.href = app.loginPageURL;
			
			var loginController = new UserLoginController(app);
		});
	}
	catch(ex)
	{
		console.error(ex);
	}

}






