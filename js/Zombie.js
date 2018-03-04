function Zombie() {
	this.eat = 0;
	this.x = 850;
	this.y = (function () {
		var x = Math.floor(Math.random() * 5);
		return 55 + x * 110;
	})();
	this.speed = 8;
	arrs.push(this)
	this.render()
}

/*****随机渲染僵尸******/
Zombie.prototype.render = function() {
	this.dom = $("<div class='zombies'></div>");
	this.imgs = $("<img src='image/zombie.gif' />");
	this.imgs.appendTo(this.dom);
	this.dom.css("left", this.x);
	this.dom.css("top", this.y); 
	this.dom.appendTo($(".stage"));
};

/*******僵尸移动********/
Zombie.prototype.update = function() {
	this.x -= this.speed;
	this.dom.css("left", this.x)
};

/********检查是否可以攻击僵尸********/
Zombie.prototype.checkMove = function() {
	if (this.x < 810) {
		return true;
	} else {
		return false;
	}
};

/*********僵尸得到碰撞检测与进食*********/
Zombie.prototype.checkCollision = function(bulletX, plantCool, hit) {
	this.bulletX = bulletX;	
	this.plantCool = plantCool;		//植物坐标数组
	this.hit = hit;
	this.bulletX = (this.y - 55) / 110; //得到僵尸在第几行出现的行数
	// 判断碰撞
	for (var j = 0; j < this.plantCool.length; j++) {
		// 判断这行有植物
		if (this.bulletX == this.plantCool[j].row) {
			// 得到植物距离左边的长度
			var plantLength = (this.plantCool[j].col + 1) * 90 - 70;
			// 当僵尸移动的距离小于或等于植物的距离时
			if ((plantLength <= this.x + 70 && plantLength >= this.x) && (this.speed != 0)) {
				// 让僵尸停止
				this.speed = 0;
				document.getElementById("eat").play();
				if (this.hit >= 4) {
					this.imgs.attr("src", "image/zombieEat2.gif")
				} else {
					this.imgs.attr("src", "image/zombieEat.gif")
				}
			} 

			// 判断僵尸进食
			else if ((plantLength <= this.x + 70 && plantLength >= this.x) && this.speed == 0) {
				console.log(this.eat, this.hit)
				if (this.eat > 5) {
					document.getElementById("eat").pause();
					// 吃食中被击中的情况
					if (this.hit == 6) {
						this.imgs.attr("src", "image/zombie2.gif");
					} else{
						this.imgs.attr("src", "image/zombie.gif");
					}
					// 从植物坐标中清除被吃的植物
					game.clearPlant(this.bulletX, this.plantCool[j].col);
					this.plantCool.splice(j, 1);
					this.speed = 8;
					this.eat = 0;
				}
				this.eat++;
			}
		}
	}
};

var arrs = [];
