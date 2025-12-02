// Classe Bola
class Bola {
    constructor(x, y, velocidadeX, velocidadeY, tamanho) {
        this.x = x;
        this.y = y;
        this.velocidadeX = velocidadeX * 4;
        this.velocidadeY = velocidadeY * 4;
        this.velocidadeIncrement = 0.3;
        this.tamanho = tamanho;
    }

    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    }

    desenhar() {
        fill(255);
        ellipse(this.x, this.y, this.tamanho, this.tamanho);
    }
}

// Classe Raquete
class Raquete {
    constructor(x, y, largura, altura, velocidade) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = 50;
        this.velocidade = velocidade;
    }

    atualizar() {
        if (keyIsDown(UP_ARROW) && this.y > 0) {
            this.y -= this.velocidade;
        } else if (keyIsDown(DOWN_ARROW) && this.y + this.altura < height) {
            this.y += this.velocidade;
        }
    }

    desenhar() {
        fill(255, 255, 255);
        rect(this.x, this.y, this.largura, this.altura);
    }
}

// Variáveis do jogo
let bola;
let raqueteJogador;
let raqueteAutomatica;
let meuPlacar = 0;
let adversarioPlacar = 0;

function setup() {
    createCanvas(800, 400);
    background(0);

    // Inicializar objetos do jogo
    bola = new Bola(width / 2, height / 2, random(-3, 3), random(-3, 3), 20);
    raqueteJogador = new Raquete(20, height / 2 - 50, 10, 100, 5);
    raqueteAutomatica = new Raquete(width - 30, height / 2 - 50, 10, 100, 3);
}

function draw() {
    background(265, 165, 0);

    // Círculo central
    stroke(255); // Definir a cor da linha do círculo
    noFill(); // Isso garante que o círculo fique com o centro vazio
    strokeWeight(4); // Definir a espessura da linha do círculo
    ellipse(width / 2, height / 2, 200); // Círculo no centro do campo

    // Bolinha central
    fill(255); // Definir a cor do círculo
    ellipse(width / 2, height / 2, 15); // Círculo no centro do campo

    // Grande área (retângulo maior)
    noFill(); // Isso garante que o retângulo fique com o centro vazio
    rect(0, height / 4, width / 8, height / 2); // Esquerda
    rect(width - width / 8, height / 4, width / 8, height / 2); // Direita



    // Linhas laterais e central
    line(width / 2, 0, width / 2, height); // Linha central
    stroke(255); // Define a cor do contorno (stroke) para branco
    noFill(); // Garante que o retângulo fique com o centro vazio
    strokeWeight(4); // Define a espessura da linha do retângulo
    rect(0, 0, width, height); // Desenha o retângulo ao redor de todo o campo


    // Atualizar e desenhar objetos do jogo
    bola.atualizar();
    bola.desenhar();

    raqueteJogador.atualizar();
    raqueteJogador.desenhar();

    let erro = random(-20, 20);
    raqueteAutomatica.y = lerp(raqueteAutomatica.y, bola.y - raqueteAutomatica.altura / 2 + erro, 0.05);
    raqueteAutomatica.desenhar();

    // Colisão com as paredes
    if (bola.x - bola.tamanho / 2 < 0) {
        adversarioPlacar++;
        reiniciarBola();
    } else if (bola.x + bola.tamanho / 2 > width) {
        meuPlacar++;
        reiniciarBola();
    }

    if (bola.y - bola.tamanho / 2 < 0 || bola.y + bola.tamanho / 2 > height) {
        bola.velocidadeY *= -1;
    }

    function reiniciarBola() {
        bola.x = width / 2;
        bola.y = height / 2;
        bola.velocidadeX = random(-3, 3) * 4;
        bola.velocidadeY = random(-3, 3) * 4;
    }

    // Placar
    textStyle(NORMAL); // Define o estilo do texto como normal, o que deixa as letras mais finas
    strokeWeight(2); // Remove qualquer contorno do texto
    textSize(32);
    fill(255);
    text(`Jogador: ${meuPlacar}`, 100, 30);
    text(`Computador: ${adversarioPlacar}`, width - 300, 30);

    // Colisão com as raquetes
    if (bola.x - bola.tamanho / 2 < raqueteJogador.x + raqueteJogador.largura &&
        bola.x + bola.tamanho / 2 > raqueteJogador.x &&
        bola.y - bola.tamanho / 2 < raqueteJogador.y + raqueteJogador.altura &&
        bola.y + bola.tamanho / 2 > raqueteJogador.y) {
        bola.velocidadeX *= -1;
        bola.velocidadeX += bola.velocidadeIncrement;
        bola.velocidadeY += random(-1, 1);
    }

    if (bola.x - bola.tamanho / 2 < raqueteAutomatica.x + raqueteAutomatica.largura &&
        bola.x + bola.tamanho / 2 > raqueteAutomatica.x &&
        bola.y - bola.tamanho / 2 < raqueteAutomatica.y + raqueteAutomatica.altura &&
        bola.y + bola.tamanho / 2 > raqueteAutomatica.y) {
        bola.velocidadeX *= -1;
        bola.velocidadeX -= bola.velocidadeIncrement;
        bola.velocidadeY += random(-1, 1);
    }
}
