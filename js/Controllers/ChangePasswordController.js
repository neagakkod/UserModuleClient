function ChangePasswordController()
{
	var _public = this;
	var _private = {};
	_private.formId ="ChangePasswordForm";//registerBtn
	_private.editBtnId = "editBtn";
	_private.templateTitleId  ="template-title";
	_private.uf ; //type form;
	_public.user_id;//
	_private.fetcher = new UserFetcher();
	_private.getUser = function()
	{
		var id = new SecureRequest(userAccount.token);
		
		_public.user_id = KuaminikaRouter.getParameter();
		id.id =_public.user_id; 
		return _private.fetcher.getUserById(id);
	}
	
	_private.writeTitle = function(user)
	{
		var titleHolder = document.getElementById(_private.templateTitleId );
		titleHolder.innerHTML += "-" +user.username; 

	}
	_private.submitForm = function()
	{			
		if(_private.uf.formIsValid())
		{
			var handler = new ResponseHandler();
			var updatedUser = _private.uf.getUser();
			var service = new UserService(); 
			
			updatedUser.id = _public.user_id;
			service.updateUser({user:updatedUser,token:userAccount.token}).then(handler.success,handler.error);
		}
	}
	_public.launch= function(){
		var handler = new ResponseHandler();
		_private.uf = new UserForm(_private.formId);
		_private.getUser()
	   .then(_private.uf.fillOutForm,handler.error)
	   .then(_private.writeTitle);
		
		_private.editBtn = document.getElementById(_private.editBtnId);
		_private.editBtn.onclick = _private.submitForm ;
	}
}