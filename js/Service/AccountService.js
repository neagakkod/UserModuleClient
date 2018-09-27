function AccountService()
{
	var _public = this;
	var _private = {};
	_private.apiServerURL = "https://vps.cybereq.com:8443/api/";
	_private.realm = "user/";
	_private.requestBoard = {};
	_private.requestBoard.register     = "registerUser/";
	_private.requestBoard.authenticate = "autenticate/";
	
	_public.url = _private.apiServerURL+_private.realm;
	_public.authenticate = function(givenCredentials)
	{
		var fetchUrl = _public.url + _private.requestBoard.authenticate;
		
		var authTresultsPromise = $.get(fetchUrl+givenCredentials.username+"/"+givenCredentials.password);
		return authTresultsPromise
	}
}