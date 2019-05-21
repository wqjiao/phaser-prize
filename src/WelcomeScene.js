// 首页 -- 欢迎场景
import "phaser";

export class WelcomeScene extends Phaser.Scene {

    constructor() {
        super({
            key: "WelcomeScene"
        });
    }

    create() {
        var titleText = "Phaser3 -- Click to start";
        this.title = this.add.text(60, 200, titleText,
            { font: '30px Arial Bold', fill: '#FBFBAC' });

        this.prizeBtn = this.add.text(140, 280, 'Prize',
            { font: '24px Arial Bold', fill: '#FBFBAC' });

        this.puzzleBtn = this.add.text(240, 280, 'Puzzle',
            { font: '24px Arial Bold', fill: '#FBFBAC' });

        this.input.on('pointerdown', function () {
            this.scene.start("GameScene"); // 游戏场景
        }, this);
    }
};
