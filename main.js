var bird;
var speedX = 3;
var speedY = 3;

class BirdGame extends Phaser.Scene {
  preload() {
    this.load.image("bg", "assets/bg_space.png");
    this.load.spritesheet("bird", "assets/bird-green.png", {
      frameWidth: 75,
      frameHeight: 75,
    });
  }

  create() {
    this.add.image(400, 300, "bg").setScale(1.2);
    bird = this.add.sprite(100, 300, "bird").setScale(1.3);

    // Criando a animação de voo do pássaro
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1, // Loop infinito
    });

    bird.anims.play("fly");

    // Criando estrelas aleatórias no fundo
    for (let i = 0; i < 20; i++) {
      let x = Phaser.Math.Between(0, 800);
      let y = Phaser.Math.Between(0, 600);
      this.add.circle(x, y, 5, 0xffffff);
    }
  }

  update() {
    bird.x += speedX;
    bird.y += speedY;

    // Verificando colisão com as bordas horizontais
    if (bird.x >= 800 || bird.x <= 0) {
      speedX *= -1; // Inverte a direção horizontal
      bird.flipX = !bird.flipX; // Inverte a orientação do sprite
    }

    // Verificando colisão com as bordas verticais
    if (bird.y >= 600 || bird.y <= 0) {
      speedY *= -1; // Inverte a direção vertical
    }
  }
}

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: BirdGame,
};

var game = new Phaser.Game(config);
