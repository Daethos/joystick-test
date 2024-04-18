import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background'); // 512, 384

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 2 - 32, 32).setStrokeStyle(1, 0xffffff); // 512, 384, 468, 32

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(window.innerWidth / 2 - window.innerWidth / 4.5, window.innerHeight / 2, 4, 28, 0xffffff); // 512-230, 384, 4, 28

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + ((window.innerWidth / 2 - 32) * progress); // 4 + 460 * progress

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
        this.load.image('cursor', 'cursor.png');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
