function ShowMenu() {
	'use strict';
	
	var w = window.innerWidth;
	var header = document.querySelector("header");
	
	if (w < 992) {
		if (hasClass(header, 'active')) {
			AddClass(header, 'active', false);
		} else {
			AddClass(header, 'active', true);
		}
	}
}

function HideMenu(e) {
	'use strict';
	
	var w = window.innerWidth;
	var header = document.querySelector("header");
	
	if (w < 992) {
		AddClass(header, 'active', false);
	}
	
	if (w >= 992 && hasClass(e.target, 'pseudo')) {
		var link = e.target.dataset.link;
		var links = document.querySelectorAll('header nav [data-link]');
		var list = document.querySelectorAll('.products-list');
		var elem = document.querySelector('[data-list="' + link + '"]');
		
		if (hasClass(elem, 'active')) {
			AddClass(elem, 'active', false);
			AddClass(e.target, 'active', false);
		} else {
			for (var i = 0; i < list.length; i++) {
				AddClass(list[i], 'active', false);
			}
			for (var i = 0; i < links.length; i++) {
				AddClass(links[i], 'active', false);
			}
			AddClass(elem, 'active', true);
			AddClass(e.target, 'active', true);
		}
		
		e.preventDefault();
	}
}

function ShowTab() {
	'use strict';
	
	var link = document.querySelectorAll('.tabs .tabs-link.active');
	var links = document.querySelectorAll('.tabs .tabs-link');
	var content = document.querySelectorAll('.tabs .tabs-content');
	
	if (links.length) {
		var elem = document.querySelector('[data-content="' + link[0].dataset.link + '"]');
		
		for (var i = 0; i < content.length; i++) {
			AddClass(content[i], 'active', false);
		}
		AddClass(elem, 'active', true);
	}
}

function Tabs(e) {
	'use strict';
	
	var link = e.target.dataset.link;
	var links = document.querySelectorAll('.tabs .tabs-link');
	var content = document.querySelectorAll('.tabs .tabs-content');
	var elem = document.querySelector('[data-content="' + link + '"]');

	if (!hasClass(elem, 'active')) {
		for (var i = 0; i < content.length; i++) {
			AddClass(content[i], 'active', false);
		}
		for (var i = 0; i < links.length; i++) {
			AddClass(links[i], 'active', false);
		}
		AddClass(elem, 'active', true);
		AddClass(e.target, 'active', true);
	}

	e.preventDefault();
}

function OpenArticle(e) {
	'use strict';
	
	var _this = e.target;
	var article = document.querySelector(".articles .article");
	var articles = document.querySelectorAll(".articles article");
	
	if (_this.tagName.toLowerCase() !== "article") {
		_this = _this.parentNode;
	}
	
	_this.parentNode.insertBefore(article, _this.nextSibling);
	
	for (var i = 0; i < articles.length; i++) {
		AddClass(articles[i], 'active', false);
	}
	AddClass(_this, 'active', true);
	AddClass(article, 'active', true);

	e.preventDefault();
}

function CloseArticle(e) {
	'use strict';
	
	var article = document.querySelector(".articles .article");
	var articles = document.querySelectorAll(".articles article");
	var active = document.querySelector(".articles article.active");
	
	for (var i = 0; i < articles.length; i++) {
		AddClass(articles[i], 'active', false);
	}
	AddClass(article, 'active', false);
	
	window.scrollTo(0, active.offsetTop - 59);
	
	e.preventDefault();
}

function OpenOptions() {
	'use strict';
	
	var w = window.innerWidth;
	var options = document.querySelector("header .options");
	
	if (w < 992) {
		if (!hasClass(options, 'active')) {
			AddClass(options, 'show', true);
			setTimeout(function(){
				AddClass(options, 'active', true);
			}, 300);
			setTimeout(function(){
				AddClass(options, 'show', false);
			}, 1000);
		} else {
			AddClass(options, 'hide', true);
			setTimeout(function(){
				AddClass(options, 'active', false);
			}, 300);
			setTimeout(function(){
				AddClass(options, 'hide', false);
			}, 400);
		}
	}
}

function ScrollToActiveElement() {
	'use strict';
	
	var w = window.innerWidth;
	var container = document.querySelector(".sidebar header .products-list.activated");
	var element = document.querySelector(".sidebar header .products-list.activated .active");
	
	if (element) {
		if (w < 992) {
			container.scrollLeft = element.offsetLeft;
		} else {
			container.scrollTop = element.offsetTop;
		}
	}
}

window.onload = function() {
	'use strict';
	
	ShowTab();
	
	var menu = document.querySelector(".menu");
	var nav = document.querySelectorAll("nav a");
	var tabs = document.querySelectorAll(".tabs .tabs-link");
	var articles = document.querySelectorAll(".articles article");
	var close = document.querySelector(".articles .article .close em");
	var btnClose = document.querySelector(".articles .article .text .btn-close");
	var options = document.querySelectorAll("header .options i");
	
	menu.addEventListener("click", ShowMenu);
	for (var i = 0; i < nav.length; i++) {
		nav[i].addEventListener("click", HideMenu);
	}
	
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener("click", Tabs);
	}
	
	if (close) {
		close.addEventListener("click", CloseArticle);
		for (var i = 0; i < articles.length; i++) {
			articles[i].addEventListener("click", OpenArticle);
		}
	}
	if (btnClose) {
		btnClose.addEventListener("click", CloseArticle);
		for (var i = 0; i < articles.length; i++) {
			articles[i].addEventListener("click", OpenArticle);
		}
	}
	
	for (var i = 0; i < options.length; i++) {
		options[i].addEventListener("click", OpenOptions);
	}
	
	$(".scroll-pane").jScrollPane({
		autoReinitialise: true
	});
	
	ScrollToActiveElement();
};