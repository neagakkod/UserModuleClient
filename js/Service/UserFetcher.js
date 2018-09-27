function UserFetcher()// uses temp data
{
	var _public = this;
	var _private = {};
	_private.apiServerURL = "https://vps.cybereq.com:8443/api/";
	_private.realm = "user/"
	_private.requestBoard = {};
	_private.requestBoard.all = "all/";
	_private.getSecureURL = function(request)
	{
		var _secure = "secure/";
		return _private.apiServerURL + _secure + _private.realm  +request;
		
	}
	_private.addUserToCache = function(user)
	{
		UserFetcher.cache[user.id] = user;
	}
	_public.url = _private.apiServerURL+_private.realm;
	_public.getAllUsers = function()
	{
		var fetchUrl = _public.url + _private.requestBoard.all;
		var fetch = $.get(fetchUrl);
		return 	fetch.then(function(allUsers)
			{
				for (var i = 0, len = allUsers.length; i < len; i++) {
				  _private.addUserToCache(allUsers[i]);
				}
				
				return Promise.resolve(allUsers);
			})
		
		//var allUsers = temptData;		
	}
	
	_public.getCurrentUser = function()
	{
		return Promise.resolve({ username:"heduke",
				firstName:"Neg",
				 lastName:"Morne", 
					email:"neg.morne@gmail.com",
				 password:"Dqplddk1"
				});
	};
	_public.getUserById = function(SecureRequest_id)
	{
		var id = SecureRequest_id.id;
		var user = UserFetcher.cache[id];
		
		if(user)
			return Promise.resolve(user);
		var fetchUrl = _private.getSecureURL(id)+"/"+SecureRequest_id.token;
		var fetch = $.get(fetchUrl).then(function(user){
			_private.addUserToCache(user);
			return Promise.resolve(user);
		});
		
		
		return fetch;
		
	}
}
UserFetcher.cache = {}