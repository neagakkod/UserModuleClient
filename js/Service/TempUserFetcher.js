function TempUserFetcher()// uses temp data
{
	var _public = this;
	var _private = {};
	//_private.cache ={};
	_private.addUserToCache = function(user)
	{
		TempUserFetcher.cache[user.id] = user;
	}
	_public.getAllUsers = function()
	{
		var allUsers = temptData;
		for (var i = 0, len = allUsers.length; i < len; i++) {
		  _private.addUserToCache(allUsers[i]);
		}
		
		return Promise.resolve(allUsers);
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
	_public.getUserById = function(id)
	{
		return Promise.resolve(TempUserFetcher.cache[id]);
	}
}
TempUserFetcher.cache = {}