exports.create = function(_args) {
	var options = ['#30 Eliza', '#29 Dr. Mabuse','#27 Dr. No'];
	
	var dialog = Ti.UI.createOptionDialog({
		title : "Hello, I'm TinyBrїan. please choose a personalitzy for me.",
		options : options
	});
	dialog.addEventListener('click', function(_e) {
		if (_e.index >= 0) {
			var res = options[_e.index].match(/^(.*?)\s/);
			_args.onclick(res[1]);
		}	
	});   
	dialog.show();
};
