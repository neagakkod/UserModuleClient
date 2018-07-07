function RegisterController()
{
	var _public = this;
	var _private = {};
	_private.formId ="userRegistrationForm";//registerBtn
	_private.registerBtnId = "registerBtn";
	_private.uf ;
	
	
	_public.launch= function(){
		_private.uf = new UserForm(_private.formId);
		_private.registerBtn = document.getElementById(_private.registerBtnId);
		_private.registerBtn.onclick = _public.submitForm ;
	}
	
	
	
	
	_public.submitForm = function()
	{		
		if(_private.uf.formIsValid())
		{
			console.log(_private.uf.getUser());
			console.log("submitting is not yet");
		}
	}

}