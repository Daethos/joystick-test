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

        // const resetButton = this.add.text(this.cameras.scene.scale.width * 0.7, window.innerHeight / 2 - 50, 'Reset [Bad]', {
        //     fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff', stroke: '#000000', strokeThickness: 6, align: 'center'
        // }).setDepth(100).setInteractive();

        // resetButton.on('pointerdown', () => {
        //     this.joystick.resetPointer();
        // });
        // resetButton.on('pointerover', () => {
        //     resetButton.setColor('#000000');
        //     resetButton.setStroke('#fdf6d8', 6);
        // });
        // resetButton.on('pointerout', () => {
        //     resetButton.setColor('#ffffff');
        //     resetButton.setStroke('#000000', 6);
        // });

        // this.buttonText = this.add.text(this.cameras.scene.scale.width * 0.7 + 5, window.innerHeight - 140, 'Reset [Good]', {
        //     fontFamily: 'Arial Black', fontSize: 24, color: '#ffc700', stroke: '#000000', strokeThickness: 6, align: 'center'
        // }).setDepth(101);

        // let button = {
        //     border: new Phaser.GameObjects.Graphics(this),
        //     graphic: new Phaser.GameObjects.Graphics(this),
        //     x: this.cameras.scene.scale.width * 0.7,
        //     y: window.innerHeight - 150,
        //     height: 50,
        //     width: window.innerWidth * 0.225,
        // };

        // button.graphic.setInteractive(new Phaser.Geom.Rectangle(
        //     button.x, button.y, 
        //     button.width, button.height), 
        //     Phaser.Geom.Rectangle.Contains)
        //         .on('pointerdown', (_pointer: any, _localX: any, _localY: any, _event: any) => {
        //             // console.log('Reset [Good]');
        //             this.joystick.resetPointer();

        //         })
        //         .on('pointerover', () => {
        //             this.buttonText.setColor('#000000');
        //             this.buttonText.setStroke('#ffc700', 6);
        //         })
        //         .on('pointerout', () => {
        //             this.buttonText.setColor('#ffc700');
        //             this.buttonText.setStroke('#000000', 6);
        //         });

        // button.graphic.setScrollFactor(0);
        // button.border.setScrollFactor(0);
        // button.graphic.setDepth(100);
        // button.border.setDepth(100);

        // this.button = button;
        // this.add.existing(button.graphic);
        // this.add.existing(button.border);
        // this.add.existing(resetButton);

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
