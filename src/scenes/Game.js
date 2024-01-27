import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.map = this.add.tilemap("map")
        this.tiles = this.map.addTilesetImage("tiles", "tiles")
        this.groundLayer = this.map.createLayer("ground", this.tiles )
        this.floorLayer = this.map.createLayer("floor", this.tiles )
        this.wallLayer = this.map.createLayer("walls", this.tiles )

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


        const cursors = this.input.keyboard.createCursorKeys()

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        // this.cameras.main.setBackgroundColor(0x00ff00);

        // this.add.image(512, 384, 'background').setAlpha(0.5);

        // this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    update (time, delta)
    {
        this.controls.update(delta);
    }
}
