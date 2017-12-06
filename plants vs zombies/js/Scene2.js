function Scene2() {
	this.txtRender()
}

Scene2.prototype.txtRender = function() {
	this.dom = $("<img class='txtPlace' src='image/startGame.gif'/>");
	this.dom.css({
		"position": "absolute",
		"width": 230,
		"height": 80,
		"left": "50%",
		"top": "50%",
		"marginLeft": -115,
		"marginTop": -40
	})
	this.dom.appendTo($(".stage"));
};

Scene2.prototype.backgroundRender = function() {
	
};
Scene2.prototype.clearTxt = function() {
	$(".stage").find("img.txtPlace").remove()
};