exports.create = function() {
	var mainWindow, topContainer, scrollContainer;
	var abextras = require('com.alcoapps.actionbarextras');
	mainWindow = Titanium.UI.createWindow({
		backgroundColor : '#fff',
		navBarHidden : false,
		fullscreen : true
	});
	mainWindow.addEventListener('open', function(e) {
		abextras.setExtras({
			title : 'TinyBrain',
			subtitle : 'Chat with our experts'
		});
		var activity = mainWindow.activity;
		if (activity) {
			activity.onCreateOptionsMenu = function(e) {
				var menu = e.menu;
				for ( i = 0; i <= 3; i++) {
					var menuItem = menu.add({
						title : "Option " + i,
						icon : Ti.Android.R.drawable.ic_menu_save,
						showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
					});
					menuItem.addEventListener("click", function(e) {
						Ti.API.info("Action Item " + i + " Clicked!");
					});
				}
			};
			var ab = activity.actionBar;
			if (ab) {
				ab.displayHomeAsUp = true;
			} else {
				alert('no actionbar');
			}
		} else {
			alert('no activity');
		}
	});

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
		mainWindow.chatInput.blur();
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
			abextras.setExtras({
			title : 'TinyBrain',
			subtitle : 'Chat with our expert '+ _id
		});
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
