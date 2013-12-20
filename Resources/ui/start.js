exports.create = function() {
	var self = Ti.UI.createWindow({
		backgroundColor : '#ccc',
		exitOnClose : true
	});
	self.proxy = require('model/tinybrain');
	self.open();
	var bg = Ti.UI.createImageView({
		image : '/assets/brain.png',
		width : Ti.UI.FILL
	});
	self.addEventListener('click', function() {
		chatInput.focus();
	});
	self.add(bg);

	var colors = ['#330000', '#3333cc'];
	var colorndx = 0;
	function writeMessage(foo, avatar) {
		colorndx++;
		var div = Ti.UI.createView({
			top : 0,
			height : Ti.UI.SIZE,
			width : Ti.UI.FILL
		});
		container.add(div);
		if (avatar)
			div.add(Ti.UI.createImageView({
				top : '10dp',
				left : '5dp',width:'80dp',
				image : '/assets/' + avatar + '.png'
			}));
		div.add(Ti.UI.createLabel({
			top : 0,
			left : (avatar) ? '90dp' : '10dp',
			right : '10dp',
			color : colors[colorndx % 2],
			textAlign : 'left',
			width : Ti.UI.FILL,
			font : {
				fontSize : '25dp',
				fontFamily : 'AppleGaramond-Italic'
			},
			text : foo
		}));
	}
	self.add(Ti.UI.createImageView({
		top : '0dp',
		width : Ti.UI.FILL,
		image : '/assets/logo.png'
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
	var chatInput = Ti.UI.createTextField({
		bottom : 0,
		backgroundColor : 'black',
		color : '#00FF12',
		width : Ti.UI.FILL,
		hintText : 'Message to the tinybraїn–bot',
		enableReturnKey : true,
		height : '50dp'
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
	chatInput.addEventListener('return', function() {
		if (chatInput.getValue().length < 1) {
			Ti.Android && Ti.UI.createNotification({
				message : 'Your text is too short … are you sociophobe?'
			}).show();
			chatInput.blur();
			return;
		}
		writeMessage(chatInput.getValue(),'me');
		self.proxy.talk({
			message : chatInput.getValue(),
			onload : function(_e) {
				chatInput.setValue('');
				console.log(_e.message);
				writeMessage(_e.message, 'eliza');
			}
		});
	});
	require('ui/select_chat.widget').create({
		onclick : function(_e) {
			bg.animate({
				duration : 1000,
				opacity : 0,
				top : -200,
				transform : Ti.UI.create2DMatrix({
					scale : 0.1,
					rotate : 100
				})
			});
			self.proxy.talk({
				message : _e,
				onload : function(_e) {
					writeMessage(_e.message, 'eliza');
				}
			});
		}
	});

	Ti.Gesture.addEventListener('shake', function() {
		Ti.Media.vibrate();
		/*container.removeAllChildren();
		 self.proxy.talk({
		 cmd : '!restart',
		 onload : function(_e) {
		 writeMessage(_e.message);
		 }
		 });*/
	});
	//  {cmd!publis  message: description}
};
