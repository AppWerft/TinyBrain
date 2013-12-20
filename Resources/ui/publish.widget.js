exports.create = function(window) {
	function exitApp() {
		window.close();
		setTimeout(function() {
			Ti.Android.currentActivity.finish();
			return true;
		}, 200);
	}

	var androidView = Ti.UI.createView({
		height : '150dp',
		left : '5dp',
		right : '5dp'
	});
	var textArea = Ti.UI.createTextArea({
		height : '150dp',
		left : '10dp',
		right : '10dp'
	});
	textArea.add(Ti.UI.createImageView({
		bottom : 0,
		right : 0,
		touchEnabled : false,
		width : '100dp',
		image : '/assets/cc.png'
	}));
	androidView.add(textArea);
	var widget = Ti.UI.createAlertDialog({
		androidView : androidView,
		buttonNames : ['Cancel', 'No, thanks', 'Yes, I like!'],
		message : 'Do you want to publish this talk?\n\nIn this case you can leave a message about.',
		title : 'Question before exiting app'
	});
	widget.addEventListener('click', function(_e) {
		switch (_e.index) {
			case 2:
				Ti.App.TinyBrainProxy.talk({
					message : '!publish',
					onload : exitApp
				});
				break;
			case 1:
				window.close();
				exitApp();
				break;
		}
	});
	widget.show();
};
