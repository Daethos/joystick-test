import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Joystick from '../Joystick';

const SETTINGS = {
    SCALE: 1,
    BUTTON_WIDTH: 24,
    BUTTON_HEIGHT: 24,
    OPACITY: 1,
    BORDER_COLOR: 0xFDF6D8,
    BORDER_LINE: 3,
    STRAFE_X_OFFSET: 1.7,
    STRAFE_Y_OFFSET: 3,
    STRAFE_X_SCALE: 2.75,
    STRAFE_Y_SCALE: 1.5,
};

type Button = {
    key: string;
    name: string;
    border: Phaser.GameObjects.Graphics;
    graphic: Phaser.GameObjects.Graphics;
    color: number;
    current: number;
    total: number;
    x: number;
    y: number;
    width: number;
    height: number;
    circle?: number;
    on?: (event: string, fn: () => void, context?: any) => void;
};

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

        const { width, height } = this.camera;
        const buttonX = width / 2;
        const buttonY = height * 0.85; // Negative sign for Y to start from top
        
        let circle: Button = {
            key: 'action',
            name: 'Reset',
            border: new Phaser.GameObjects.Graphics(this),
            graphic: new Phaser.GameObjects.Graphics(this),
            color: 0x000000,
            current: 100,
            total: 100,
            x: buttonX,
            y: buttonY,
            height: 25,
            width: 25,
        };

        circle.graphic.fillStyle(0x000000, SETTINGS.OPACITY);
        circle.graphic.fillCircle(buttonX, buttonY, circle.width as number);
        
        circle.border.lineStyle(SETTINGS.BORDER_LINE, SETTINGS.BORDER_COLOR, SETTINGS.OPACITY);
        circle.border.strokeCircle(buttonX, buttonY, circle.width + 2 as number);

        circle.graphic.setInteractive(new Phaser.Geom.Circle(
            buttonX, buttonY, 
            circle.width), 
            Phaser.Geom.Circle.Contains)
                .on('pointerup', (_pointer: any, _localX: any, _localY: any, _event: any) => {
                    this.pressButton(circle);
                });
                // .on('pointerup', (_pointer: any, _localX: any, _localY: any, _event: any) => {
                //     // this.pressButton(circle, this);
                //     console.log('Action Button --- POINTERUP ---');
                //     circle.graphic.clear();
                //     circle.border.clear();
                //     circle.graphic.fillStyle(0x000000, SETTINGS.OPACITY);
                //     circle.graphic.fillCircle(buttonX, buttonY, circle.width as number);
                //     circle.border.lineStyle(SETTINGS.BORDER_LINE, SETTINGS.BORDER_COLOR, SETTINGS.OPACITY);
                //     circle.border.strokeCircle(buttonX, buttonY, circle.width + 2 as number);
                // }); 

        circle.graphic.setScrollFactor(0);
        circle.border.setScrollFactor(0);
        circle.graphic.setDepth(2);

        this.add.existing(circle.border);
        this.add.existing(circle.graphic);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }

    pressButton(button: Button) {
        console.log('Action Button --- POINTERUP ---');
        this.joystick.resetPointer();
        let time: number = 0;
        this.setCurrent(time, button.total, button);
        const timer = this.time.addEvent({
            delay: 50,
            callback: () => {
                time += 5;
                this.setCurrent(time, button.total, button);
                if (time >= button.total) {
                    timer.remove();
                }    
            },
            loop: true,
        });
    };

    setCurrent(current: number, limit: number, button: Button) {
        const progressPercentage = current / limit;
        if (current / limit >= 1) {
            button.graphic.clear();
            button.graphic.fillStyle(button.color, SETTINGS.OPACITY);
            button.graphic.fillCircle(button.x, button.y, SETTINGS.BUTTON_WIDTH * SETTINGS.SCALE * button.current / button.total);
            button.border.clear();
            button.border.lineStyle(SETTINGS.BORDER_LINE, SETTINGS.BORDER_COLOR, SETTINGS.OPACITY);
            button.border.strokeCircle(button.x, button.y, (SETTINGS.BUTTON_WIDTH + 2) * SETTINGS.SCALE * button.current / button.total);
            button.graphic.setInteractive();
        } else {
            button.graphic.fillStyle(0xFFC700, SETTINGS.OPACITY);
            button.graphic.fillCircle(button.x, button.y, button.width * progressPercentage);
            button.graphic.disableInteractive();
        };
        button.current = progressPercentage * button.total;
    };

    update ()
    {
        this.joystick.update();
    }
}
