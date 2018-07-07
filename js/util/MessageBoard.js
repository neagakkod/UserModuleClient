function MessageBoard(options)
{
	options = options || {};
	options.language = options.language || "en";
	
	var _public = this;
	var _private = {};
	_private.languageSet = {};
	_public.currentLanguage = options.language;
	_public.getMessages = function()
						{ return _private.languageSet[_public.currentLanguage];	}
	
	// english messages	
	var english = {
					wrongFormatMsgSet : {
						firstName: "This is a required non numerical field"
					,	lastName: "This is a required non numerical field"
					,	email:"This is not a valid email format"
					,	username: "This is a  required alphanumerical field"
					,	password:"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
					} 
				};
	_private.languageSet.en = english;
}