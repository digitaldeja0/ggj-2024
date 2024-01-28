import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    const menu = this.add.image(512, 384, "main-menu-img").setInteractive();
    this.menuMusic = this.sound.add("menuTheme");
    console.log(this.menuMusic);
    this.menuMusic.play();


    // this.add.image(512, 300, 'logo');

    // this.add.text(512, 460, 'Main Menu', {
    //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
    //     stroke: '#000000', strokeThickness: 8,
    //     align: 'center'
    // }).setOrigin(0.5);

    // this.input.on("pointerdown", () => {
    //   this.menuMusic.play();
    //   console.log(this.menuMusic);
    //   this.scene.start("Game");
    // });

    var spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    spaceBar.on("down", () => {
      this.menuMusic.stop();

      this.scene.start("Game");
    });
  }
}
