import "phaser";

export class PrizeScene extends Phaser.Scene {

    constructor() {
        super({
            key: "PrizeScene"
        });
    }

    init() {
        // 初始化变量
        this.canSpin = false;
        this.prize = '';
        this.prizeText = {};
        this.slices = 8;
        this.slicePrizes = ["A KEY!!!", "50 STARS", "500 STARS", "BAD LUCK!!!", "200 STARS", "100 STARS", "150 STARS", "BAD LUCK!!!"];
    }

    preload() {
        // 修改图片路径
        this.load.setBaseURL("https://raw.githubusercontent.com/wqjiao/" +
        "phaser-prize/master/");
        // 预加载图形
        this.load.image("wheel", "assets/wheel.png");
        this.load.image("pin", "assets/pin.png");
    }

    create() {
        // 获取画布的宽度添加滚轮中心点
        let point = this.cache.game.config.width / 2;

        // 在画布中间添加滚轮
        this.wheel = this.add.image(point, point, "wheel"); // image || sprite
        // 在其中心设置车轮定位点 
        this.wheel.setOrigin(0.5);
        // 添加箭头 -- canvas中心
        let pin = this.add.image(point, point, "pin"); // image || sprite
        // 在其中心设置车轮定位点 
        pin.setOrigin(0.5);
        // adding the text field
        this.prizeText = this.add.text(this.cameras.main.centerX, 480, "");
        // 在其中心设置文本字段注册点
        this.prizeText.setOrigin(0.5);
        // 设置文本居中显示
        this.prizeText.align = "center";
        // 游戏刚刚开始 = 我们可以旋转方向盘
        this.canSpin = true;
        // 等待用户操作，调用“旋转”功能
        this.input.on('pointerdown', this.spin, this);
    }

    spin() {
        // 判断是否可以旋转
        if (this.canSpin) {
            // 重置文本内容
            this.prizeText.text = "";
            // 旋转的圈数
            let rounds = Phaser.Math.RND.between(2, 4);
            // 旋转角度 0-360
            let degrees = Phaser.Math.RND.between(0, 360);
            // 游戏结束前，获取旋转到的位置
            this.prize = this.slices - 1 - Math.floor(degrees / (360 / this.slices));
            // 修改执行状态
            this.canSpin = false;
            // 旋转的动画
            this.tweens.add({
                targets: this.wheel,
                ease: 'Sine.easeInOut',
                duration: 3000,
                delay: 0,
                x: 229,
                y: 229,
                angle: 360 * rounds + degrees,
                onComplete: () => {
                    // 修改执行状态
                    this.canSpin = true;
                    // 抽到 'A KEY!!!' 开始游戏场景
                    if ( this.slicePrizes[this.prize] === 'A KEY!!!') {
                        this.scene.start("WelcomeScene");
                    } else {
                        // 记录旋转到的位置
                        this.prizeText.text = this.slicePrizes[this.prize];
                    }
                }
            });
        }
    }
};
