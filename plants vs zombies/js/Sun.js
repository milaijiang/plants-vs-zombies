function Sun() {
	// 随机一个阳光初始的x坐标
	this.x = (function () {
		var i = ~~(_.random(76, 824));
		return i;
	})();
	this.y = (function () {
		var j = ~~(_.random(75, 625));
		return j;
	})();
	this.time = (function () {
		var j = ~~(_.random(2000, 5000));
		return j;
	})();
	this.render()
	this.update()
	this.bindEvent()
}

/****渲染一个太阳*******/
Sun.prototype.render = function() {
	this.dom = $("<img class='sun' src='image/pvz_sun.gif'/>");
	this.dom.css({
		"position" : "absolute",
		"width"    : 76,
		"height"   : 75,
		"left"     : this.x,
		"top"      : -100,
		"cursor"   : "pointer",
		"z-index"  : 9999
	});
	$(".stage").append(this.dom)
};

/*****更新太阳的位置******/
Sun.prototype.update = function() {
	var self = this;
	this.dom.animate({
		"top": this.y
	},this.time)
};

/******绑定点击事件******/
Sun.prototype.bindEvent = function() {
	var self = this;
	$(document).find("img.sun").click(function () {
		document.getElementById("click").play();
		$(this).stop().animate({
			"left" : 10,
			"top"  : 8
		},1000,function () {
			$(this).fadeOut()
			game.score += 25;
			$(".stage .up_box .sunshine span").html(game.score);
			self.dom.remove()
		})
	})
};
