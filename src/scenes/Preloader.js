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
        this.add.image(512, 384, 'loadingImg');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('main-menu-img', 'main-menu.png');
        this.load.image('h2p', 'H2P.png');
        this.load.image('gameover-img', 'gameover.png');

        this.load.image('can', 'collect/can.png');
        this.load.image('fly', 'collect/fly.png');
        this.load.image('nana', 'collect/nana.png');
        this.load.image('poop', 'collect/poop.png');
        this.load.image('puddle', 'collect/puddle.png');
        // this.load.image('tiles', 'tiles.png');

        // this.load.tilemapTiledJSON("map", "map.tmj")

        this.load.image('tiles', 'rooms.png');

        this.load.tilemapTiledJSON("map", "rooms.tmj")

        this.load.image('soundOn', 'on.png');
        this.load.image('soundOff', 'off.png');
        this.load.image('playJoke', 'playJoke.png');

        this.load.audio('theme', [
            'sound/240128 Rain at Dusk_01.mp3',
        ]);

        this.load.audio('menuTheme', [
            'sound/240128 Slow Rainfall.mp3',
        ]);

        this.load.audio('laugh1', [
            'sound/Big Laugh 02.wav',
        ]);
        this.load.audio('laugh2', [
            'sound/Medium Laugh 01.wav',
        ]);

        this.load.audio('applause', [
            'sound/Applause 01.wav',
        ]);

        this.load.audio('appliance1', [
            'sound/Appliance 03.wav',
        ]);

        this.load.audio('appliance2', [
            'sound/Appliance 02.wav',
        ]);

        this.load.audio('drink', [
            'sound/Drinks 03.wav',
        ]);

        this.load.audio('bar', [
            'sound/Bar Noise 04.wav',
        ]);

        this.load.audio('mic', [
            'sound/Mic Feedback 01.wav',
        ]);

    }

    create ()
    {
        
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
