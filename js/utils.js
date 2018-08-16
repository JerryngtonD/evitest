function AddClass(element, cls, type){
	'use strict';

	var list = element.className.split(" ");
	
	if (list.indexOf(cls) !== -1){
		if (!type) delete list[list.indexOf(cls)];
	} else {
		if (type) list[list.length] = cls;
	}
	element.className = list.join(" ");
}

function hasClass(element, className) {
	'use strict';
	
	return element.className && new RegExp("(\\s|^)" + className + "(\\s|$)").test(element.className);
}