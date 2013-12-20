exports.create = function() {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',

	});
	self.open();
	self.add(Ti.UI.createImageView({
		top : 0,
		width : Ti.UI.FILL,
		image : 'http://tinybrain.de/tb/tinybrain-logo.jpg'
	}));
	var container = Ti.UI.createScrollView({
		top : '100dp',
		bottom : '60dp',
		width : Ti.UI.FILL,
		contentWidth : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical',
		contentHeight : Ti.UI.SIZE
	});
	self.add(container);
	var chat = Ti.UI.createTextField({
		bottom : 0,
		width : Ti.UI.FILL,
		enableReturnKey : true,
		height : '50dp'
	});
	self.add(chat);
	chat.addEventListener('return', function() {
		console.log('Info: text to server sendet');
		require('model/tinybrain').talk({
			message : chat.getValue(),
			onload : function(_e) {
				chat.setValue('');
				console.log(_e.message);
				container.add(Ti.UI.createLabel({
					top : 0,
					textAlign : 'left',
					text : _e.message,
					color : '#333',
					font : {
						fontSize : '15dp'
					},
				}));
			}
		});

	});
	require('model/tinybrain').talk({
		message : '#27',
		onload : function(_e) {
			console.log(_e.message);
			container.add(Ti.UI.createLabel({
				top : 0,
				color : '#333',textAlign : 'left',
				width : Ti.UI.FILL,
				font : {
					fontSize : '15dp'
				},
				text : _e.message
			}));
		}
	});
};
