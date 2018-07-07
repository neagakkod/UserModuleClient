var UserProfileController = function(app)
{
	var self = this;
	var user = app.getCurrentUser();
	var loadFormRules = function(formId){
		$('input[type=checkbox],input[type=radio],input[type=file]').uniform();
		$('select').select2();
	console.log('ddd')
		var userForm = $('#'+formId);
		var validations = {
							rules:{
								lastName:{
									required:true
								}
								,firstName:{
									required:true
								},
								email:{
									required:true,
									email: true
								},
								memberSince:{
									required:true,
									date: true
								},
								userName:{
									required:true
								}
							},
							errorClass: "help-inline",
							errorElement: "span",
							highlight:function(element, errorClass, validClass) {
								$(element).parents('.control-group').addClass('error');
							},
							unhighlight: function(element, errorClass, validClass) {
								$(element).parents('.control-group').removeClass('error');
								$(element).parents('.control-group').addClass('success');
							}
						};
		userForm.validate(validations);
		
	}
	self.loadUser = function()
	{		
		loadFormRules(app.userFormId);
		document.getElementById("lastName").value = user.lastName;
		document.getElementById("firstName").value = user.firstName;
		document.getElementById("email").value = user.email;
		document.getElementById("userName").value = user.userName;
	}
	self.launch = self.loadUser;
	
}