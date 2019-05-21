# phaser-prize
基于Phaser3框架的抽奖小游戏，如果抽到 `A KEY!!!` 可以开始 点击小星星的游戏

phaser3版本的API与phaser2版本有部分调整，且本地图片无法正常执行，需要使用服务器端的图片

## 参数介绍

* `width` -- 游戏界面宽度，默认值为 800。

* `height` -- 游戏界面高度，默认值为 600。

* `renderer` -- 游戏渲染器，默认值为 Phaser.AUTO
    随机选择其他值：Phaser.WEBGL、Phaser.CANVAS、Phaser.HEADLESS（不进行渲染）。

* `parent` -- 游戏界面挂载的 DOM 节点，可以为 DOM id，或者标签。

* `state` -- 游戏 state 对象
    默认值为 null，游戏的 `state` 对象一般包含方法 `preload`、`create`、`update`、`render`。

    - `Phaser 2`

    ```js
    var game, wheel, prizeText, canSpin = false;
    var slicePrizes = ["A KEY!!!", "50 STARS", "500 STARS", "BAD LUCK!!!", "200 STARS", "100 STARS", "150 STARS", "BAD LUCK!!!"];

    window.onload = function() {
        // 创建一个458*488的游戏界面
        game = new Phaser.Game(458, 488, Phaser.CANVAS, "");
        // 添加一个 playGame 的 state
        game.state.add("PlayGame", playGame);
        // 开始发动 playGame 状态
        game.state.start("PlayGame");
    }

    // 添加 state
    playGame.prototype = {
        // 预加载 -- 执行一次
        preload: function() {
            // 预加载图形
            game.load.image("wheel", "assets/wheel.png");
            game.load.image("pin", "assets/pin.png");
        },
        // 创建 -- 执行一次
        create: function() {
            // 添加背景色
            game.stage.backgroundColor = "#880044";
            // 添加 wheel 到 canvas 中心
            wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
            // 在其中心设置车轮定位点 
            wheel.anchor.set(0.5);
            // 添加箭头 -- canvas中心
            let pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
            // 在其中心设置车轮定位点 
            pin.setOrigin(0.5);
            // 添加文本字段
            prizeText = game.add.text(game.world.centerX, 480, "");
            // 在其中心设置车轮定位点
            prizeText.anchor.set(0.5);
            // 设置文本居中显示
            prizeText.align = "center";
            canSpin = true; // 执行状态 -- 游戏开始，可做 this.spin 操作
            // 用户操作执行 this.spin
            game.input.onDown.add(this.spin, this);
        },
        // 更新 -- focus 画布执行多次 update
        update: function() {
            console.log('update')
        },
        spin: function() {
            if (canSpin) {  
                // 重置文本
                prizeText.text = "";
                // 旋转的圈数
                var rounds = game.rnd.between(2, 4);
                // 旋转角度 0-360
                var degrees = game.rnd.between(0, 360);
                // 游戏结束前，获取旋转到的位置
                prize = slices - 1 - Math.floor(degrees / (360 / slices));
                // 修改执行状态
                canSpin = false;
                // 旋转的动画
                var spinTween = game.add.tween(wheel).to({
                        angle: 360 * rounds + degrees
                }, 3000, Phaser.Easing.Quadratic.Out, true);
                // 一旦动画完成，调用的函数
                spinTween.onComplete.add(this.winPrize, this);
            }
        },
        winPrize: function() {
            // 修改执行状态
            canSpin = true;
            // 记录旋转到的位置
            prizeText.text = slicePrizes[prize];
        }
    };
    ```

    - `Phaser 3`
    ```js
    let config = {
        type: Phaser.AUTO,
        width: 458,
        height: 488,
        parent: "game",
        backgroundColor: "#880044",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    window.onload = () => {
        let game = new Phaser.Game(config);
    };
    let canSpin = false,
        prize,
        prizeText = {},
        slices = 8,
        wheel,
        slicePrizes = ["A KEY!!!", "50 STARS", "500 STARS", "BAD LUCK!!!", "200 STARS", "100 STARS", "150 STARS", "BAD LUCK!!!"]

    function preload () {
        // 修改图片路径
        this.load.setBaseURL("https://raw.githubusercontent.com/wqjiao/" +
        "react-componts/master/");
        // 预加载图形
        this.load.image("wheel", "assets/wheel.png");
        this.load.image("pin", "assets/pin.png");
    }

    function create () {
        // 获取画布的宽度添加滚轮中心点
        let point = this.cache.game.config.width / 2;

        // 在画布中间添加滚轮
        wheel = this.add.image(point, point, "wheel"); // image || sprite
        // 在其中心设置车轮定位点 
        wheel.setOrigin(0.5);
        // 添加箭头 -- canvas中心
        let pin = this.add.image(point, point, "pin"); // image || sprite
        // 在其中心设置车轮定位点 
        pin.setOrigin(0.5);
        // adding the text field
        prizeText = this.add.text(this.cameras.main.centerX, 480, "");
        // 在其中心设置文本字段注册点
        prizeText.setOrigin(0.5);
        // 设置文本居中显示
        prizeText.align = "center";
        // 游戏刚刚开始 = 我们可以旋转方向盘
        canSpin = true;
        // 等待用户操作，调用“旋转”功能
        this.input.on('pointerdown', spin, this);
    }

    function update () {
        console.log('create');
    }

    function spin() {
        // 判断是否可以旋转
        if (canSpin) {
            // 重置文本内容
            prizeText.text = "";
            // 旋转的圈数
            let rounds = Phaser.Math.RND.between(2, 4);
            // 旋转角度 0-360
            let degrees = Phaser.Math.RND.between(0, 360);
            // 游戏结束前，获取旋转到的位置
            prize = slices - 1 - Math.floor(degrees / (360 / slices));
            // 修改执行状态
            canSpin = false;
            // 旋转的动画
            this.tweens.add({
                targets: wheel,
                ease: 'Sine.easeInOut',
                duration: 3000,
                delay: 0,
                x: 229,
                y: 229,
                angle: 360 * rounds + degrees,
                onComplete: () => {
                    // 修改执行状态
                    canSpin = true;
                    // 记录旋转到的位置
                    prizeText.text = slicePrizes[prize];
                }
            });
        }
    }
    ```

* `scene` -- 游戏场景，不同的场景都存在 `state` 对象
    可以通过 `this.scene.start("GameScene")` 实现场景跳转(该场景必须已做相应配置)

* `transparent` -- 是否设置游戏背景为透明，默认值为 false。

* `antialias` -- 是否显示图片抗锯齿。默认值为 true。

* `physicsConfig` -- 游戏物理引擎配置。

## Phaser 相关网站

* [phaser 官网](http://phaser.io)
* [Phaser 环境配置](https://www.phaser-china.com/tutorial-detail-8.html)
* [Html5小游戏集合](https://github.com/channingbreeze/games)
