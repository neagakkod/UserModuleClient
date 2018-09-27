var CurrentSecurity =( function(){
	var instance;
	function Security()
	{
		var _public = this;
		var _private = {};
		_public.configs = {};
		_public.init = function(configs)
		{
			_public.configs= configs;
		}
		_public.kickOut =function()
		{
			try{
			location.href = _public.configs.loginPageURL;
			}
			catch(error)
			{
				console.log(error);
			}
		}
		_public.templateIsNotInWall = function(templateName)
		{
			try{
			return _public.configs.outsideTemplates.indexOf(templateName)>-1;
			}
			catch(error)
			{
				console.log(error);
				return false;
			}
		}
	}
	if(instance)
		return instance;
	
	instance = new Security();
	return instance;
})()