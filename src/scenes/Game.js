import { Scene } from "phaser";
import jokes from "../jokes";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.jokes = jokes;
    this.isPlayingJoke = false;
    let isSpeechPaused = false;
  }

  create() {
    





    this.music = this.sound.add("theme");
    console.log(this.music)

    this.map = this.add.tilemap("map");
    this.tiles = this.map.addTilesetImage("room-tile", "tiles");
    this.roomLayer = this.map.createLayer("room", this.tiles);

        
    const instructions = this.add.text(512, 360, 'Move with Left + Right Arrow Keys' + "\nClick on Item to Clean ", {
      fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
      backgroundColor: '#000000',
      align: 'center'
  }).setOrigin(0.5)

   setInterval(() => {
    instructions.destroy();
    }, 3000);





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

    this.totalItems = 0;

    this.allCollectables = [
      ...this.can,
      ...this.puddle,
      ...this.poop,
      ...this.nana,
      ...this.fly,
    ];
    const drinkS = this.sound.add("drink");
    const barS = this.sound.add("bar");
    const app1S = this.sound.add("appliance1");
    const app2S = this.sound.add("appliance2");
    this.allCollectables.forEach((can) => {
      can.setInteractive();
      can.on(
        "pointerdown",
        () => {
          console.log(can)
          if(can.name ==="can"){
            drinkS.play()
          }
          if(can.name ==="fly"){
            // drinkS.play()
          }
          if(can.name ==="nana"){
            app2S.play()
          }
          if(can.name ==="puddle"){
            // drinkS.play()
          }
          if(can.name ==="poop"){
            barS.play()
          }
          this.totalItems++;
          can.destroy();
        },
        this
      );
      can.visible = false;
    });

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.leftPressed = false;
    this.rightPressed = false;

    this.info = this.add.text(10, 10, "", {
      font: "24px Arial",
      fill: "#ffffff",
      backgroundColor: "#000000",
    });

    this.timeInfo = this.add.text(10, 50, "", {
      font: "24px Arial",
      fill: "#ffffff",
      backgroundColor: "#000000",
    });

    this.timer = this.time.addEvent({
      delay: 300000,
      callback: this.gameOver,
      callbackScope: this,
    });

    this.moveFlies();

    this.puddle.forEach((i) => {
      const fx = i.postFX.addShine(1, 0.2, 5);
    });

    this.timeline = this.add.timeline();

    Phaser.Utils.Array.Shuffle(this.allCollectables);

    this.allCollectables.forEach((collectable) => {
      this.timeline.add({
        from: Phaser.Math.Between(100, 1000), // Random time between 3 and 30 seconds
        run: () => {
          collectable.visible = true;
        },
      });
    });

    this.timeline.play();

    this.load.image("soundOn", "on.png");
    this.load.image("soundOff", "off.png");

    this.button = this.add
      .image(950, 10, "soundOff")
      .setOrigin(0)
      .setInteractive();
    this.music.play();

    // Button Section
    this.button.on(
      "pointerup",
      () => {
        if (this.music.isPlaying) {
          this.music.pause();
          this.button.setTexture("soundOn");
        } else {
          this.music.play();
          this.button.setTexture("soundOff");
        }
      },
      this
    );

    // Joke Section

    this.jokeText = this.add.text(10, 90, "", {
      font: "24px Arial",
      fill: "#000000",
      backgroundColor: "#ffffff",
    });
    // this.jokeText.setOrigin(0.5, 0)

    // setInterval(() => {
    //   this.playJoke();
    // }, 5000);

    const laugh1S = this.sound.add("laugh1");
    const laugh2S =  this.sound.add("laugh2");
    const applauseS = this.sound.add("applause");

    this.jokeButton = this.add
      .image(870, 10, "playJoke")
      .setOrigin(0)
      .setInteractive();

    this.jokeButton.on(
      "pointerup",
      () => {
        if (this.music.isPlaying) {
          this.playJoke();

          setTimeout(() => {
            // Play laugh1 or laugh2 randomly
            if (Math.random() < 0.5) {
              laugh1S.play();
            } else {
              laugh2S.play();
            }
          }, 4000);


          setInterval(() => {
            this.jokeText.setText("");
          }, 7000);
        }
      },
      this
    );

    // End Class
  }

  update(mytime, delta) {
    let time = Math.round((300000 - this.timer.getElapsed()) / 1000);
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    this.info.setText(
      "Tasks Complete: " + this.totalItems + "/29" 
    );

    this.timeInfo.setText(
       timeString
    );

    if (this.totalItems === 29) {
      this.scene.start("GameOver");
    }

    this.infoX = this.info.x;

    if (this.cursors.left.isDown && !this.leftPressed) {
      this.cameras.main.scrollX -= 1024;
      if (this.infoX > 10) {
        this.info.x = this.info.x - 1024;
        this.button.x = this.button.x - 1024;
        this.jokeText.x = this.jokeText.x - 1024;
        this.jokeButton.x = this.jokeButton.x - 1024
        this.timeInfo.x = this.timeInfo.x - 1024
      }
      this.leftPressed = true;
    }
    if (this.cursors.left.isUp) {
      this.leftPressed = false;
    }

    if (this.cursors.right.isDown && !this.rightPressed) {
      this.cameras.main.scrollX += 1024;
      if (this.infoX < 3082) {
        this.info.x = this.info.x + 1024;
        this.button.x = this.button.x + 1024;
        this.jokeText.x = this.jokeText.x + 1024;
        this.jokeButton.x = this.jokeButton.x + 1024
        this.timeInfo.x = this.timeInfo.x + 1024
      }
      this.rightPressed = true;
    }
    if (this.cursors.right.isUp) {
      this.rightPressed = false;
    }
  }

  playJoke() {
    if (speechSynthesis.speaking) {
      return; // Exit if speech synthesis is still speaking
    }

    let joke = this.jokes[Math.floor(Math.random() * this.jokes.length)];

    // Speak the setup of the joke
    let setupMessage = new SpeechSynthesisUtterance(joke.setup);
    speechSynthesis.speak(setupMessage);

    // Wait for a moment before speaking the punchline
    setupMessage.onend = () => {
      let punchlineMessage = new SpeechSynthesisUtterance(joke.punchline);
      speechSynthesis.speak(punchlineMessage);

      // Display the punchline text at the bottom of the Phaser screen
      this.displayJokeText(joke.punchline);
    };

    // Initialize speech recognition if available
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      let recognition = new SpeechRecognition();
      recognition.onresult = function (event) {
        // Handle speech recognition result
        let command = event.results[0][0].transcript.toLowerCase();
        recognition.start();
      };
    }

    // Display the setup text at the bottom of the Phaser screen
    this.displayJokeText(joke.setup);
  }

  displayJokeText(text) {
    // Assuming this is your Phaser text element
    this.jokeText.setText(text);
  }

  gameOver() {
    this.scene.start("GameOver");
  }

  moveFlies() {

    this.tweens.add({
      targets: this.fly[0],
      props: {
        x: { value: 700, duration: 5000, flipX: true },
        y: { value: 50, duration: 15000 },
      },
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,

    });

    this.tweens.add({
      targets: this.fly[1],
      props: {
        x: { value: 70, flipX: true },
        y: { value: 250 },
      },
      duration: 5000,
      ease: "Power1",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.fly[2],
      props: {
        x: { value: 500, duration: 5000, flipX: true },
        y: { value: 500, duration: 10000 },
      },
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });
  }
}
