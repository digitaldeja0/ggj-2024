import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.map = this.add.tilemap("map");
    this.tiles = this.map.addTilesetImage("room-tile", "tiles");
    this.roomLayer = this.map.createLayer("room", this.tiles);

    this.can = this.map.createFromObjects("collectables", {
      gid: 5,
      key: "can",
    });

    this.fly = this.map.createFromObjects("collectables", {
      gid: 6,
      key: "fly",
    });

    this.nana = this.map.createFromObjects("collectables", {
      gid: 7,
      key: "nana",
    });

    this.poop = this.map.createFromObjects("collectables", {
      gid: 8,
      key: "poop",
    });
    this.puddle = this.map.createFromObjects("collectables", {
      gid: 9,
      key: "puddle",
    });

    this.totalItems = 29;

    this.allCollectables = [
      ...this.can,
      ...this.puddle,
      ...this.poop,
      ...this.nana,
      ...this.fly,
    ];
    this.allCollectables.forEach((can) => {
      can.setInteractive();
      can.on(
        "pointerdown",
        () => {
          this.totalItems--;
          console.log(this.totalItems);
          can.destroy();
        },
        this
      );
    });

    console.log(this.totalItems);
    // this.can.setInteractive();
    // this.can.on('clicked', ()=>{
    //     console.log("can clicked!")
    // }, this);

    // this.groundLayer = this.map.createLayer("ground", this.tiles )
    // this.floorLayer = this.map.createLayer("floor", this.tiles )
    // this.wallLayer = this.map.createLayer("walls", this.tiles )

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    // this.cameras.main.setBounds(0, 0, 1024, 768);

    this.cursors = this.input.keyboard.createCursorKeys();

    // const controlConfig = {
    //     camera: this.cameras.main,
    //     left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A) ,
    //     right:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D) ,
    //     up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W) ,
    //     down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    //     zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
    //     zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    //     // acceleration: 0.06,
    //     // drag: 0.0005,
    //     maxSpeed: 1.0,
    // };

    // this.cameras.main.scrollX= 1024

    // this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    // this.cameras.main.setBackgroundColor(0x00ff00);

    // this.add.image(512, 384, 'background').setAlpha(0.5);

    // this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
    //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
    //     stroke: '#000000', strokeThickness: 8,
    //     align: 'center'
    // }).setOrigin(0.5);

    // this.input.once('pointerdown', () => {

    //     this.scene.start('GameOver');

    // });

    this.leftPressed = false;
    this.rightPressed = false;

    this.info = this.add.text(10, 10, "", {
      font: "48px Arial",
      fill: "#000000",
    });
    // this.info.fixedToCamera = true
    this.timer = this.time.addEvent({
      delay: 10000,
      callback: this.gameOver,
      callbackScope: this,
    });
  }

  update(mytime, delta) {
    // this.controls.update(delta...time goes intopt he param);

    let time =  Math.round((10000 - this.timer.getElapsed()) / 1000);

    if (this.totalItems === 0) {
        this.scene.start("GameOver");
      }
      if (time <= 0) {
        this.scene.start("GameOver");
      }


    // Update text with limited time
    this.info.setText("Total items: " + this.totalItems + "\nTime: " + time);

    this.infoX = this.info.x
    console.log(this.info.x)

   

 

    if (this.cursors.left.isDown && !this.leftPressed) {
        this.cameras.main.scrollX -= 1024;
        if(this.infoX>10){
            this.info.x = this.info.x - 1024;
        }
        this.leftPressed = true;
    }
    if (this.cursors.left.isUp) {
      this.leftPressed = false;
    }

    if (this.cursors.right.isDown && !this.rightPressed) {
        this.cameras.main.scrollX += 1024;
        if(this.infoX<3082){
            this.info.x = this.info.x + 1024;
        }
        this.rightPressed = true;
    }
    if (this.cursors.right.isUp) {
      this.rightPressed = false;
    }

    // if (this.cursors.right.isDown){
    //     this.cameras.main.scrollX+= 1024
    // }
  }

  gameOver() {
    console.log("hi");
  }
}
