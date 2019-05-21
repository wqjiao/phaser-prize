// 中间游戏页
import "phaser";

export class GameScene extends Phaser.Scene {

    constructor() {
        super({
            key: "GameScene"
        });
    }

    init() {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;
    }

    preload() {
        this.load.setBaseURL("https://raw.githubusercontent.com/wqjiao/" +
            "phaser-prize/master/");
        this.load.image("star", "assets/star.png");
        this.load.image("sand", "assets/sand.jpg");
    }

    create() {
        this.sand = this.physics.add.staticGroup({
            key: 'sand',
            frameQuantity: 20
        });
        Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
            new Phaser.Geom.Line(20, 480, 470, 480));
        this.sand.refresh();

        this.info = this.add.text(10, 10, '',
            { font: '24px Arial Bold', fill: '#FBFBAC' });
    }

    update(time) {
        var diff = time - this.lastStarTime;
        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 400) {
                this.delta -= 20;
            }
            this.emitStar();
        }
        this.info.text =
            this.starsCaught + " caught - " +
            this.starsFallen + " fallen (max 3)";
    }

    onClick(star) {
        return function () {
            star.setTint(0x00ff00);
            star.setVelocity(0, 0);
            this.starsCaught += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
            }, [star], this);
        }
    }

    onFall(star) {
        return function () {
            star.setTint(0xff0000);
            this.starsFallen += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
                if (this.starsFallen > 2) {
                    this.scene.start("ScoreScene", { starsCaught: this.starsCaught });
                }
            }, [star], this);
        }
    }

    emitStar() {
        var star;
        var x = Phaser.Math.Between(25, 450);
        var y = 26;
        star = this.physics.add.image(x, y, "star");

        star.setDisplaySize(50, 50);
        star.setVelocity(0, 200);
        star.setInteractive();

        star.on('pointerdown', this.onClick(star), this);
        this.physics.add.collider(star, this.sand, this.onFall(star), null, this);
    }
};
