function UserForm(formId)
{
	var self = this;
	var hiddenErrorMsgClassName ="deactivatedMsg";
	var displayedErrorMsgClassName = "activedMsg";
	self.getUser = function(){
		var userForm = document.getElementById(formId);
		
		var result = {};
		
		var formElements = userForm.elements;
		
		for(var i =0 ;i<formElements.length;i++)
		{
			var el = formElements[i];
			result[el.name] = formElements[i].value;
		}
		
		return result;
	}
	function showErrorForField(fieldElement)
	{
		var errorHolderElement = fieldElement.nextElementSibling;
		var messageBoard = new MessageBoard();
		var errorMessage = messageBoard.getMessages().wrongFormatMsgSet[fieldElement.name];
		errorHolderElement.innerHTML = errorMessage;
		errorHolderElement.className=errorHolderElement.className.replace(hiddenErrorMsgClassName,displayedErrorMsgClassName);
	}
	function removeErrorForFied(fieldElement)
	{
		var errorHolderElement = fieldElement.nextElementSibling;		
		errorHolderElement.className=errorHolderElement.className.replace(displayedErrorMsgClassName,hiddenErrorMsgClassName);

	}
	
	self.fillOutForm = function(user)
	{
		var userForm = document.getElementById(formId);
		var formElements = userForm.elements;
		
		for(var i =0 ;i<formElements.length;i++)
		{
			var el = formElements[i];
			formElements[i].value = user[name];
		}
	}
	self.formIsValid = function(fieldElement)
	{	
		var newUser = self.getUser();
		var userForm = document.getElementById(formId);
		var formElements = userForm.elements;
		var grade =100;
		for(var i =0 ;i<formElements.length;i++)
		{
			var el = formElements[i];
			if(el.validity.patternMismatch || el.validity.valueMissing)
			{
				showErrorForField(el);
				grade--;
			}
			else
				removeErrorForFied(el);
		}
		
		var passed = grade === 100;
		return passed;
	}
	
}
