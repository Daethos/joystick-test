import Phaser from 'phaser';
// import { EventBus } from '../game/EventBus';

const FORCE = {
    MULTIPLIER: 0.03,
};

export default class Joystick extends Phaser.GameObjects.Container {
    public scene: any;
    private pointer: any;
    private joystick: any;

    constructor(scene: any, x: number, y: number) {
        super(scene, x, y);
        this.scene = scene;
        this.scene.add.existing(this);
        this.pointer = null;
        this.joystick = scene.plugins.get('rexVirtualJoystick').add(scene, {
            x: x,
            y: y,
            radius: 25,
            base: scene.add.circle(0, 0, 50, 0x000000, 0.25),
            thumb: scene.add.circle(0, 0, 25, 0xfdf6d8, 0.25),
            dir: '8dir',
            // forceMin: 0,
            // enable: true
        });
        this.createPointer();
    };

    createPointer() {
        console.log('createPointer');
        this.pointer = this.scene.add.image(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2, 'cursor');
        this.pointer.setScrollFactor(0);
    };

    resetPointer() {
        this.pointer.x = this.scene.cameras.main.width / 2;
        this.pointer.y = this.scene.cameras.main.height / 2;
    };


    update() {
        if (this.joystick.force > 0) {
            if (this.joystick.forceX > 15) {
                this.pointer.x += this.joystick.forceX * FORCE.MULTIPLIER;
            };
            if (this.joystick.forceX < -15) {
                this.pointer.x += this.joystick.forceX * FORCE.MULTIPLIER;
            };
            if (this.joystick.forceY > 15) {
                this.pointer.y += this.joystick.forceY * FORCE.MULTIPLIER;
            };
            if (this.joystick.forceY < -15) {
                this.pointer.y += this.joystick.forceY * FORCE.MULTIPLIER;
            };
        };
    };
};