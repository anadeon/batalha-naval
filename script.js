// quantidade de linhas e colunas do tabuleiro
var rows = 10;
var cols = 10;

// tamanho em pixels de cada quadrado do tabuleiro
var squareSize = 50;

// pega a <div> principal onde o tabuleiro será montado
var gameBoardContainer = document.getElementById("gameboard");

// dois loops para criar 100 quadrados (10 linhas x 10 colunas)
for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
        var square = document.createElement("div");
        gameBoardContainer.appendChild(square);
        square.id = "s" + j + i;

        // calcula a posição do quadrado usando a linha e coluna
        var topPosition = j * squareSize;
        var leftPosition = i * squareSize;

        // posiciona o quadrado usando CSS
        square.style.top = topPosition + "px";
        square.style.left = leftPosition + "px";
    }
    }

    // conta quantas partes de navios o jogador já acertou
    var hitCount = 0;

    // MATRIZ DO TABULEIRO (onde estão os navios)
    var gameBoard = [
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    // adiciona o evento de clique
    gameBoardContainer.addEventListener("click", fireTorpedo, false);

    // Função responsável por processar o "tiro"
    function fireTorpedo(e) {
    if (e.target !== e.currentTarget) {
        // pega a linha e coluna através do ID do quadrado
        // ex: id "s34" → row = 3, col = 4
        var row = e.target.id.substring(1, 2);
        var col = e.target.id.substring(2, 3);

        // Tiro na água
        if (gameBoard[row][col] == 0) {
        e.target.style.background = "#bbb";
        gameBoard[row][col] = 3;

        // Acertou o navio
        } else if (gameBoard[row][col] == 1) {
        e.target.style.background = "red";
        gameBoard[row][col] = 2;

        hitCount++;

        // quando acerta todos os navios
        if (hitCount == 17) {
            alert(
            "Todos os navios de guerra inimigos foram derrotados! Você venceu!"
            );
        }

        // Aviso se já atirou nesse local
        } else if (gameBoard[row][col] > 1) {
        alert("Pare de desperdiçar seus canhões! Você já disparou contra este local.");
        }
    }

    // impede que o clique se espalhe para outros elementos
    e.stopPropagation();
}
