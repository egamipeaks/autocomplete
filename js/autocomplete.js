function AutoComplete(settings) {

	if(typeof settings.input != 'undefined' && settings.input != null) {
		this.input = settings.input;
	}

	if(typeof settings.dropDown != 'undefined' && settings.dropDown != null) {
		this.dropDown = settings.dropDown;
	}

	if(typeof settings.url == 'function') {
		this.url = settings.url;
	}

	if(this.input != null && this.dropDown != null)
	{
		this.init();
	}
}

AutoComplete.prototype.enabled = false;

AutoComplete.prototype.init = function() {

	var self = this;

	self.input.addEventListener('keydown', function(e){	
		if(self.enabled){
			switch(e.keyCode) {
				case Keycodes.BACKSPACE:	
					this.addEventListener('keyup', function(e){
						if(this.value == '') {
							self.disable();
						}
						this.removeEventListener('keyup', arguments.callee, false);
					});
				break;
				case Keycodes.SPACEBAR:
				case Keycodes.TAB:
					self.disable();
				break;
			}
		} else if(e.keyCode == Keycodes.CARET && (this.value == '' || true) {
		 	e.preventDefault();
		 	//this.value = '';
		 	self.enable();
		}
	});

 	self.input.addEventListener('keyup', function(e){

		if(!self.enabled || this.value.trim() == ''){
			return false;
		}
		var ajaxCall = new Ajax({
			url: self.url(),
			onError : function(err) {
				self.disable();
			},
			onComplete : function(data) {
				self.source = data.split(',');
				self.populate();
				if( e.keyCode != Keycodes.BACKSPACE 
					&& e.keyCode != Keycodes.DELETE) {
					self.autofill();
				}
			}
		}).call();
	});
}

AutoComplete.prototype.autofill = function() {
	var start = this.input.selectionStart;
	this.input.value = this.source[0];
	this.input.setSelectionRange(start, this.input.value.length);
}

AutoComplete.prototype.clear = function() {

	var matches = document.getElementById('matches');

	if(matches) {
		this.dropDown.removeChild(document.getElementById('matches'));
	}
}

AutoComplete.prototype.disable = function(){ 
	this.enabled = false;
	this.hide();
	this.clear();
}

AutoComplete.prototype.enable = function(){ 
	this.enabled = true; 
}

AutoComplete.prototype.hide = function() {
	this.dropDown.style.display = 'none';
}

AutoComplete.prototype.show = function() {
	this.dropDown.style.display = 'block';
}

AutoComplete.prototype.populate = function() {
	
	var self = this;
	this.clear();
	
	if(this.source.length > 0) {
		this.show();
		var wElement;
		var ul = document.createElement('ul');
		var match;

		ul.id = 'matches';
		
		for(var i in this.source) {
			wElement = document.createElement('li');
			wElement.appendChild(document.createTextNode(this.source[i]));
			ul.appendChild(wElement);
		}

		this.dropDown.appendChild(ul);

		for(var i in this.dropDown.getElementsByTagName('li'))
		{
		    var match = this.dropDown.getElementsByTagName('li')[i];
		    match.onclick = function(){ 
		        self.input.value = this.innerHTML;
		        self.disable();
		    }
		}
	}
}

AutoComplete.prototype.url = function(){}