/*!
  * GyroPalm JavaScript GUI Helper (aka GyroPalm Vertex)
  * Copyright 2015-2022 by GyroPalm, LLC. Code written by Dominick Lee for GyroPalm.
  * Licensed under MIT (https://github.com/GyroPalm/GyroPalm-JavaScript-SDK/blob/main/LICENSE)
  *
  * By using this library, you agree to be bound by the GyroPalm Terms of Use and Disclaimer.
  * You can find the complete terms at https://gyropalm.com/legal/terms/
  *
  *	This script is intended as a supplement to the GyroPalm JavaScript SDK. 
  *	It contains functions to dynamically load jQuery if not included and show GyroPalm connection interface.
  */
  
var useCDN = false;	//change to false for debugging
var baseURL = "https://app.gyropalm.com/api/sdk/javascript/";
if (useCDN) {
	baseURL = "https://cdn.jsdelivr.net/gh/GyroPalm/GyroPalm-JavaScript-SDK@latest/";
}

function loadJS(url, callback, failed) {
    // Adding the script tag to the head
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;	//load JS URL

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;
	script.onerror = failed;
	script.onabort = failed;

    // Fire the loading
    head.appendChild(script);
}

// Load CSS file dynamically
function loadCSS(url) {
	$("<link/>", {
	   rel: "stylesheet",
	   type: "text/css",
	   href: url
	}).appendTo("head");
}

if (window.jQuery) {	// If jQuery is already loaded
	jQueryComplete();
	
} else {	// Try to load jQuery if the current site does not have it
	loadJS("https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js", jQueryComplete, onFailed);
}

// Add an event listener for the login event
window.addEventListener("message", function(event) {
	// Print the message data to the console
	if (event.origin == "https://app.gyropalm.com") {
		if (typeof event.data !== "string" || !event.data.startsWith("{")) {
			return;	// Return if the data is not a JSON string
		}
		var respObj = JSON.parse(event.data);
		if ("status" in respObj) {
			if (respObj.status === "ok") {
				localStorage.setItem("gprealtimesession", event.data);
				console.log("GP Login Successful");
				updateView();
			}
		}
	}
});

function openLoginWindow() {
	var screenWidth = screen.width;
	var left = Math.max(0, (screenWidth - 550) / 2); // Calculate the left position for the pop-up window
    // Create the pop-up window with the specified width and height
    var popup = window.open("https://app.gyropalm.com/beta/gpsdklogin", "GyroPalm - Sign In", "width=460, height=550, top=80, left=" + left);
}

function gpSignOutUser() {
	if (localStorage.hasOwnProperty("gprealtimesession")) {	//key exists in storage
		delete localStorage.gprealtimesession;
		updateView();
	}
}

function onFailed() {
	console.log("There was an issue loading GyroPalm GUI on this site");
}

function setItemDisplay(itm, isVisible) {
	if (isVisible) {
		$('#'+itm).removeClass("gp-hidden");
	} else {
		$('#'+itm).addClass("gp-hidden");
	}
}

function updateView() {
	// Update the view depending on existence of localStorage session
	if (localStorage.hasOwnProperty("gprealtimesession")) {	//key exists in storage
		setItemDisplay('pnlSignIn', false);	//hide
		setItemDisplay('pnlStatus', true);	//show
		setItemDisplay('pnlUser', true);	//show
		setItemDisplay('pnlLogs', true);	//show
		setItemDisplay('gpguibtn-signout', true);	//show
	} else {	//key does not exist
		setItemDisplay('pnlSignIn', true);	//show
		setItemDisplay('pnlStatus', false);	//hide
		setItemDisplay('pnlUser', false);	//hide
		setItemDisplay('pnlLogs', false);	//hide
		setItemDisplay('gpguibtn-signout', false);	//hide
	}
}

function attachPageVisibility() {
  document.addEventListener('visibilitychange', function() {
	var pageTitle = $(document).attr('title');
	var pageDomain = location.protocol + '//' + location.host;
	var pageURL = location.href;
    if (document.hidden) {	//tab hidden
	  let pageInfo = {visible:false, title:pageTitle, domain:pageDomain, url:pageURL};
	  appendToLog(pageInfo);
    } else {	//tab visible
      let pageInfo = {visible:true, title:pageTitle, domain:pageDomain, url:pageURL};
	  appendToLog(pageInfo);
    }
  });
}

function showConnectionStatus(id, txt, isOnline)
{
  if (isOnline) {
	let led = $('#'+id).find(".gp-online-indicator");
	let blink = $('#'+id).find(".gp-blink");
	let lbl = $('#'+id).find("p");
	led.css('background-color', '#0fcc45');
	blink.removeClass("gp-hidden");
	if (txt.includes("Status")) {
		lbl.text(txt+": Online");
	}
	if (txt.includes("Cloud")) {
		lbl.text(txt+": Connected");
	}
  } else {
	let led = $('#'+id).find(".gp-online-indicator");
	let blink = $('#'+id).find(".gp-blink");
	let lbl = $('#'+id).find("p");
	led.css('background-color', '#bc0202');
	blink.addClass("gp-hidden");
	if (txt.includes("Status")) {
		lbl.text(txt+": Offline");
	}
	if (txt.includes("Cloud")) {
		lbl.text(txt+": Not Connected");
	}
  }
}

function appendToLog(line) {
	if (typeof line === 'object' && !Array.isArray(line) && line !== null)	{
		line = JSON.stringify(line);
	}
	$("#gpeventtext").val($("#gpeventtext").val() + line + "\n");
	$("#gpeventtext").scrollTop($("#gpeventtext")[0].scrollHeight);
}

function gpShowCodeModal(setVisible) {
	if (setVisible) {
		$("#gpcodemodalbg").fadeIn()
		$("#gpcodemodal").slideDown("slow");
	} else {
		$("#gpcodemodalbg").fadeOut()
		$("#gpcodemodal").slideUp("slow");
	}
}

function gpSetCustomEditorCode(code) {
	var gpguicustomeditor = ace.edit($('#gpgui-customcode')[0]);
	gpguicustomeditor.session.setValue(code);
}

function gpGetCustomEditorCode() {
	var gpguicustomeditor = ace.edit($('#gpgui-customcode')[0]);
	return gpguicustomeditor.session.getValue(gpguicustomeditor);
}

function gpSetPluginName(name) {
	$('#gpgui-appname').text("Plugin: "+name);
}

function gpFetchJsCode(mT) {
    var gpJsPlugin = {};
    var encodedUrl = encodeURIComponent(window.location.href);
    $.ajax({
        url: 'https://app.gyropalm.com/beta/vertex/getjs?url='+ encodedUrl+'&mt='+mT,
        type: 'get',
        async: false,
        success: function(response) {
            try {
                var data = JSON.parse(response);
                if (Object.keys(data).length !== 0){
					gpJsPlugin = data;
                    let javascript = data.javascript;
                    let appName = data.appName;
                    let appID = data.appID;
					if (javascript.length > 1) {
						gpSetCustomEditorCode(javascript);
						gpJsEditorCodeChanged = false;
					}
					gpSetPluginName(appName);
					$('#gpVertAppID').val(appID);
                }
            } catch (e) {
				if (response.startsWith("<!DOCTYPE html>")) {
					console.log("Please sign into GyroPalm to use Vertex");
				} else {
					console.log("No plugin found for this site");
				}
            }
        }
    });
	return gpJsPlugin;
}

function gpUpdateJsCode(mT) {
    var result;
	let pluginID = $('#gpVertAppID').val();
	let jsCode = gpGetCustomEditorCode();
    $.ajax({
        url: 'https://app.gyropalm.com/beta/vertex/updatejs/' + pluginID,
        type: 'POST',
		async: false,
        data: { mT: mT, js: jsCode },
        success: function(response) {
            if (response === 'true') {
                result = true;
            } else {
                result = false;
            }
        }
    });
    return result;
}

function gpSaveCodeBtn() {
	if (localStorage.hasOwnProperty("gprealtimesession")) {
		var respObj = JSON.parse(localStorage.gprealtimesession);
		if ("masterToken" in respObj) {
			let res = gpUpdateJsCode(respObj.masterToken);
			if (res) {
				$.confirm({
					title: 'Saved successfully!',
					content: 'Code has been updated. Please refresh the browser to see changes.',
					autoClose: 'ok|2500',
					backgroundDismiss: true,
					type: 'blue',
					theme: 'dark',
					buttons: {
						ok: {
							btnClass: 'btn-blue',
							keys: ['enter', 'esc'],
							action: function() {}
						}
					}
				});
				gpJsEditorCodeChanged = false;
			} else {
				$.alert({
					title: 'Failed to Save Code',
					content: 'Sorry, an error has occurred while saving.',
					type: 'red',
					theme: 'dark',
				});
			}
		} else {
			$.alert({
				title: 'Failed to Save Code',
				content: 'Sorry, you must be logged in to save code.',
				type: 'red',
				theme: 'dark',
			});
		}
	} else {
		$.alert({
			title: 'Failed to Save Code',
			content: 'Sorry, you must be logged in to save code.',
			type: 'red',
			theme: 'dark',
		});
	}
}

var gpObj;
var gpEvalReady = false;
var gpJsEditorCodeChanged = false;

// Runs after jQuery has loaded
function jQueryComplete() {
	console.log("jQuery loaded");
	
	$('body').append("<div id=\"flyout_menu\" class=\"social_media_margin_pseudo hide_flyout_menu_onload\">\r\n\
	<div class=\"arrow_menu pointer arrow_menu_right\" id=\"gpBtnArrow\">\r\n\
	<div tabindex=\"0\" class=\"arrow_menu_triangle triangle_left\"><\/div>\r\n\
	<\/div>\r\n        <div id=\"panel_flyout_parent\">\r\n            <!--IMPORTANT! Don\'t change anything above this comment.-->\r\n            <!--You need to change the HTML here. But keep the structure as it is.-->\r\n            <div class=\"flyout_menu_row\">\r\n\
	<div class=\"center_logo\"><img src=\"https://app.gyropalm.com/api/sdk/javascript/gui/logo-white.png\" class=\"logo_img\"></div>\r\n\
	\r\n            <\/div>\r\n\
	<div class=\"flyout_menu_row\">\r\n\
	<div class=\"gpp-2 gp-hidden\" id=\"pnlSignIn\">\r\n\
		<a href=\"javascript:void(0)\" class=\"gpbtn gpbtn-primary\" id=\"btnGPLogin\">Sign In</a>\r\n\
	</div> </div>\r\n\
	<div class=\"flyout_menu_row\">\r\n\
	<div class=\"gp-rounded gp-hidden\" id=\"pnlUser\">\r\n\
			<p class=\"gp-textlbl gp-textlg\">Hello Dominick</p>\r\n\
			<div id=\"pnl-gpselectdev\">\r\n\
			  <label for=\"gpselectdev-ctrl\">Your Devices</label>\r\n\
			  <select class=\"gpselectdev-ctrl\" id=\"gpselectdev-ctrl\">\r\n\
				<option value=\"\" disabled selected>Select a Wearable</option>\r\n\
				<option>Lab Wearable</option>\r\n\
				<option>Test 2</option>\r\n\
				<option>Test 3</option>\r\n\
			  </select>\r\n\
			</div>\r\n\
	</div> </div>\r\n\
	<div class=\"flyout_menu_row\">\r\n\
	<div class=\"gp-rounded gp-hidden\" id=\"pnlStatus\">\r\n\
			<p class=\"gp-textlbl gp-textlg\" title=\"Wearable ID: gp00000000\">My Wearable</p>\r\n\
		<div id=\"lblGPWearable\" style=\"display:block;\">\r\n\
			<div class=\"gp-online-indicator\"><span class=\"gp-blink gp-hidden\"></span></div>\r\n\
			<p class=\"gp-online-text\">Device: N/A</p>\r\n\
		</div>\r\n\
		<div id=\"lblGPCloud\">\r\n\
			<div class=\"gp-online-indicator\"><span class=\"gp-blink gp-hidden\"></span></div>\r\n\
			<p class=\"gp-online-text\">Cloud: N/A</p>\r\n\
		</div>\r\n\
	</div> </div>\r\n\
	<div class=\"flyout_menu_row\">\r\n\
	<div class=\"gp-rounded gp-hidden\" id=\"pnlLogs\">\r\n\
			<p class=\"gp-textlbl gp-textlg\">Event Logs</p>\r\n\
				<textarea readonly class=\"gplogtext\" rows=\"6\" id=\"gpeventtext\"></textarea>\r\n\
			<div class=\"gptextlog-cont\">\r\n\
				<button class=\"gpbtn-sm gpcode-btn\" id=\"gpguibtn-code\"><i class=\"fa fa-code\" title=\"Custom Code\"></i></button>\r\n\
				<button class=\"gpbtn-sm gptrash-btn\" id=\"gpguibtn-trash\"><i class=\"fa fa-trash\" title=\"Clear Log\"></i></button>\r\n\
				<button class=\"gpbtn-sm gpexpand-btn\" id=\"gpguibtn-expand\"><i class=\"fa fa-expand\" title=\"Expand Log\"></i></button>\r\n\
			</div>\r\n\
			<label class=\"gpcheckcont\">Show Verbose\r\n\
			  <input type=\"checkbox\" id=\"gpchkbx1\" checked=\"checked\">\r\n\
			  <span class=\"gpcheckmk\"></span>\r\n\
			</label>\r\n\
			<label class=\"gpcheckcont\">Show Activity\r\n\
			  <input type=\"checkbox\" id=\"gpchkbx2\">\r\n\
			  <span class=\"gpcheckmk\"></span>\r\n\
			</label>\r\n\
	</div> </div>\r\n\
	<div class=\"flyout_menu_row gp-hidden\">\r\n\
	<a href=\"https:\/\/youtube.com\" class=\"social_media_icon_flyout pointer\"><img src=\"https:\/\/www.jqueryscript.net\/demo\/fixed-flyout-menu\/img\/social_media_icons\/youtube_logo.png\" class=\"social_media_icon_flyout_img\" alt=\"YouTube\"><\/a>\r\n                <a href=\"#\" class=\"social_media_icon_flyout pointer\"><img src=\"https:\/\/www.jqueryscript.net\/demo\/fixed-flyout-menu\/img\/social_media_icons\/reddit_logo.png\" class=\"social_media_icon_flyout_img\" alt=\"Reddit\"><\/a>\r\n            <\/div>\r\n            <div class=\"flyout_menu_row\">\r\n\
	<p class=\"text_flyout opacity_transition\">\r\n\
	<a class=\"flyout_text_a gp-prevent-select\" href=\"https://github.com/GyroPalm/GyroPalm-JavaScript-SDK\" target=\"_blank\">GitHub Docs<\/a>\r\n\
	<a class=\"flyout_text_a gp-prevent-select gp-hidden\" href=\"javascript:void(0)\" target=\"_blank\" id=\"gpguibtn-signout\">Sign Out<\/a>\r\n\
	<\/p>\r\n            <\/div>\r\n        <\/div>\r\n            <!--IMPORTANT! Don\'t change anything below this comment.-->\r\n        <div class=\"arrow_menu pointer arrow_menu_left\">\r\n                <div tabindex=\"0\" class=\"arrow_menu_triangle triangle_right\"><\/div>\r\n        <\/div>\r\n    <\/div>\r\n    <\/div>\r\n\
	<div id=\"gpcodemodalbg\" class=\"gpguimodal\">\r\n\
		<div id=\"gpcodemodal\" class=\"gpguimodal-content\">\r\n\
			<span class=\"gpgui-close\">&times;</span>\r\n\
			<div class=\"gpguimodal-box\">\r\n\
				<h4 class=\"gp-texth4 ml-1\" id=\"gpgui-appname\">Plugin: N/A</h4>\r\n\
				<div class=\"flyout_menu_row\">\r\n\
				<div class=\"gp-rounded\" id=\"pnlLogs\">\r\n\
						<p class=\"gp-textlbl gp-textlg\">Custom Javascript</p>\r\n\
							<input type=\"hidden\" id=\"gpVertAppID\" name=\"gpVertAppID\" value=\"\">\r\n\
							<div id=\"gpgui-customcode\">//Code entered here is specific to you on this site\n//loadJS(\"https://example.com/script.js\"); //Replace with your Javascript URL\n</div>\r\n\
						<div class=\"gptextlog-cont\">\r\n\
							<button class=\"gpbtn-sm gpcode-btn\" id=\"gpguibtn-editplugin\"><i class=\"fa fa-pencil\" title=\"Edit Plugin\"></i></button>\r\n\
							<button class=\"gpbtn-sm gptrash-btn\" id=\"gpguibtn-clearcode\" title=\"Clear Code\"><i class=\"fa fa-trash\"></i></button>\r\n\
							<button class=\"gpbtn-sm gpexpand-btn\" id=\"gpguibtn-savecode\" title=\"Save Code\"><i class=\"fa fa-save\"></i></button>\r\n\
						</div>\r\n\
				</div> </div>\r\n\
			</div>\r\n\
		</div>\r\n\
	</div>\r\n\
	");
	
	$(document).ready(function() {
		loadCSS(baseURL+"gui/flyout_menu_style.css");	// Load CSS
		loadCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");	// Load CSS
		loadCSS("https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css");	// Load CSS
		loadJS("https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js");
		loadJS(baseURL+"gui/flyout_menu_code.js", () => {
			console.log("flyout loaded");
		}, onFailed);
		loadJS("https://cdn.jsdelivr.net/ace/1.1.5/min/ace.js", () => {
			console.log("editor loaded");
			var editor = ace.edit("gpgui-customcode");
			editor.setTheme("ace/theme/monokai");
			editor.session.setMode("ace/mode/javascript");
			
			if (localStorage.hasOwnProperty("gprealtimesession")) {	//key exists in storage
				loadJS(baseURL+"gyropalm.min.js", () => {
					console.log("GyroPalm SDK loaded");
					var respObj = JSON.parse(localStorage.gprealtimesession);
					if ("masterToken" in respObj) {
						gpObj = new GyroPalm(respObj.masterToken);
					}
					gpFetchJsCode(respObj.masterToken);
					gpCustomJSPlugin = gpGetCustomEditorCode();
					gpEvalReady = true;	//indicate to global eval the code
				}, onFailed);
			}
			
			var gpguicustomeditor = ace.edit($('#gpgui-customcode')[0]);
			gpguicustomeditor.session.on('change', function(delta) {
				gpJsEditorCodeChanged = true;	//set flag to remind user to save code
			});
		}, onFailed);
		$("#btnGPLogin").click(function() {
			openLoginWindow();
		});
		$("#gpguibtn-signout").click(function() {
			gpSignOutUser();
		});
		$("#gpguibtn-code").click(function() {
			if ($('#gpgui-appname').text() == "Plugin: N/A") { 
				let encodedUrl = encodeURIComponent('http(s?)://(.*)' + window.location.hostname + '(.*)');
				let pageTitle = document.title;
				pageTitle = pageTitle.replace(/[^\w\s]/gi, '');	//remove special chars
				pageTitle = pageTitle.replace(/\s+/g,' ').trim();	//remove extra spaces
				pageTitle = encodeURIComponent(pageTitle);
				window.location.href = 'https://app.gyropalm.com/beta/vertex/edit/new?target='+encodedUrl+'&name='+pageTitle+'&launch='+window.location.href;
			}
			else {
				if ($('#gpcodemodal').is(":visible")) {
					gpShowCodeModal(false);
				} else {
					gpShowCodeModal(true);
				}
			}
		});
		$("#gpguibtn-trash").click(function() {
			$("#gpeventtext").val('');
		});
		$("#gpguibtn-expand").click(function() {
			// Toggle the width of the textarea
			if ($("#gpeventtext").css('width') <= '190px') {
			  let lgWidth = ($(window).width() * 0.75);
			  //$("#gpeventtext").css('width', lgWidth + 'px');
			  $("#gpeventtext").animate({
				width: lgWidth + 'px'
			  }, 200); // 200ms duration
			} else {
			  $("#gpeventtext").animate({
				width: '190px'
			  }, 200); // 200ms duration
			}
		});
		$("#gpguibtn-editplugin").click(function() {
			let appID = $('#gpVertAppID').val();
			window.location.href = 'https://app.gyropalm.com/beta/vertex/edit/'+appID;
		});
		$("#gpguibtn-clearcode").click(function() {
			gpSetCustomEditorCode("//Code entered here is specific to you on this site\n//loadJS(\"https://example.com/script.js\"); //Replace with your Javascript URL\n");
		});
		$("#gpguibtn-savecode").click(function() {
			gpSaveCodeBtn();
		});
		$(".gpgui-close").click(function() {
			if (gpJsEditorCodeChanged) {
				$.confirm({
					title: 'Save Code',
					content: 'Do you want to save your changes?',
					type: 'blue',
					theme: 'dark',
					buttons: {
						yes: {
							btnClass: 'btn-blue',
							keys: ['enter', 'shift'],
							action: function(){
								gpShowCodeModal(false);
								gpSaveCodeBtn();
							}
						},
						no: function () {
							gpShowCodeModal(false);
						},
						cancel: function () {	//do nothing
						}
					}
				});
				gpJsEditorCodeChanged = false;
			} else {
				gpShowCodeModal(false);
			}
		});
		updateView();
		attachPageVisibility();
	});
}

var tmrWaitToEvalJS = setInterval(function() {
	if (gpEvalReady) {
		try {
			jQuery.globalEval(gpCustomJSPlugin);
		} catch (err) {
			console.log("This website has a security policy that prevents GyroPalm Vertex from working properly");
		}
		clearInterval(tmrWaitToEvalJS);
		gpEvalReady = false;
	}
}, 1000);