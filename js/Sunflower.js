function SunFlower(x, y) {
	this.x = x * 90 + 45;
	this.y = 110 * (y + 1);
	this.render();
	this.update();
	this.bindEvent();
}

/*******渲染太阳*******/
SunFlower.prototype.render = function() {
	this.dom = $("<span class='flowerSun'><img src='image/pvz_sun.gif'/></span>");
	this.dom.css({
		"position": "absolute",
		"left": this.x,
		"top": this.y,
		"z-index": 9999,
		"opacity": 0,
		"cursor": "pointer"
	})
	$(".stage").append(this.dom);
};

/*****生成太阳落下来*******/
SunFlower.prototype.update = function() {
	var self = this;
	this.dom.animate({
		"opacity": 1,
		"top": this.y - 40,
		"left": this.x - 10 
	},600);
	this.dom.animate({
		"top": this.y + 35,
		"left": this.x - _.random(25, 30)
	},400)
};

SunFlower.prototype.bindEvent = function() {
	var self = this;
	$(document).find("span.flowerSun").click(function () {
		document.getElementById("click").play();
		$(this).stop().animate({
			"left" : 10,
			"top"  : 8
		},800,function () {
			$(this).fadeOut()
			game.score += 25;
			$(".stage .up_box .sunshine span").html(game.score);
			$(this).remove()
		})
	})
};

