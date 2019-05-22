// 尾页 -- 分数页
import 'phaser';

export class ScoreScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'ScoreScene'
        });
    }

    init(params) {
        this.score = params.starsCaught;
    }

    create() {
        var resultText = 'Your score is ' + this.score + '!';
        this.result = this.add.text(60, 200, resultText,
            { font: '48px Arial Bold', fill: '#FBFBAC' });

        var hintText = 'Click to restart';
        this.hint = this.add.text(140, 280, hintText,
            { font: '24px Arial Bold', fill: '#FBFBAC' });

        this.input.on('pointerdown', function () {
            this.scene.start('WelcomeScene'); // 抽奖场景
        }, this);
    }
};
