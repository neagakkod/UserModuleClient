var KuaminikaLogin = function(loginOptions)
{
    loginOptions = loginOptions ||{}//"http://vps.cybereq.com:3012/api/user/autenticate/hihiMan/dsgsgsdgsd"
	loginOptions.apiServerURL = "http://vps.cybereq.com:3012/";
	loginOptions.authentificationUrl = loginOptions.apiServerURL + "api/user/autenticate/";
	loginOptions.credentials = {usr:"",pwd:""};
	
	
	var validateCredentials = function(givenCredentials){
		
		var authTresultsPromise = $.get(loginOptions.authentificationUrl+givenCredentials.usr+"/"+givenCredentials.pwd);
			
			return authTresultsPromise;
	}
	return {
		options : loginOptions,
		authenticate :validateCredentials
	}
	
}

function UserLoginController(app)
{
	var authHandler ={
		failedLogin : function(msg)
		{
			console.log(msg)
		},
		success : function(result)
		{
			
			console.log("passed")
			console.log(result)
		},
		fail: function(result)
		{
			console.log("failed")
			console.log(result)
			throw result;
		}
	}
	
	
	var authTresultsPromise = function(result)
	{		
		if(result.token)
		{
			authHandler.success(result);
			$('#app').load("index.html");
			return;
		}			
		authHandler.failedLogin(result);
		
	}
	
	app.loginPageURL = "login.html"
	app.loggedIn = false;
	app.authenticate = function(loginOptions)
	{
		loginOptions = loginOptions ||{
			passwordFieldId :"pwd",
			usrFieldId :"usr",
			loginBtnId: "loginBtn"
		}
		var loginAgent = KuaminikaLogin();
		var pwd=document.getElementById(loginOptions.passwordFieldId);
		var usr=document.getElementById(loginOptions.usrFieldId);
		
		try{
				
			loginAgent.authenticate({pwd:pwd.value,usr:usr.value})
		   .then(authTresultsPromise,authHandler.fail)
		
		}
		catch(err)
		{
			authHandler.fail(err)
		}
	}
	

		
		var loginBtn = document.getElementById(loginOptions.loginBtnId);	
		    loginBtn.addEventListener("click",app.authenticate);
}