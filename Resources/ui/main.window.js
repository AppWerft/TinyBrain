exports.create = function() {
	var self = Ti.UI.createWindow({
		exitOnClose : true,
		backgroundColor : 'white'
	});
	var UIChatEntry = require('ui/chatentry.widget');
	self.open();
	var bg = Ti.UI.createImageView({
		image : '/assets/brain.png',
		width : Ti.UI.FILL
	});
	self.add(bg);
	self.addEventListener('click', function() {
		chatInput.focus();
	});
	self.add(Ti.UI.createImageView({
		top : 0,
		width : Ti.UI.FILL,
		image : '/assets/logo.png'
	}));
	var container = Ti.UI.createScrollView({
		top : '75dp',
		bottom : '60dp',
		width : Ti.UI.FILL,
		borderRadius : '5dp',
		contentWidth : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical',
		contentHeight : Ti.UI.SIZE
	});
	self.add(container);
	var chatInput = Ti.UI.createTextField({
		bottom : 0,
		backgroundColor : 'black',
		color : '#00FF12',
		width : Ti.UI.FILL,
		hintText : 'Message to the tinybraïn–bot',
		enableReturnKey : true,
		height : '50dp',
		font : {
			fontSize : '20dp',
			fontFamily : 'AppleGaramond-Italic'
		},
	});
	self.add(chatInput);
	self.add(Ti.UI.createImageView({
		right : '15dp',
		bottom : '5dp',
		opacity : 0.5,
		touchEnabled : false,
		bubbleParent : true,
		image : '/assets/kb.png',
		height : '40dp',
		width : Ti.UI.SIZE
	}));
	require('ui/selectbot.widget').create({
		onselected : function(_id) {
			bg.animate({
				duration : 1000,
				opacity : 0,
				top : -200,
				transform : Ti.UI.create2DMatrix({
					scale : 0.1,
					rotate : 100
				})
			});
			Ti.App.TinyBrainProxy.api({
				message : _id,
				cmd : 'talk'
			}, function(_e) {
				container.add(UIChatEntry.create(_e.data,'bot'));
			});
		}
	});
	chatInput.addEventListener('return', function() {
		if (chatInput.getValue().length < 1) {
			Ti.Android && Ti.UI.createNotification({
				message : 'Your text is too short … are you sociophobe?'
			}).show();
			chatInput.blur();
			return;
		}
		container.add(UIChatEntry.create(chatInput.getValue(), 'me'));
		container.scrollToBottom();
		Ti.App.TinyBrainProxy.api({
			message : chatInput.getValue(),
			cmd : 'talk'
		}, function(_e) {
			chatInput.setValue('');
			container.add(UIChatEntry.create(_e.data,'bot'));
			container.scrollToBottom();

		});
	});
	self.addEventListener('androidback', function() {
		var res = require('ui/publish.widget').create(self);

	});
	//  {cmd!publis  message: description}
};
