function UserGrid()
{
	var _public = this;
	var _private = {};
	_public.gridContainerId = "gridContainer"; 
	_public.gridTableStyleClass = "w3-table-all";
	_public.gridName = "userGrid";
	_public.data = [];
	_private.metaData = [{ name: "firstName", label: "First name", datatype: "string", editable: false}
						,{ name: "lastName", label: "Last name", datatype: "string", editable: false}
						,{ name: "email", label: "Email", datatype: "string", editable: false}
						,{ name: "userName", label: "Username", datatype: "string", editable: false}
						,{ name: "delete", label: " ", datatype: "html", editable: false}
						,{ name: "edit", label: " ", datatype: "html", editable: false}
						];
	
	
	_private.prepareData = function(rawData)
	{
		try
		{
			if(!rawData || !rawData.length)			
				throw "missing raw data to prepare grid";		
			_public.data=[];			
			rawData.forEach(function(el)
			{
				_public.data.push({id:el.id,values:el});
			});	
		}
		catch(error)
		{
			console.log(error)
		}
	}
	
	_public.setData = function(rawData)
	{
		_private.prepareData(rawData);
	}
	_public.remove = function(id){
		
		editableGrid.remove(id);
	}
	_public.launch = function()
	{
		console.log("grid launch called");
	
		editableGrid = new EditableGrid(_public.gridName);
		
		
		editableGrid.load({"metadata": _private.metaData, "data": _public.data});
		
		editableGrid.setCellRenderer("delete", new CellRenderer({render: function(cell, value) { 
			var rowId = cell.parentElement.id;
		var user_id =rowId.split("_")[1];
			cell.innerHTML = "<a onclick=\"if (confirm('Are you sure you want to delete this person ? ')) cmdManager.commands.userGrid.Controller.remove(" + user_id + ");\" style=\"cursor:pointer\">" +
							 "remove</a>";
		}})); 
		editableGrid.setCellRenderer("edit", new CellRenderer({render: function(cell, value) { 
		
		console.log(this.editablegrid.getRowIndex(cell))
		var rowId = cell.parentElement.id;
		var user_id =rowId.split("_")[1];
			cell.innerHTML = "<a  style=\"cursor:pointer\" class='commandButton' data-commandname='editUser' data-user_id='"+user_id+"'>edit</a>";
		}})); 
		
		editableGrid.renderGrid(_public.gridContainerId, _public.gridTableStyleClass );
	}
}