import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Joystick from '../Joystick';
import ButtonContainer from '../Button';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    joystick: any;
    button: any;
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
        this.button = new ButtonContainer(this);

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
