/*!
  * GyroPalm JavaScript GUI Helper
  * Copyright 2015-2022 by GyroPalm, LLC. Code written by Dominick Lee for GyroPalm.
  * Licensed under MIT (https://github.com/GyroPalm/GyroPalm-JavaScript-SDK/blob/main/LICENSE)
  *
  * By using this library, you agree to be bound by the GyroPalm Terms of Use and Disclaimer.
  * You can find the complete terms at https://gyropalm.com/legal/terms/
  *
  *	This script is intended as a supplement to the GyroPalm JavaScript SDK. 
  *	It contains functions to dynamically load jQuery if not included and show GyroPalm connection interface.
  */
  

function loadJS(url, callback) {
    // Adding the script tag to the head
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;	//load JS URL

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

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
	loadJS("https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js", jQueryComplete);
}

// Runs after jQuery has loaded
function jQueryComplete() {
	console.log("jQuery loaded");
	loadJS("https://cdn.jsdelivr.net/gh/GyroPalm/GyroPalm-JavaScript-SDK@latest/gui/flyout_menu_code.js", () => {
		console.log("flyout loaded");
		
		$('body').append("<div id=\"flyout_menu\" class=\"social_media_margin_pseudo hide_flyout_menu_onload\">\r\n        <div class=\"arrow_menu pointer arrow_menu_right\">\r\n                <div tabindex=\"0\" class=\"arrow_menu_triangle triangle_left\"><\/div>\r\n        <\/div>\r\n        <div id=\"panel_flyout_parent\">\r\n            <!--IMPORTANT! Don\'t change anything above this comment.-->\r\n            <!--You need to change the HTML here. But keep the structure as it is.-->\r\n            <div class=\"flyout_menu_row\">\r\n                <a href=\"#\" class=\"social_media_icon_flyout pointer\"><img src=\"https:\/\/www.jqueryscript.net\/demo\/fixed-flyout-menu\/img\/social_media_icons\/instagram_logo.png\" class=\"social_media_icon_flyout_img\" alt=\"Instagram\"><\/a>\r\n                <a href=\"#\" class=\"social_media_icon_flyout pointer\"><img src=\"https:\/\/www.jqueryscript.net\/demo\/fixed-flyout-menu\/img\/social_media_icons\/facebook_logo.png\" class=\"social_media_icon_flyout_img\" alt=\"Facebook\"><\/a>\r\n            <\/div>\r\n            <div class=\"flyout_menu_row\">\r\n                <a href=\"https:\/\/youtube.com\" class=\"social_media_icon_flyout pointer\"><img src=\"https:\/\/www.jqueryscript.net\/demo\/fixed-flyout-menu\/img\/social_media_icons\/youtube_logo.png\" class=\"social_media_icon_flyout_img\" alt=\"YouTube\"><\/a>\r\n                <a href=\"#\" class=\"social_media_icon_flyout pointer\"><img src=\"https:\/\/www.jqueryscript.net\/demo\/fixed-flyout-menu\/img\/social_media_icons\/reddit_logo.png\" class=\"social_media_icon_flyout_img\" alt=\"Reddit\"><\/a>\r\n            <\/div>\r\n            <div class=\"flyout_menu_row\">\r\n                <p class=\"text_flyout opacity_transition\"><a class=\"flyout_text_a\" href=\"#\">GyroPalm Connection<\/a><\/p>\r\n            <\/div>\r\n        <\/div>\r\n            <!--IMPORTANT! Don\'t change anything below this comment.-->\r\n        <div class=\"arrow_menu pointer arrow_menu_left\">\r\n                <div tabindex=\"0\" class=\"arrow_menu_triangle triangle_right\"><\/div>\r\n        <\/div>\r\n    <\/div>\r\n    <\/div>");
		
	});
	loadCSS("https://cdn.jsdelivr.net/gh/GyroPalm/GyroPalm-JavaScript-SDK@latest/gui/flyout_menu_style.css");	// Load CSS last
}