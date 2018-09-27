function CommandManager(appConfigs)
{
	/* var commandMenuButtons =$('.'+appConfigs.commandButtonClassName);
	var nonCommandButtons = $('.'+appConfigs.nonCommandButtonClassName); */
	var commandMenuButtons, nonCommandButtons ;
	var self = this;
	
	function catchPromiseReject(msg)
	{
		console.log(msg);
	}
	self.wallFunction = function(templateName){
		console.log("default wall function");
		var doorIsOpen = app.currentUser||CurrentSecurity.templateIsNotInWall(templateName);
		return Promise.resolve(doorIsOpen);
	}
	self.wallIsOn = true; // dev only
	self.commands = {};
	function processWall(templateName)
	{
		if(!self.wallIsOn )
			return Promise.resolve(templateName);
		
		return self.wallFunction(templateName)
			  .then(function(doorIsOpen){
				  
				if(!doorIsOpen)
				{
					CurrentSecurity.kickOut();
					//return Promise.reject();
				}
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
	function addCommand (commandName, commandTemplate,Controller)
	{
		cmdManager.commands[commandName]  = new Command();
		cmdManager.commands[commandName].templateName = commandTemplate;
		cmdManager.commands[commandName].Controller = new Controller();
	}
	self.addCommand = addCommand;
	self.clickFromRoute  = function(command)
	{
		return function ()
		{		
			processWall(command.templateName)
		 	.then(loadTemplate)
			.then(command.Controller.launch)
			.then(itniButtons)
			.catch(catchPromiseReject);
		}
	}
	
	function itniButtons()
	{
		 commandMenuButtons =$('.'+appConfigs.commandButtonClassName);
		 nonCommandButtons = $('.'+appConfigs.nonCommandButtonClassName);
	
		
		nonCommandButtons.unbind().click(function()
		{
			KuaminikaRouter.check(this.href);
			
		});
		commandMenuButtons.unbind().click(theClickFunction);
	}
	
	function theClickFunction()
	{

		// changes page without router
		 var commandName = 	this.dataset.commandname;
		 commandMenuButtons.removeClass(appConfigs.activeMenuClass);
		 $(this).addClass(appConfigs.activeMenuClass);
		 var command = self.commands[commandName];
		 Object.assign(command.Controller,this.dataset);
		 processWall(command.templateName)
		 .then(loadTemplate)
		 .then(command.Controller.launch)
		 .then(itniButtons)
		.catch(catchPromiseReject);
	 
	}

	
	itniButtons();
}

