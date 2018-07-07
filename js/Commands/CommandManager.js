function CommandManager(appConfigs)
{
	var commandMenuButtons =$('.'+appConfigs.commandButtonClassName);
	var self = this;
	self.wallFunction = function(){
		console.log("default wall function");
		var doorIsOpen = true;
		return Promise.resolve(doorIsOpen);
	}
	self.wallIsOn = false;
	self.commands = {};
	function processWall(templateName)
	{
		if(!self.wallIsOn )
			return Promise.resolve(templateName);
		
		return self.wallFunction()
			  .then(function(doorIsOpen){
				  
				if(!doorIsOpen)
					return Promise.reject();
				
				return Promise.resolve(templateName);
			  });
	}

	function loadTemplate(templateName)
	{
		var templateFolderName = appConfigs.templateFolderName ;
		var templatePath = templateFolderName+"/"+templateName;
		
		return new Promise (function(acc,rej){
			$('#'+appConfigs.mainStageId).load(templatePath,acc)
			});
		
	}
	function theClickFunction()
	{
		
		 var commandName = 	this.dataset.commandname;
		 commandMenuButtons.removeClass(appConfigs.activeMenuClass);
		 $(this).addClass(appConfigs.activeMenuClass);
		 var command = self.commands[commandName];
		 
		 processWall(command.templateName)
		 .then(loadTemplate)
		 .then(command.Controller.launch)
		 .then(function(){ 
			var otherCommandMenuButtons =$('.'+appConfigs.commandButtonClassName);
			otherCommandMenuButtons.click(theClickFunction);		
		 });		 
	 
	}

	commandMenuButtons.click(theClickFunction);
	
}

