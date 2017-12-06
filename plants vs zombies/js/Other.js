function Other() {
	this.bindEvent()
}

// Other.prototype.menu = function() {
// 	this.dom = $("<div class='menu'></div>");
// };

Other.prototype.bindEvent = function() {
	$(".stage .up_box .R_menu").click(function () {
		$(this).children().html("开发中...")
	})
};
// new Other()