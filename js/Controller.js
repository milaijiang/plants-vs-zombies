function Controller() {
	this.scene = 2;
	new Other();
	this.judge(1);
	this.bindEvent()
}
Controller.prototype.judge = function(scene) {
	switch (scene) {
		case 1:
			this.scene1 = new Scene1();
			this.render(1);
		break;

		case 2:
			this.render(2)
		break;

		case 3:
			game.start()
		break;
	}
};

Controller.prototype.render = function(scene) {
	switch (scene) {
		case 1:
			this.scene1.render()
		break;

		case 2:
			var self = this;
			$(".stage").animate({
				"opacity": 1,
				"backgroundPositionX": 0
			},1500);
			
			$(".stage").animate({
				"backgroundPositionX": -655
			},2000);
			$(".stage").animate({
				"backgroundPositionX": -237
			},1500,function () {
				$(".stage .up_box").animate({
					"top": 0
				},1000)
				var scene2 = new Scene2();
				setTimeout(function () {
					scene2.clearTxt()
					self.judge(3)
				},3000)
				// $(".stage ")
			})
		break;
	}
};

Controller.prototype.bindEvent = function() {
	var self = this;
	$(".main_box").find("div.scene1 span").click(function () {
		$(this).css("backgroundPosition", "0px 0px");
		$(".main_box").find("div.scene1").delay("slow").fadeOut(1000,function () {
			$(".main_box").find("div.scene1").remove();
			self.judge(2)
		});
	})
};
