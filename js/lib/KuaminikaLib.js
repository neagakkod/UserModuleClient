var KuaminikaLib = {};

KuaminikaLib.extendFunction = function( originalFn , extraFn)
{
	 function result (){
		extraFn.apply(null,arguments);
	originalFn.apply(null,arguments);
	}
	result.arguments = originalFn.arguments;
	return result;
	
}

KuaminikaLib.objEqual = function(obj1,obj2)
{
	
	return JSON.stringify(obj1) ===JSON.stringify(obj2);
}