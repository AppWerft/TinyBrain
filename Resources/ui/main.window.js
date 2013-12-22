exports.create = function() {
	var mainWindow = Ti.UI.createWindow({
		exitOnClose : true,
		fullscreen : true,
		navBarHidden : true,
		backgroundColor : 'white',
	});
	mainWindow.addEventListener("open", function() {
		if (Ti.Platform.osname === "android") {
			var activity = mainWindow.activity;
			/* var abextras = require('com.alcoapps.actionbarextras');
			 if (abextras)
			 abextras.setExtras({ // this crash the app if abextras defined
			 title : 'This is the title',
			 subtitle : 'This is the subtitle'
			 });*/
			if (activity) {
				activity.onPrepareOptionsMenu = function(e) {
					mainWindow.chatInput.blur();
					require('ui/menu.widget').create();
				};
				//activity.actionBar.hide();
			}
		}
	});
	var UIChatEntry = require('ui/chatentry.widget');
	mainWindow.open();
	mainWindow.bg = Ti.UI.createImageView({
		image : '/assets/brain.png',
		width : Ti.UI.FILL,
		zIndex : 999
	});
	var topContainer = Ti.UI.createView({
		layout : 'vertical',
		bottom : '60dp'
	});
	mainWindow.add(topContainer);
	var logo = Ti.UI.createImageView({
		top : 0,
		width : Ti.UI.FILL,
		image : '/assets/logo.png'
	});
	logo.addEventListener('click', function() {
		mainWindow.chatInput.blur();
		require('ui/menu.widget').create();
	});
	topContainer.add(logo);
	var scrollContainer = Ti.UI.createScrollView({
		top : 0,
		bottom : 0,
		width : Ti.UI.FILL,
		contentWidth : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical',
		contentHeight : Ti.UI.SIZE
	});
	topContainer.add(scrollContainer);
	mainWindow.add(Ti.UI.createImageView({
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
			console.log('Info: bot selected ' + _id);
			mainWindow.bg.animate({
				duration : 1000,
				opacity : 0,
				top : -200,
				transform : Ti.UI.create2DMatrix({
					scale : 0.1
				})
			});
			Ti.App.TinyBrainProxy.api({
				message : _id,
				cmd : 'talk'
			}, function(_e) {
				mainWindow.chatInput = Ti.UI.createTextField({
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
				mainWindow.chatInput.addEventListener('return', function() {
					if (mainWindow.chatInput.getValue().length < 1) {
						Ti.Android && Ti.UI.createNotification({
							message : 'Your text is too short … are you sociophobe?'
						}).show();
						mainWindow.chatInput.blur();
						return;
					}
					scrollContainer.add(UIChatEntry.create(mainWindow.chatInput.getValue(), 'me'));
					Ti.App.TinyBrainProxy.api({
						message : mainWindow.chatInput.getValue(),
						cmd : 'talk'
					}, function(_e) {
						mainWindow.chatInput.setValue('');
						scrollContainer.add(UIChatEntry.create(_e.data, 'bot'));
						scrollContainer.scrollToBottom();
					});
				});
				mainWindow.add(mainWindow.chatInput);
				console.log('Info: chat started');
				scrollContainer.add(UIChatEntry.create(_e.data, 'bot'));
			});
		}
	});
	mainWindow.add(mainWindow.bg);
	mainWindow.addEventListener('androidback', function() {
		var res = require('ui/publish.widget').create(mainWindow);
	});
};
