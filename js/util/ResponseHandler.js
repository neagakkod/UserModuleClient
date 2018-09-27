 function ResponseHandler(){
	var _public = this;
	var _private = {};
	_private.kickOutCodes =  [71,78]
	_private.messageBoard = new MessageBoard();
	_private.notAvailableMsg = "out of service";
	
	_private.userShouldBeKickedOut = function(codeObject)
	{
		return _private.kickOutCodes.indexOf(codeObject.code)>-1;
	}
	_public.success = function(result)
	{
		console.log(result);
	}
	
	_private.showNotAvailable = function()
	{
		alert(_private.notAvailableMsg);
	}
	_public.error= function(feedBack)
	{
		try
		{			
			console.log(feedBack);
			var errorMsg= feedBack.responseJSON;
			
			if(!errorMsg)
			{
				_private.showNotAvailable();
				return;
			}
			if(errorMsg.code && _private.userShouldBeKickedOut(errorMsg.code))
				CurrentSecurity.kickOut();
	
		}
		catch(error)
		{
			console.log(error)
		}
	}
};