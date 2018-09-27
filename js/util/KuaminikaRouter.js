/*
I cannot take all credit for this.. it was heavily influenced by this article:
http://krasimirtsonev.com/blog/article/A-modern-JavaScript-result-in-100-lines-history-api-pushState-hash-url
*/

var KuaminikaRouter = (function(){
	var result = {};

	result.routes = [];
	result.mode = null;
	result.root = "/";
	result.config = function(options)
	{
		var itHasPushState = !! (history.pushState)
		var modeShouldbeHistory = options && options.mode && options.mode == 'history' 
						&& itHasPushState;
		this.mode = modeShouldbeHistory ? "history":"hash";
		this.root = options && options.root ? "/":clearSlashes(options.root);
		return this;
	}
	function clearSlashes(path)
	{
		return path.toString().replace(/\/$/, '').replace(/^\//, '');
	}
	function removeRootIfItsNotSlash(currentLocation)
	{
		return  this.root != '/' ? currentLocation.replace(this.root,''):currentLocation;
	}
	function getCurrentWithHistorymode(currentLocation)
	{
		currentLocation = clearSlashes(decodeURI(location.pathname + location.search));
		currentLocation = removeRootIfItsNotSlash(currentLocation.replace(/\?(.*)$/, ''));
	}
	function getParameter()
	{
		var currentLocation = this.getCurrentLocation();
		var portions = currentLocation.split("/");
		return portions[portions.length-1];
	}	

	result.getParameter = getParameter;
	result.addRoute = function(re,handler)
	{
		 if(typeof re == 'function') {
			handler = re;
			re = '';
		}
		this.routes.push({ re: re, handler: handler});
		return this;
	}
	result.removeRoute =  function(param) 
	{
		for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) 
		{
			if(r.handler === param || r.re.toString() === param.toString())
			{
				this.routes.splice(i, 1); 
				return this;
			}
		}
		return this;
	}
	result.getCurrentLocation = function()
	{
		var currentLocation = "";
		if (this.mode === "history")
		{
			getCurrentWithHistorymode(currentLocation);
		}
		else
		{
			 var match = window.location.href.match(/#(.*)$/);
			currentLocation = match ? match[1] : '';
		}
		return clearSlashes(currentLocation);
		
	}
	result.flushRoutes = function()
	{
		   this.routes = [];
			this.mode = null;
			this.root = '/';
			return this;
	}
	
	result.check= function(f) {
		var currentLocation = f || this.getCurrentLocation();
		for(var i=0; i<this.routes.length; i++) {
			var match = currentLocation.match(this.routes[i].re);
			if(match) {
				match.shift();
				this.routes[i].handler.apply({}, match);
				return this;
			}           
		}
		return this;
	}
	return result;
})()