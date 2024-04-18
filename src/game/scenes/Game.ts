import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Joystick from '../Joystick';

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

        const resetButton = this.add.text(this.cameras.scene.scale.width * 0.7, window.innerHeight / 2 - 50, 'Reset [Bad]', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff', stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setDepth(100).setInteractive();

        resetButton.on('pointerdown', () => {
            console.log('Reset [Bad]')
            this.joystick.resetPointer();
        });

        this.button = {
            // key: 'action',
            // name: Object.keys(element)[0],
            border: new Phaser.GameObjects.Graphics(this),
            graphic: new Phaser.GameObjects.Graphics(this),
            color: 0x000000,
            current: 100,
            total: 100,
            x: this.cameras.scene.scale.width * 0.7,
            y: window.innerHeight - 150,
            height: 50,
            width: 200,
        };

        // this.button.graphic.fillStyle(this.button.color, 1);
        // this.button.graphic.fillCircle(this.button.x, this.button.y, this.button.width as number);
        // // this.button.graphic.setVisible(true);
        
        // this.button.border.lineStyle(2, 0xFDF6D8, 1);
        // this.button.border.strokeCircle(this.button.x, this.button.y, this.button.width + 2 as number);
        // this.button.border.setVisible(true);

        this.button.graphic.setInteractive(new Phaser.Geom.Rectangle(
            this.button.x, this.button.y, 
            this.button.width, this.button.height), 
            Phaser.Geom.Rectangle.Contains)
                .on('pointerdown', (_pointer: any, _localX: any, _localY: any, _event: any) => {
                    // this.pressButton(button, scene);
                    console.log('Reset [Good]');
                    this.joystick.resetPointer();

                }); 

        this.button.graphic.setScrollFactor(0);
        this.button.border.setScrollFactor(0);
        this.button.graphic.setDepth(100);
        this.button.border.setDepth(101);


        // this.button = new Phaser.GameObjects.Graphics(this)
        //     .setInteractive(new Phaser.Geom.Rectangle(this.cameras.scene.scale.width * 0.7, window.innerHeight - 150, window.innerWidth * 0.225, 50), Phaser.Geom.Rectangle.Contains)
        //     .on('pointerup', (_pointer: any, _localX: any, _localY: any, _event: any) => {
        //         this.joystick.resetPointer();
        //     });

        this.buttonText = this.add.text(this.cameras.scene.scale.width * 0.7, window.innerHeight - 140, 'Reset [Good]', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff', stroke: '#000000', strokeThickness: 6, align: 'center'
        });

        // this.add.existing(this.button);

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
