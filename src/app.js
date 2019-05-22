import 'phaser';
import { WelcomeScene } from './WelcomeScene';
import { GameScene } from './GameScene';
import { ScoreScene } from './ScoreScene';
import { PrizeScene } from './PrizeScene';

const config = {
    title: 'Starfall',
    width: 458,
    height: 488,
    parent: 'game',
    backgroundColor: '#880044',
    scene: [PrizeScene, WelcomeScene, GameScene, ScoreScene], // 多场景
    loader: {
        baseURL: 'https://raw.githubusercontent.com/wqjiao/phaser-prize/master/',
        crossOrigin: 'anonymous',
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

export class StarfallGame extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}

window.onload = () => {
    var game = new StarfallGame(config);
};
