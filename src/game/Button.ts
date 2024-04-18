import { Game } from "./scenes/Game";

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

export default class ButtonContainer extends Phaser.GameObjects.Container {
    scene: Game;
    buttonText: Phaser.GameObjects.Text;
    constructor(scene: Game) {
        super(scene);
        scene.add.existing(this);
        this.scene = scene;
        this.createButton(scene);
    };
    
    createButton(scene: Game) {
        const { width, height } = scene.cameras.main;
        const buttonX = width - 100;
        const buttonY = height * 0.85; // Negative sign for Y to start from top
        
        let button: Button = {
            key: 'action',
            name: 'Reset',
            border: new Phaser.GameObjects.Graphics(scene),
            graphic: new Phaser.GameObjects.Graphics(scene),
            color: 0x000000,
            current: 100,
            total: 100,
            x: buttonX,
            y: buttonY,
            height: 25,
            width: 25,
        };
        
        button.graphic.fillStyle(0x000000, SETTINGS.OPACITY);
        button.graphic.fillCircle(buttonX, buttonY, button.width as number);
        
        button.border.lineStyle(SETTINGS.BORDER_LINE, SETTINGS.BORDER_COLOR, SETTINGS.OPACITY);
        button.border.strokeCircle(buttonX, buttonY, button.width + 2 as number);
        
        button.graphic.setInteractive(new Phaser.Geom.Circle(
            buttonX, buttonY, 
            button.width), 
            Phaser.Geom.Circle.Contains)
                .on('pointerup', (_pointer: any, _localX: any, _localY: any, _event: any) => {
                    this.pressButton(button);
                });
        
        button.graphic.setScrollFactor(0);
        button.border.setScrollFactor(0);
        button.graphic.setDepth(2);
        
        this.add(button.border);
        this.add(button.graphic);

        this.buttonText = scene.add.text(scene.cameras.scene.scale.width * 0.7 + 5, window.innerHeight - 140, 'Reset Pointer', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#fdf6d8', stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setDepth(101);
    };
    
    pressButton(button: Button) {
        console.log('Action Button --- POINTERUP ---');
        // this.scene.joystick.resetPointer();

        let time: number = 0;
        button.border.clear();
        button.border.lineStyle(SETTINGS.BORDER_LINE, 0x000000, SETTINGS.OPACITY);
        button.border.strokeCircle(button.x, button.y, (SETTINGS.BUTTON_WIDTH + 3) * SETTINGS.SCALE * button.current / button.total);
        this.buttonText.setColor('#000000');
        this.buttonText.setStroke('#fdf6d8', 6);
        this.setCurrent(time, button.total, button);
        const timer = this.scene.time.addEvent({
            delay: 50,
            callback: () => {
                time += 5;
                this.setCurrent(time, button.total, button);
                if (time >= button.total) {
                    this.buttonText.setColor('#fdf6d8');
                    this.buttonText.setStroke('#000000', 6);
                    timer.remove(false);
                    timer.destroy();
                };  
            },
            loop: true,
        });
    };
    
    setCurrent(current: number, limit: number, button: Button) {
        const progressPercentage = current / limit;
        button.graphic.clear();
        if (current / limit >= 1) {
            button.border.clear();
            button.graphic.removeAllListeners();
            button.graphic.fillStyle(button.color, SETTINGS.OPACITY);
            button.graphic.fillCircle(button.x, button.y, SETTINGS.BUTTON_WIDTH * SETTINGS.SCALE * button.current / button.total);
            button.border.lineStyle(SETTINGS.BORDER_LINE, SETTINGS.BORDER_COLOR, SETTINGS.OPACITY);
            button.border.strokeCircle(button.x, button.y, (SETTINGS.BUTTON_WIDTH + 2) * SETTINGS.SCALE * button.current / button.total);
            button.graphic.setInteractive(new Phaser.Geom.Circle(
                button.x, button.y, 
                button.width), 
                Phaser.Geom.Circle.Contains)
                .on('pointerup', (_pointer: any, _localX: any, _localY: any, _event: any) => {
                    this.pressButton(button);
            });
        } else {
            button.graphic.fillStyle(0xFDF6D8, SETTINGS.OPACITY);
            button.graphic.fillCircle(button.x, button.y, button.width * progressPercentage);
            button.graphic.disableInteractive();
        };
        button.current = progressPercentage * button.total;
    };
};