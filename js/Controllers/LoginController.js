function LoginController()
{
	var _public = this;
	var _private = {};
	_private.mainPagePath = "https://vps.cybereq.com/KuaminikaWorkspace/UserModuleClient/trunk/";
	_private.service;
	_private.credentials;
	_private.formId ="userLoginForm";
	_private.loginBtnId = "loginBtn";
	_private.currentInfoKeyName  = CurrentSecurity.configs.currentInfoKeyName;
	_public.launch = function()
	{
		_private.rForm = new UserForm(_private.formId);
		_private.loginBtn = document.getElementById(_private.loginBtnId);
		_private.loginBtn.onclick = _public.submitForm ;
	}
	_private.grantAccess = function(content)
	{
		_private.rForm = new UserForm(_private.formId);
	    //not using php
		localStorage.setItem(_private.currentInfoKeyName,JSON.stringify(content));
		location.href = _private.mainPagePath;
	}
	_private.processLoginError = function(result)
	{
		_private.credentials = _private.rForm.getUser();
		var errorMsg= result.responseJSON.errorMessage || result.responseJSON;
			console.log("given credentials {0}",_private.credentials);
			if(errorMsg)
				_private.rForm.showErrorMsg(errorMsg);
	}
	_public.submitForm = function()
	{		
		if(_private.rForm.formIsValid())
		{
			_private.service = new AccountService();
			var handler = new ResponseHandler();			
				_private.credentials = _private.rForm.getUser();
			
			handler.success = KuaminikaLib.extendFunction(handler.success, _private.grantAccess);
			handler.error = _private.processLoginError; 
			
			_private.service.authenticate(_private.credentials).then(handler.success,handler.error);			
		}
	}
}