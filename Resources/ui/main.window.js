exports.create = function() {
	var mainWindow = Ti.UI.createWindow({
		exitOnClose : true,
		navBarHidden : true,
		backgroundColor : 'white',
	});
	var abextras = require('com.alcoapps.actionbarextras');
	mainWindow.addEventListener("open", function() {
		if (Ti.Platform.osname === "android") {
			abextras.setExtras({
				title : 'This is the title',
				subtitle : 'This is the subtitle'
			});
			var activity = mainWindow.activity;
			if (activity) {
				var ab = activity.actionBar;
				if (ab) {
					ab.displayHomeAsUp = true
				} else {
					alert('no actionbar');
				}
			} else {
				alert('no activity');
			}
		}
	});
	var UIChatEntry = require('ui/chatentry.widget');
	mainWindow.open();
	var bg = Ti.UI.createImageView({
		image : '/assets/brain.png',
		width : Ti.UI.FILL
	});
	mainWindow.add(bg);
	mainWindow.addEventListener('click', function() {
		chatInput.focus();
	});
	mainWindow.add(Ti.UI.createImageView({
		top : 0,
		width : Ti.UI.FILL,
		image : '/assets/logo.png'
	}));
	var container = Ti.UI.createScrollView({
		top : '0dp',
		bottom : '60dp',
		width : Ti.UI.FILL,
		borderRadius : '5dp',
		contentWidth : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical',
		contentHeight : Ti.UI.SIZE
	});
	mainWindow.add(container);
	var chatInput = Ti.UI.createTextField({
		bottom : 0,
		backgroundColor : 'black',
		color : '#00FF12',
		width : Ti.UI.FILL,
		hintText : 'Your question …',
		enableReturnKey : true,
		height : '50dp',
		font : {
			fontSize : '20dp',
			fontFamily : 'SourceCodePro-Medium'
		},
	});
	mainWindow.add(chatInput);
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
				container.add(UIChatEntry.create(_e.data, 'bot'));
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
			container.add(UIChatEntry.create(_e.data, 'bot'));
			container.scrollToBottom();

		});
	});
	mainWindow.addEventListener('androidback', function() {
		var res = require('ui/publish.widget').create(mainWindow);
	});

};
