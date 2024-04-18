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
        
        let circle: Button = {
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
        
        this.add(circle.border);
        this.add(circle.graphic);
    };
    
    pressButton(button: Button) {
        console.log('Action Button --- POINTERUP ---');
        this.scene.joystick.resetPointer();
        let time: number = 0;
        button.border.clear();
        button.border.lineStyle(SETTINGS.BORDER_LINE, 0x000000, SETTINGS.OPACITY);
        button.border.strokeCircle(button.x, button.y, (SETTINGS.BUTTON_WIDTH + 3) * SETTINGS.SCALE * button.current / button.total);
        this.setCurrent(time, button.total, button);
        const timer = this.scene.time.addEvent({
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