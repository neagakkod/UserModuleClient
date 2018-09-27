function UserForm(formId)
{
	var self = this;
	var hiddenErrorMsgClassName ="deactivatedMsg";
	var displayedErrorMsgClassName = "activedMsg";

	self.registrationFeedbackId ="registrationFeedback";
	self.feedBackMsgHolder = document.getElementById(self.registrationFeedbackId);
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
	function getFailedLoginFeedbackHolder()
	{
		var ul = document.getElementById(formId);
		return ul.firstElementChild;
		
	}
	self.showGeneralFeedback = function(msg)
	{		
		showErrorOnElement(self.feedBackMsgHolder,msg);
	}
	self.shipOffContent = function(urlAddress,content, method)
	{
		var userForm = document.getElementById(formId);
		userForm.method = method || "POST";
		
		userForm.content.value =JSON.stringify( content);
	
		userForm.action = urlAddress;
		userForm.submit();
	}
	function showErrorForField(fieldElement)
	{
		var errorHolderElement = fieldElement.nextElementSibling;
		var messageBoard = new MessageBoard();
		var errorMessage = messageBoard.getMessages().wrongFormatMsgSet[fieldElement.name];
		showErrorOnElement(errorHolderElement,errorMessage);
	}
	function showErrorOnElement(errorHolderElement,errorMessage)
	{
		errorHolderElement.innerHTML = errorMessage;
		errorHolderElement.className=errorHolderElement.className.replace(hiddenErrorMsgClassName,displayedErrorMsgClassName);
	}
	function removeErrorForFied(fieldElement)
	{
		var errorHolderElement = fieldElement.nextElementSibling;		
		errorHolderElement.className=errorHolderElement.className.replace(displayedErrorMsgClassName,hiddenErrorMsgClassName);

	}
	self.Empty = function()
	{
		var userForm = document.getElementById(formId);
		var formElements = userForm.elements;
		
		for(var i =0 ;i<formElements.length;i++)
		{
			var el = formElements[i];
			el.value = "";
		}
		self.feedBackMsgHolder.innerHTML = "";
	}
	
	self.showErrorMsg = function(errorMsg)
	{
		var messageBoard = new MessageBoard();
		var messages = messageBoard.getMessages();
		var errorHolderElement =  getFailedLoginFeedbackHolder();
		showErrorOnElement(errorHolderElement,errorMsg.messsage);
		
	}
	
	self.fillOutForm = function(user)
	{
		var userForm = document.getElementById(formId);
		var formElements = userForm.elements;
		
		for(var i =0 ;i<formElements.length;i++)
		{
			var el = formElements[i];
			formElements[i].value = user[el.name];
		}
	}
	self.formIsValid = function(fieldElement)
	{	

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
