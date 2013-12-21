exports.create = function(_args) {
	var dialog = Ti.UI.createOptionDialog({
		title : "… more brain shit",
		options : ['Play image video of developer', 'Go to website']
	});
	dialog.addEventListener('click', function(_e) {
		switch (_e.index) {
			case 1:
				var win = Ti.UI.createWindow({
					fullscreen : true
				});
				win.open();
				win.add(Ti.UI.createWebView({
					url : 'http://tinybrain.de:8080/'
				}));
				break;
			case 0:
				require('ui/video.widget').create({
					mp4 : '/assets/stefan.mp4'
				});
				break;
		}

	});
	dialog.show();
};
