exports.create = function() {
	console.log('Info: starting/initializing textwidget.input on bottom');
	var widget = Ti.UI.createView({
		bottom : 0,
		backgroundColor : '#444',
		color : '#00FF12',
		width : Ti.UI.FILL,
		height : '50dp',
		borderRadius : '5dp',
	});
	widget.input = Ti.UI.createTextField({
		bottom : 0,
		backgroundColor : '#444',
		color : '#00FF12',
		borderRadius : '5dp',
		width : Ti.UI.FILL,
		hintText : 'Your question …',
		enableReturnKey : true,
		font : {
			fontSize : '22dp',
			fontFamily : 'SourceCodePro-Medium'
		}
	});
	widget.add(widget.input);
	widget.add(Ti.UI.createImageView({
		right : '15dp',
		bottom : '5dp',
		opacity : 0.5,
		touchEnabled : false,
		bubbleParent : true,
		zIndex : 9999,
		image : '/assets/kb.png',
		height : '40dp',
		width : Ti.UI.SIZE
	}));
	widget.input.addEventListener('return', function() {
		console.log('Info: return pressed: ' + widget.input.getValue());
		if (widget.input.getValue().length < 1) {
			Ti.Android && Ti.UI.createNotification({
				message : 'Your text is too short … are you sociophobe?'
			}).show();
			widget.input.blur();

		} else {
			widget.fireEvent('addEntry', {
				message : widget.input.getValue(),
				talker : 'me'
			});
			Ti.App.TinyBrainProxy.api({
				message : widget.input.getValue(),
				cmd : 'talk'
			}, function(_e) {
				widget.input.setValue('');
				Ti.App.TinyBrainProxy.speak(_e.data);
				widget.fireEvent('addEntry', {
					message : _e.data,
					talker : 'bot'
				});
		
			});
		}
	});
	return widget;
};
