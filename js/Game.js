function Game() {
	this.f = 0;			//帧数
	this.idx = 0;		//存放图片的索引值
	this.hit = 0;		//击中数用于判断僵尸情况
	this.score = 100;	//阳光数
	this.dx = 4;		//用于冷却速度
	this.num = 0;
	this.lock = false;	//用于开关冷却
	this.plantCool = [];	//用于存放豌豆射手的坐标
	this.bulletX = [];		//僵尸出现的行数
	this.bindEvent()
}


/******添加事件监听********/
Game.prototype.bindEvent = function() {
	var self = this;
	// 鼠标按下

	$(".up_box .nav table td").mousedown(function (e) {
		var selfTd = this;
		// 当太阳数不足时，禁止种植
		if ($(this).children("span").hasClass("cur")) return;

		document.getElementById("xuanze").play();
		// 得到点击图片的索引
		self.idx = $(this).index();
		// 给冷却罩添加类名
		$(this).children("span").attr("class","cur curs");
		// 鼠标的坐标
		var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
		var yy = e.originalEvent.y || e.originalEvent.layerY || 0; 
		// 实例化一个植物
		var plant = new Plant(xx, yy, self.idx);
		// 阻止默认事件
		e.preventDefault()

		//鼠标移动事件
		$(document).mousemove(function (e) {
			var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
			var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			// 调用植物类的update方法
			plant.update(xx, yy)
			// 阻止默认事件
			e.preventDefault()

		})

		// 当鼠标从移动中的图片上松开时
		plant.$img.mouseup(function () {
			plant.check()
			// 判断当同一个格子是否有植物
			if (plant.checkRepeat()) {
				plant.goDie()
				self.lock = false;
				$(selfTd).children("span").attr("class","");
			} 
			else{
				// 判断是否非正常种植
				if (plant.numY == 5) {
					plant.goDie()
					self.lock = false;
					$(selfTd).children("span").attr("class","");
					console.log($(selfTd).children("span"))
				}
				// 可以正常种植
				else {
					plant.addPic()
					self.lock = true;
					// 求出种植完后剩余的太阳数
					self.score -= plant.checkScore();
					$(".stage .up_box .sunshine span").html(game.score);
					// 太阳花不足时，添加灰暗的类名
					self.checkGrow(self.score)
					plant.goDie()
				}
			}
		})
	})
};

/*********超过所需阳光数的植物卡片变得不可使用*********/
Game.prototype.checkGrow = function(score) {
	for (var i = 0; i < plant_Arr.length; i++) {
		// 判断当前太阳数够不够种植植物
		var spans = $(".up_box .nav table td").eq(i).children("span");
		if (plant_Arr[i].sunNum > score) {
			// 当该冷却罩有curs的类名时，就不需要再添加了
			if (spans.hasClass("curs")) {
				spans.attr("class", "cur curs");
			}
			else {
				spans.attr("class", "cur");
			}
		} 
		else {
			if (spans.hasClass("curs")) {
				spans.attr("class", "cur curs");
			} else {
				spans.attr("class", "");
			}
		}
	}
};

/******植物卡片冷却*******/
Game.prototype.coling = function() {
	var self = this;
	$(".up_box .nav table td span").each(function () {
		if ($(this).hasClass("curs")) {
			var wX = $(this).height();
			if (wX == 0) {
				$(this).removeClass("cur curs");
				self.checkGrow(self.score)
				wX = 74;
			}
			wX -= self.dx;
			$(this).css("height", wX)
		}
	})
};
/********清除子弹移动时留下的残影*******/
Game.prototype.clearBullet = function() {
	$(".stage img.bullet").remove()
};

/*******清除僵尸********/
Game.prototype.clearZombie = function() {
	$(".stage div.zombies").remove()
};

/******清除植物*******/
Game.prototype.clearPlant = function(row, col) {
	$(".down_box table tr").eq(row).children("td").eq(col).children().children().remove()
	
};

/********游戏开始*****/
Game.prototype.start = function() {
	document.getElementById('Mmusic').play();
	var self = this;
	// 创建主定时器
	this.timers = setInterval(function () {
		self.f++;

		// 判断是否可以用卡片
		self.checkGrow(self.score);
		// 卡片冷却
		if (self.lock) {
			self.f % 50 == 0 && self.coling();
		}
		// 生成阳光
		self.f % 800 == 0 && new Sun();

		// 生成僵尸
		if (self.f  == 10) {
			new Zombie();
			document.getElementById("jingbao").play();
		}

		// 让僵尸移动
		for (var i = 0; i < arrs.length; i++) {
			if (self.f % 50 == 0) {
				// 更新僵尸位置
				arrs[i].update()
					// 碰撞检测
				arrs[i].checkCollision(self.bulletX, self.plantCool, self.hit);

				// 判断游戏结束
				if (arrs[i].x < -150) {
					document.getElementById('Mmusic').pause();
					clearInterval(self.timers);
					document.getElementById('no').play();
					var gameOver = new GameOver();
					setTimeout(function () {
						document.getElementById("smooth").play();
						gameOver.danceKing()
						gameOver.danceUpdate()
						gameOver.dancer()
					},2000)
				}
			}

			// 判断当僵尸出现时豌豆射手攻击的状况
			if (arrs[i].checkMove()) {
				self.bulletX = (arrs[i].y - 55) / 110; //得到僵尸在第几行出现的行数
				// 调用清除方法
				self.clearBullet()
				// 每隔一定时间生成一个子弹
				if (self.f % 150 == 0) {
					// 循环豌豆射手的坐标数组
					for (var j = 0; j < self.plantCool.length; j++) {
						// 让这行的豌豆射手攻击
						var plantLength = self.plantCool[j].col * 90 + 10;
						if (plantLength <= arrs[i].x) {
							if (self.plantCool[j].id == "wdss" && self.plantCool[j].row == self.bulletX) {
								new Pbehaviour(self.plantCool[j].col, self.plantCool[j].row)
								document.getElementById("pen").play();
							}
						}
					}
				}

				// 循环子弹数组，让它持续移动
				for (var k = 0; k < arr.length; k++) {
					arr[k].update();
					// 判断子弹碰撞僵尸以及僵尸被攻击的动作
					if (arr[k].x >= arrs[i].x + 40) {
						document.getElementById("jizhong").play();
						// 僵尸移动阶段二
						if (self.hit == 6 && arrs[i].speed != 0) {
							arrs[i].imgs.attr("src", "image/zombie2.gif");
						} 

						// 僵尸吃食阶段二
						else if (self.hit == 6 && arrs[i].speed == 0) {
							arrs[i].imgs.attr("src", "image/zombieEat2.gif");
						} 

						// 僵尸死亡阶段
						else if (self.hit >= 7) {
							self.clearBullet()
							arrs[i].imgs.attr("src", "image/zombieDie.gif");
							arrs.splice(i, 1);
							self.num++;
							// 延时一定时间清除僵尸尸体并且重置hit数，生成一个新的僵尸
							setTimeout(function () {
								self.clearZombie()
								if (self.num == 5) {
									alert("you win");
									clearInterval(self.timers)
								}
								else {
									new Zombie()
									self.hit = 0;
								}


							},1100)
						}
						// 子弹爆炸
						arr[k].dom.attr("src","image/bulletBoom.gif");
						arr.splice(k, 1);

						// 击中数
						self.hit++;
					}
				}
			}
		}

		// 太阳花生成阳光
		if (self.f % 700 == 0) {
			for (var i = 0; i < self.plantCool.length; i++) {
				if (self.plantCool[i].id == "tyh") {
					new SunFlower(self.plantCool[i].col, self.plantCool[i].row)
				}
			}
		}
	},20)
};
