exports.create = function(_args) {
	var dialog = Ti.UI.createOptionDialog({
		title : "–more",
		options : ['Deleting of my photo','Play image video of developer','Go to website']
	});
	dialog.addEventListener('click', function(_e) {
		
	});
	dialog.show();
};
