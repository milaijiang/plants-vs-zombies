function Pbehaviour(x, y) {
	this.x = x * 90 + 90;  //子弹的left值(用列求的)
	this.y = 110 * (y + 1) + 15; //子弹的top值(用行求的)
	this.speed = 8;
	arr.push(this)
}

// 渲染一个子弹
Pbehaviour.prototype.render = function() {
	this.dom = $("<img src='image/pvz_bullet.gif'>");
	this.dom.attr("class","bullet");
	this.dom.css({
		"position": "absolute",
		"left": this.x,
		"top": this.y
	})
	this.dom.appendTo($(".stage"))
};

// 更新子弹的位置
Pbehaviour.prototype.update = function() {
	if (this.x > 1000) {
		this.kill()
	}
	this.x += this.speed;
	this.render()
};

//清除子弹移动时留下的残影
Pbehaviour.prototype.clear = function() {
	$(".stage img.bullet").remove()
};

// 当子弹飞出舞台时移除它
Pbehaviour.prototype.kill = function() {
	// document.getElementById("box").removeChild(this.dom);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === this) {
			arr.splice(i, 1)
		}
	}
};

// 创建一个数组，用于存放子弹
var arr = [];