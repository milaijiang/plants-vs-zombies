function Scene1() {
}

Scene1.prototype.render = function() {
	this.dom = $("<div><span></span></div>");
	this.dom.attr("class", "scene1");
	this.dom.appendTo($(".main_box"));
};
