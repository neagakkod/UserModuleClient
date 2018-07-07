function LoginController()
{
	var _public = this;
	var _private = {};
	_private.lForm ;
	_private.formId ="userLoginForm";
	_private.loginBtnId = "loginBtn";
	_public.launch = function()
	{
		_private.rForm = new UserForm(_private.formId);
		_private.loginBtn = document.getElementById(_private.loginBtnId);
		_private.loginBtn.onclick = _public.submitForm ;
	}
	
	_public.submitForm = function()
	{		
		if(_private.rForm.formIsValid())
		{
			console.log(_private.rForm.getUser());
			console.log("submitting is not yet");
		}
	}
}