import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Joystick from '../Joystick';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    joystick: any;
    button: Phaser.GameObjects.Graphics;
    buttonText: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0000ff);

        this.background = this.add.image(this.cameras.scene.scale.width / 2, window.innerHeight / 2, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add.text(this.cameras.scene.scale.width / 2, window.innerHeight / 2 - 125, 'Testing the Joystick Now', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.joystick = new Joystick(this, 150, this.camera.height * 0.7);

        const resetButton = this.add.text(this.cameras.scene.scale.width * 0.7, window.innerHeight / 2 - 50, 'Reset [Bad]', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff', stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setDepth(100).setInteractive();

        resetButton.on('pointerdown', () => {
            this.joystick.resetPointer();
        });

        this.button = new Phaser.GameObjects.Graphics(this)
            .setInteractive(new Phaser.Geom.Rectangle(this.cameras.scene.scale.width * 0.7, window.innerHeight - 150, window.innerWidth * 0.225, 50), Phaser.Geom.Rectangle.Contains)
            .on('pointerup', (_pointer: any, _localX: any, _localY: any, _event: any) => {
                this.joystick.resetPointer();
            });

        this.buttonText = this.add.text(this.cameras.scene.scale.width * 0.7, window.innerHeight - 140, 'Reset [Good]', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff', stroke: '#000000', strokeThickness: 6, align: 'center'
        });

        this.add.existing(this.button);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }

    update ()
    {
        this.joystick.update();
    }
}
