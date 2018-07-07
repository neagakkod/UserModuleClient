function EditUserController()
{
		var _public = this;
	var _private = {};
	_private.formId ="EditUserForm";//registerBtn
	_private.editBtnId = "editBtn";
	_private.uf ;
	
	
	_public.launch= function(){
		_private.uf = new UserForm(_private.formId);
		_private.editBtn = document.getElementById(_private.editBtnId);
		_private.editBtn.onclick = _public.submitForm ;
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