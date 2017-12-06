function Plant(clientX, clientY, i) {
	this.clientX = clientX;
	this.clientY = clientY;
	this.src = plant_Arr[i].src;
	this.id = plant_Arr[i].id;
	this.sunNum = plant_Arr[i].sunNum;
	this.init()
}	

/********创建一个新图片*******/
Plant.prototype.init = function() {
	var self = this;
	// 创建一个img
	this.$img = $("<img src='image/"+this.src+"'/>");
	// 图片加载好时得到图片的宽和高，然后执行其他事
	this.$img.load(function () {
		// 求卡片图片距离舞台边界的长度
		self.lx = parseInt($(".main_box").css("marginLeft")) + this.width / 2;
		self.ly = parseInt($(".main_box").css("marginTop")) + (this.height + 20) / 2;

		// 用传过来的鼠标参数求得新建图片在舞台的位置（鼠标悬停的地方就是新建图片的位置）
		self.dx = self.clientX - self.lx;
		self.dy = self.clientY - self.ly;
		//设置图片的样式
		self.$img.attr("class","current");
		self.$img.css("left", self.dx);
		self.$img.css("top", self.dy);
		// 上树
		self.$img.appendTo($(".stage"))
	})
};

/*******更新********/
Plant.prototype.update = function(cx, cy) {
	// 传入新的鼠标坐标参数，改变该图片的位置
	this.cx = cx;
	this.cy = cy;
	this.nDx = this.cx- this.lx;
	this.nDy = this.cy - this.ly;
	this.$img.css("left", this.nDx);
	this.$img.css("top", this.nDy);
};

/**********删除********/
Plant.prototype.goDie = function() {
	this.$img.remove();
};

/******舞台添加植物*******/
Plant.prototype.addPic = function() {
	var self = this;
	var $plants = $(".down_box table tr").eq(this.numY).children().eq(this.numX);
	this.dom = $("<img src='image/"+this.src+"'>");

	this.check();
	// 判断不正常操作时，不添加坐标
	if ((this.numY != 5 && this.numX < 9 ) && (!this.checkRepeat())) {
		//把豌豆射手所在的行，列存入
		console.log(this.numX, this.numY)
		game.plantCool.push({"id": this.id,"row": this.numY,"col": this.numX}); 
		console.log(game.plantCool)
	}
	// 当图片加载时
	this.dom.load(function () {
		// 给图片加两个类名
		self.dom.attr("class","change "+self.id+"")
		// 上树
		document.getElementById("zhongzhi").play();
		self.dom.appendTo($plants.children("span"))
	})
};

/******判断植物消耗的太阳数********/
Plant.prototype.checkScore = function() {
	switch (this.id) {
		case "wdss":
			return 100;
		break;
		
		case "jgq":
		case "tyh":
			return 50;	
		break;
	}
};
/*******检查（用于种植植物）*******/
Plant.prototype.check = function() {
	// 得到图片的宽和高的一半
	this.$imgX = parseInt(this.$img.css("width")) /2;
	this.$imgY = parseInt(this.$img.css("height")) /2;
	// 得到图片在草坪上的位置
	this.numX = Math.floor((this.nDx + this.$imgX - parseInt($(".down_box").css("marginLeft"))) / 90);
	this.numY = (this.nDy -100 + this.$imgY) / 90;

	// 判断在哪一行（由于图片不规则）
	if ( -0.2 < this.numY && this.numY < 1) {
		this.numY = 0;
	} else if ( 1< this.numY && this.numY < 2){
		this.numY = 1;
	} else if ( 2< this.numY && this.numY < 3.5){
		this.numY = 2;
	} else if ( 3.5< this.numY && this.numY < 4.5){
		this.numY = 3;
	} else if (4.5 < this.numY && this.numY < 5.9){
		this.numY = 4;
	} else {
		this.numY = 5;
	}

};

/*******判断是否一个格子有多个植物种植******/
Plant.prototype.checkRepeat = function() {
	// 判断所在格子是否有图片
	var $imgJudge = $(".stage .down_box table tr").eq(this.numY).children("td").eq(this.numX).children().children();
	if ($imgJudge.length > 0) {
		return true;
	}
};
