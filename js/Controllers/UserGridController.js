function UserGridController()
{
	
	var _public = this;
	var _private = {};
	
	_private.fetcher = new UserFetcher();
	_private.grid = new UserGrid();
	_private.formId = "addUserForm"
	_private.formHolderId = "addUserFormHolder";
	_private.showAddFormBtnId = "showAddFormBtn";
	_private.submitBtnId = "addBtn";
	_private.addUserFormHolder;
	_private.showGridUsers = function(users)
	{
		_private.grid.setData(users);
		_private.grid.launch();
		console.log("grid launched")
	}
	_private.initGrid = function()
	{//grid
		return _private.fetcher.getAllUsers()
				.then(_private.showGridUsers);
	}
	_private.addUserIsOn = false;
	_private.togleAddUserDisplay = function()
	{
		_private.addUserFormHolder.style.display= _private.addUserIsOn?"none":"block";
		_private.addUserIsOn = !_private.addUserIsOn;
	}
	_private.submitForm = function()
	{		
		
		if(_private.uf.formIsValid())
		{
			var handler = new ResponseHandler();
			var newUser = _private.uf.getUser();
			var service = new UserService();
			newUser.motDePasse = newUser.password;
			handler.success = function()
			{
				_private.addUserFormHolder.style.display = "none";
				_private.uf.Empty();
				_private.initGrid();
			}			
			
			service.addUser({newUser:newUser}).then(handler.success,handler.error);
		}
	}
	_public.remove =function(id)
	{
		try
		{
			var handler = new ResponseHandler();
			var service = new UserService();
			var query = {};
			query.id = id;
			handler.success=_private.initGrid;
			service.deleteUser(query).then(handler.success,handler.error);
		}
		catch(err)
		{
			console.log("omg");
			console.log(err);
		}
	}
	_public.launch = function()
	{
		
		var showAddFormBtn = document.getElementById(_private.showAddFormBtnId );
		showAddFormBtn.onclick= _private.togleAddUserDisplay;
		_private.addUserFormHolder=document.getElementById(_private.formHolderId);		
		_private.uf = new UserForm(_private.formId);
		_private.submitBtn = document.getElementById(_private.submitBtnId);
		_private.submitBtn.onclick = _private.submitForm ;
		
		return _private.initGrid();
	}
}