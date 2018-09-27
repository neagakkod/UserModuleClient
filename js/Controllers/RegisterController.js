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
			//console.log(_private.uf.getUser());
			//console.log("submitting is not yet");
			
			var handler = new ResponseHandler();
			var newUser = _private.uf.getUser();
			var service = new UserService();
			newUser.motDePasse = newUser.password;
			handler.success = KuaminikaLib.extendFunction(handler.success, _private.uf.Empty);
			handler.error = KuaminikaLib.extendFunction(handler.error, function(feedBack)
			{
				var errorMsg= feedBack.responseJSON;
				 _private.uf.showGeneralFeedback(errorMsg.errorMessage);
			});
			/*function()
			{
				_private.uf.Empty();
			}		*/	
			
			service.addUser({newUser:newUser}).then(handler.success,handler.error);
		}
	}

}