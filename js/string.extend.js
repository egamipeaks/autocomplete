String.prototype.trim = function() {
	var trimmed = this.replace(/^\s+|\s+$/g, "");
	return trimmed;
};