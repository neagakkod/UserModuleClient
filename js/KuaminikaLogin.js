/*
must fill in authentificationOptions
*/


var KuaminikaLogin = function()
{
	var loginOptions = {}//"http://vps.cybereq.com:3012/api/user/autenticate/hihiMan/dsgsgsdgsd"
	loginOptions.apiServerURL = "http://vps.cybereq.com:3012/";
	loginOptions.authentificationUrl = loginOptions.apiServerURL + "api/user/autenticate/";
	loginOptions.credentials = {usr:"",pwd:""};
	
	
	var validateCredentials = function(givenCredentials){
		
		var authTresultsPromise = $.get(loginOptions.authentificationUrl+givenCredentials.usr+"/"+givenCredentials.pwd);
			console.log(givenCredentials)
			return authTresultsPromise;
	}
	return {
		options : loginOptions,
		authenticate :validateCredentials
	}
	
}