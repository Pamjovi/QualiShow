const perguntas = [
  {
    pergunta: "Qual é a capital do Brasil?",
    alternativas: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
    correta: 1
  },
  {
    pergunta: "Quem pintou a Mona Lisa?",
    alternativas: ["Van Gogh", "Michelangelo", "Leonardo da Vinci", "Picasso"],
    correta: 2
  }
];

let indice = 0;

function mostrarPergunta() {
  const perguntaAtual = perguntas[indice];
  document.getElementById("pergunta").innerText = perguntaAtual.pergunta;

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  perguntaAtual.alternativas.forEach((opcao, i) => {
    const botao = document.createElement("button");
    botao.innerText = opcao;
    botao.onclick = () => verificarResposta(i);
    opcoesDiv.appendChild(botao);
  });
}

function verificarResposta(escolha) {
  if (escolha === perguntas[indice].correta) {
    alert("Resposta certa! 🎉");
  } else {
    alert("Errou! 😅");
  }

  indice++;
  if (indice < perguntas.length) {
    mostrarPergunta();
  } else {
    alert("Fim do jogo!");
  }
}

window.onload = mostrarPergunta;
