var colors = ['#330000', '#3333cc'];
	var colorndx = 0;

exports.create = function(_message, _talker) {
	var avatar;
	var div = Ti.UI.createView({
		top : 0,
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	if (!_message || !_talker)
		return div;
	var icon = Ti.UI.createImageView({
		top : '10dp',
		left : '5dp',
		width : '75dp',
	});
	div.add(icon);
	div.add(Ti.UI.createLabel({
		top : 0,
		left : '95dp',
		right : '10dp',
		color : colors[colorndx % 2],
		textAlign : 'left',
		width : Ti.UI.FILL,
		font : {
			fontSize : '25dp',
			fontFamily : 'AppleGaramond-Italic'
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
				message : 'Please click here to take a nice photo of you.'
			}).show();
			div.addEventListener('click', takePhoto);
		} else {
			avatar = me;
			// Ti.Blob
		}
	} else
		avatar = '/assets/' + _talker + '.png';
	icon.setImage(avatar);
	colorndx++;
	return div;
};
