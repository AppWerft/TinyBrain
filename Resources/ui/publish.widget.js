exports.create = function(window) {
	function exitApp() {
		window.close();
		setTimeout(function() {
			Ti.Android.currentActivity.finish();
			return true;
		}, 200);
	}

	var androidView = Ti.UI.createView({
		height : '110dp',
		left : '5dp',
		right : '5dp'
	});
	var textArea = Ti.UI.createTextArea({
		height : '110dp',
		left : '10dp',
		right : '10dp'
	});
	androidView.add(textArea);
	androidView.add(Ti.UI.createImageView({
		bottom : '8dp',
		right : '13dp',
		opacity : 0.7,
		touchEnabled : false,
		width : '70dp',
		height : Ti.UI.SIZE,
		image : '/assets/cc.png'
	}));

	var widget = Ti.UI.createAlertDialog({
		androidView : androidView,
		buttonNames : ['Cancel', 'No, thanks', 'Yes, I like!'],
		message : 'Do you want to publish this talk?\n\nIn this case you can leave a message about.',
		title : ''//'Question before exiting app'
	});
	widget.addEventListener('click', function(_e) {
		switch (_e.index) {
			case 2:
				Ti.UI.createNotification({
					message : 'Talk successful published!'
				}).show();
				Ti.App.TinyBrainProxy.api({
					cmd : 'publish',
					message : textArea.getValue()
				}, exitApp);
				break;
			case 1:
				window.close();
				exitApp();
				break;
		}
	});
	widget.show();
};
