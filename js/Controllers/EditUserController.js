function EditUserController()
{
	var _public = this;
	var _private = {};
	_private.formId ="EditUserForm";//registerBtn
	_private.editBtnId = "editBtn";
	_private.uf ; //type form;
	_public.user_id;//
	_private.fetcher = new UserFetcher();
	_private.getUser = function()
	{
		var showCureentUser = parseInt(_public.user_id) === -1;
		if(showCureentUser)
		{
			 return _private.fetcher.getCurrentUser();
		}
		
		return _private.fetcher.getUserById(_public.user_id);
	}
	
	
	_private.submitForm = function()
	{			
		if(_private.uf.formIsValid())
		{
			var handler = new ResponseHandler();
			var updatedUser = _private.uf.getUser();
			var service = new UserService();
			
			updatedUser.id = _public.user_id;
			service.updateUser({updatedUser:updatedUser,token:userAccount.token}).then(handler.success,handler.error);
		}
	}
	_public.launch= function(){
		_private.uf = new UserForm(_private.formId);
		_private.getUser()
	   .then(_private.uf.fillOutForm);
		
		_private.editBtn = document.getElementById(_private.editBtnId);
		_private.editBtn.onclick = _private.submitForm ;
	}
}