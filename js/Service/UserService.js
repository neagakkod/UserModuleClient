function UserService()
{
	var _public = this;
	var _private = {};
	_private.apiServerURL = "https://vps.cybereq.com:8443/api/";
	_private.realm = "user/"
	//https://vps.cybereq.com:3012/api/user/registerUser/
		_private.requestBoard = {};
	
	_private.requestBoard.add = "registerUser/";
	_private.requestBoard.update = "update/";
	_private.requestBoard.remove = "remove/";
	
	_public.url = _private.apiServerURL+_private.realm;
	_private.getSecureURL = function(request)
	{
		var _secure = "secure/";
		return _private.apiServerURL + _secure + _private.realm  +request;
		
	}
	_public.addUser = function(user)
	{
		var fetchUrl = _public.url + _private.requestBoard.add;
		var fetch = $.post(fetchUrl,user);
		return 	fetch;
		
	}
	
	_public.updateUser = function(user)
	{
		var fetchUrl =_private.getSecureURL(_private.requestBoard.update);
		var fetch = $.post(fetchUrl,user);
		return 	fetch;
	}


	_public.deleteUser = function(id)
	{
		var fetchUrl =_private.getSecureURL(_private.requestBoard.remove);
		var fetch = $.post(fetchUrl,id);
		return 	fetch;
	}
}