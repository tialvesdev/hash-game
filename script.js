// Setando constantes com seu dado
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartBtn = document.querySelector("[data-restart-btn]");
const turnText = document.querySelector("[data-turn-text]");

const aboutBtn = document.querySelector("[data-about-btn]");
const about = document.querySelector("[data-about]");

// MouseOver do botão sobre
const aboutHover = () => {
  aboutBtn.innerHTML = `<i class="fa-solid fa-question"></i> Sobre`;
}

// MouseOut do botão sobre
const aboutBack = () => {
  aboutBtn.innerHTML = `<i class="fa-solid fa-question"></i>`;
}

// Click do sobre
const aboutClick = () => {
  about.classList.add('show');
}

// Fechar Sobre
const aboutClose = () => {
  about.classList.remove('show');
}

// Variável para troca de turno
let isCircleTurn;

// Combinações para Vitória
const winningCombinations = [
  // Verticais
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Horizontais
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonais
  [0, 4, 8],
  [2, 4, 6],
];

// Começo de Jogo
const startGame = () => {
  // Inicia com o Jogador X
  isCircleTurn = false;

  //   Laço de repetição para rodada
  for (const cell of cellElements) {
    cell.classList.remove("o");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);

    cell.addEventListener("click", handleClick, { once: true });
  }

  //   Arrumar o hover
  setBoardHoverClass();

  //   Tirar a mensagem e recomeçar o jogo
  winningMessage.classList.remove("show");

  //   Setar o texto para o usuário
  turnText.innerText = "Turno do X!";
};

// Verificação de empate ou vitória
const endGame = (isDraw) => {
  // troca de texto na tela final
  if (isDraw) {
    winningMessageText.innerText = "Empate!";

    // Trocar texto dentro da tela ao empate
    turnText.innerText = "Parabéns a ambos!"
  } else {
      winningMessageText.innerText = isCircleTurn ? "O ganhou!" : "X ganhou!";
      
        //   Trocar texto dentro da tela quando houver vitória
        turnText.innerText = isCircleTurn
          ? "Parabéns jogador O!"
          : "Parabéns jogador X!";
  }

  //   Mostrar mensagem
  winningMessage.classList.add("show");
};

// Verificar se alguma combinação de vitória foi atendida
const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

// Verificar se todo espaço foi preenchido e a vitória não foi alertada
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
};

// Setar jogada
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);

  //   Trocar o texto para indicar a jogada
  turnText.innerText = isCircleTurn ? "Turno do X!" : "Turno do O!";
};

// Arrumar o hover usando as classes
const setBoardHoverClass = () => {
  board.classList.remove("x");
  board.classList.remove("o");

  //   Adicionar as classes no quadro
  if (isCircleTurn) {
    board.classList.add("o");
  } else {
    board.classList.add("x");
  }
};

// Troca de turnos
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

// Click do jogo
const handleClick = (e) => {
  // Setar X ou O
  const cell = e.target;
  const classToAdd = isCircleTurn ? "o" : "x";

  //   Setar jogada
  placeMark(cell, classToAdd);

  // Verificar por Vitória
  const isWin = checkForWin(classToAdd);

  //   Varificar por Empate
  const isDraw = checkForDraw();

  //   Verificações
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    // Verificar por empate
    endGame(true);
  } else {
    // Mudar o Símbolo
    swapTurns();
  }
};

// Começar jogo
startGame();

// Reiniciar Jogo
restartBtn.addEventListener("click", startGame);
