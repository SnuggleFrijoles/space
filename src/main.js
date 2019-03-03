import 'phaser';
// import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
// import TitleScene from './scenes/TitleScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 800,
    height: 600,
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         // gravity: {
    //         //     y: 800
    //         // },
    //         // debug: true
    //         debug: false
    //     }
    // },
    physics: {
        default: "matter",
        matter: {
            gravity: { x: 0, y: 0 },
        }
    },
    scene: [
        GameScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
