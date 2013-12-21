exports.create = function(_message, _talker) {
	var avatar;
	if (!_message || !_talker)
		return div;
	var div = Ti.UI.createView({
		top : 0,
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundColor : (_talker == 'me') ? 'black' : 'white'
	});
	var icon = Ti.UI.createImageView({
		top : '5dp',
		left : '5dp',
		width : '75dp',
	});
	div.add(icon);
	div.add(Ti.UI.createLabel({
		top : '10dp',
		left : '95dp',
		right : '10dp',
		color : (_talker == 'me') ? '#00FF12' : '#333',
		textAlign : 'left',
		width : Ti.UI.FILL,
		font : {
			fontSize : (_talker == 'me') ? '20dp' : '24dp',
			fontFamily : (_talker == 'me') ? 'SourceCodePro-Medium' : 'AppleGaramond-Italic'
		},
		text : _message
	}));
	var takePhoto = function() {
		require('model/camera').take({
			onsuccess : function(_me) {
				div.removeEventListener('click', takePhoto);
				icon.setImage(_me);
			}
		});
	};
	if (_talker == 'me') {
		var me = require('model/tinybrain').getMe();
		if (me == false) {
			avatar = '/assets/me.png';
			Ti.UI.createNotification({
				message : 'Please click on avatar to take a nice photo of you.'
			}).show();
			div.addEventListener('click', takePhoto);
		} else
			avatar = me;
	} else
		avatar = Ti.App.Properties.getString('avatar');
	icon.setImage(avatar);
	return div;
}; 