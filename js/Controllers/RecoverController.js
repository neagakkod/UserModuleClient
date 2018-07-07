function RecoverController()
{
	var _public = this;
	var _private = {};
	_private.rForm ;
	_private.formId ="userRecoveryForm";
	_private.recoverBtnId = "recoverBtn";
	_public.launch = function()
	{
		_private.rForm = new UserForm(_private.formId);
		_private.recoverBtn = document.getElementById(_private.recoverBtnId);
		_private.recoverBtn.onclick = _public.submitForm ;
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