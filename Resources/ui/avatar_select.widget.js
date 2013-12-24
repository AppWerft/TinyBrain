exports.create = function() {
	var androidView = Ti.UI.createView({
		backgroundColor : 'white'
	});
	var widget = Ti.UI.createAlertDialog({
		androidView : androidView,
		cancel : 0,
		buttonNames : ['Cancel', 'Change avatar'],
		message : 'Here you can change the avatar image of chatbot',
		title : 'Configuration of avatar'
	});
	widget.show();
	// adding of imageselector to container:
	var verticalscrollView = Ti.UI.createScrollView({
		contentHeight : Ti.UI.SIZE,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		layout : 'vertical',
		contentWidth : Ti.UI.FILL,
		scrollType : 'vertical'
	});
	androidView.add(verticalscrollView);
	var femals = [], men = [];
	for (var i = 1; i <= 4; i++) {
		femals.push(Ti.UI.createImageView({
			image : '/assets/f' + i + '.png'
		}));
		men.push(Ti.UI.createImageView({
			image : '/assets/m' + i + '.png'
		}));
	}
	var femalsrow = Ti.UI.createScrollableView({
		views : femals
	});
	var menrow = Ti.UI.createScrollableView({
		views : men
	});
	verticalscrollView.addEventListener('swipe', function(_e) {
		if (_e.direction == 'down') {
		}
		if (_e.direction == 'up') {
		}

	});
	verticalscrollView.add(femalsrow);
	verticalscrollView.add(menrow);
	
};
