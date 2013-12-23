exports.create = function() {
	console.log('Info: starting/initializing textinput on bottom');
	var widget = Ti.UI.createTextField({
		bottom : 0,
		backgroundColor : 'black',
		color : '#00FF12',
		width : Ti.UI.FILL,
		hintText : 'Your question …',
		enableReturnKey : true,
		height : '50dp',
		font : {
			fontSize : '22dp',
			fontFamily : 'SourceCodePro-Medium'
		},
	});
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
	widget.addEventListener('return', function() {
		console.log('Info: return pressed: ' + widget.getValue());
		if (widget.getValue().length < 1) {
			Ti.Android && Ti.UI.createNotification({
				message : 'Your text is too short … are you sociophobe?'
			}).show();
			widget.blur();
			;
		} else {
			widget.fireEvent('addEntry', {
				message : widget.getValue(),
				talker : 'me'
			});
			Ti.App.TinyBrainProxy.api({
				message : widget.getValue(),
				cmd : 'talk'
			}, function(_e) {
				widget.setValue('');
				widget.fireEvent('addEntry', {
					message : _e.data,
					talker : 'bot'
				});
				//scrollContainer.scrollToBottom();
			});
			
		}
	});
	return widget;
};
