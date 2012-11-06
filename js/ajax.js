function Ajax(settings) {

	if(typeof settings.url != 'undefined' && settings.url != null) 
	{
		this.url = settings.url;
	}

	if(typeof settings.onError == 'function') 
	{
		this.onError = settings.onError;
	}

	if(typeof settings.onComplete == 'function') 
	{
		this.onComplete = settings.onComplete;
	}
}

Ajax.prototype.url = null;

Ajax.prototype.onError = function(){}

Ajax.prototype.onComplete = function(){}

Ajax.prototype.call = function() {

	var self = this;
	var url = this.url;
	var xmlhttp;

	if (window.XMLHttpRequest)
	  xmlhttp = new XMLHttpRequest();
	else
	  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

	xmlhttp.open("GET", url, true);
	
	xmlhttp.send();

	xmlhttp.onreadystatechange = function(){

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
		    self.onComplete(xmlhttp.responseText);
	    }
	    else if(xmlhttp.status != 200 ) 
	    {
	    	self.onError(xmlhttp.responseText);
	    }
	}
}