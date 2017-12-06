function GameOver() {
	this.x = -150;
	this.speed = 1.7;
	// this.danceKing()
	// this.danceUpdate()
	// this.dancer()
	// document.getElementById("smooth").play();
	this.alertText();
	this.textUpdate();
}

// 游戏结束文字
GameOver.prototype.alertText = function() {
	this.dom = $("<div class='text'><img src='image/gameOver.png'/></div>");
	this.dom.css({
		"position": "absolute",
		"width": 560,
		"height": 460,
		"left": "50%",
		"top": "50%",
		"marginLeft": -280,
		"marginTop": -230
	});
	this.dom.appendTo($(".stage"));
};
// 文字渲染
GameOver.prototype.textUpdate = function() {
	var self = this;
	setTimeout(function () {
		self.dom.remove()
	},2000)
};

// 舞王僵尸
GameOver.prototype.danceKing = function() {
	this.dances = $("<div class='danceKing'><img src='image/danceKing.gif'/></div>");
	this.dances.css({
		"position": "absolute",
		"width": 200,
		"height": 200,
		"left": -150,
		"top": "50%",
		"marginTop": -100
	});
	this.dances.appendTo($(".stage"));
};

// 舞王僵尸移动
GameOver.prototype.danceUpdate = function() {
	var self = this;
	this.times = setInterval(function () {
		if (self.x >= 370) {
			self.speed = 0;
			self.dances.children().attr("src", "image/danceKingZH.gif");
			$(".stage").find("div.dancer img").animate({
				"bottom": 0
			},1000,function () {
				self.party()
			});
			clearInterval(self.times)
		}
		self.x += self.speed;
		self.dances.css("left", self.x)
	}, 50)
};
// 伴舞僵尸
GameOver.prototype.dancer = function() {
	for (var i = 0; i < 4; i++) {
		this.dancer = $("<div><img src='image/dancer.gif'/></div>");
		this.dancer.attr("class", "dancer dancer"+i+"");
		this.dancer.appendTo($(".stage"));
	}
};

/******let's start the zombies dancing*********/
GameOver.prototype.party = function() {
	var self = this;
	this.changeImg1()

	setTimeout(function () {
		self.changeImg2()
		self.dances.animate({
			"left": 320
		},1000);
		self.changeStyle(50);

		setTimeout(function () {
			self.changeImg1()
			self.dances.css("transform", "rotateY(0deg)");
			$(".stage").find("div.dancer").css("transform", "rotateY(0deg)");
			self.dances.animate({
				"left": 360
			},1000)
			self.changeStyle(-50)

			setTimeout(function () {
				self.changeImg3()
				self.dances.css("transform", "rotateY(180deg)");
				$(".stage").find("div.dancer").css("transform", "rotateY(180deg)");

				setTimeout(function() {
					self.changeImg1()
					self.changeTxt()
					
					self.party()
				},5000)
			},5000)
		},1000)
	},2000)
	
};

GameOver.prototype.changeTxt = function() {
	var txtArr = ["谢","谢","观","看","！！"];
	for (var i = 0; i < txtArr.length; i++) {
		$(".up_box table tr").children().eq(i+3).children("span").html(txtArr[i])
	}
};
GameOver.prototype.changeImg1 = function() {
	this.dances.children().attr("src", "image/DKdance.gif");
	$(".stage").find("div.dancer img").attr("src", "image/DRdance.gif");
};

GameOver.prototype.changeImg2 = function() {
	this.dances.children().attr("src", "image/DKmove.gif");
	$(".stage").find("div.dancer img").attr("src", "image/DRmove.gif");
};

GameOver.prototype.changeImg3 = function() {
	this.dances.children().attr("src", "image/DKattack.gif");
	$(".stage").find("div.dancer img").attr("src", "image/DRattack.gif");
};

GameOver.prototype.changeStyle = function(x) {
	var lefts = 0;
	$(".stage").find("div.dancer").each(function () {
		lefts = parseInt($(this).css("left"));
		lefts -= x;

		$(this).animate({
			"left": lefts
		},1000)
	})
};

// new GameOver()