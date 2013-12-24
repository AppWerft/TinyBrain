exports.create = function() {
	var mainWindow, topContainer, scrollContainer;
	mainWindow = Titanium.UI.createWindow({
		backgroundColor : '#fff',
		navBarHidden : false,
		fullscreen : true,
		exitOnClose : true
	});
	mainWindow.addEventListener('open', require('ui/actionbar_menu.widget'));
	mainWindow.open();
	mainWindow.bg = Ti.UI.createImageView({
		image : '/assets/brain.png',
		width : Ti.UI.FILL,
		zIndex : 999
	});
	topContainer = Ti.UI.createView({
		layout : 'vertical',
		bottom : '50dp',
		backgroundColor : 'white'
	});
	mainWindow.add(topContainer);
	var logo = Ti.UI.createImageView({
		top : 0,
		width : Ti.UI.FILL,
		image : '/assets/logo.png'
	});
	logo.addEventListener('click', function() {
		mainWindow.chatInput && mainWindow.chatInput.blur();
		require('ui/menu.widget').create();
	});
	topContainer.add(logo);
	scrollContainer = Ti.UI.createScrollView({
		top : 0,
		bottom : 0,
		width : Ti.UI.FILL,
		contentWidth : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical',
		contentHeight : Ti.UI.SIZE
	});
	topContainer.add(scrollContainer);
	require('ui/selectbot.widget').create({
		onselected : function(_id) {
			console.log('Info: bot selected ' + _id);
			mainWindow.bg.animate({
				duration : 700,
				opacity : 0,
				top : -200,
				transform : Ti.UI.create2DMatrix({
					scale : 0.1
				})
			});
			Ti.App.TinyBrainProxy.api({
				message : _id,
				cmd : 'init'
			}, function(_e) {
				scrollContainer.add(require('ui/chatentry.widget').create(_e.data, 'bot'));
				mainWindow.chatInput = require('ui/input.widget').create();
				mainWindow.add(mainWindow.chatInput);
				mainWindow.chatInput.addEventListener('addEntry', function(_data) {
					scrollContainer.add(require('ui/chatentry.widget').create(_data.message, _data.talker));
					scrollContainer.scrollToBottom();
				});
			});
		}
	});
	mainWindow.add(mainWindow.bg);
	mainWindow.addEventListener('androidback', function() {
		var res = require('ui/publish.widget').create(mainWindow);
	});
};

