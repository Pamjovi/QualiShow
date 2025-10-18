let perguntas = JSON.parse(localStorage.getItem("perguntas")) || [];

if (perguntas.length === 0) {
  perguntas = [
    {
      pergunta: "Qual é a capital da França?",
      a: "Londres",
      b: "Berlim",
      c: "Paris",
      d: "Lisboa",
      correta: "C"
    }
  ];
}

let indice = 0;
const elementoPergunta = document.getElementById("pergunta");
const elementoOpcoes = document.getElementById("opcoes");

function mostrarPergunta() {
  const q = perguntas[indice];
  elementoPergunta.innerHTML = `<h2>${q.pergunta}</h2>`;
  elementoOpcoes.innerHTML = "";

  ["a", "b", "c", "d"].forEach((letra) => {
    const botao = document.createElement("button");
    botao.innerText = `${letra.toUpperCase()}: ${q[letra]}`;
    botao.onclick = () => verificarResposta(letra);
    elementoOpcoes.appendChild(botao);
  });
}

function verificarResposta(letra) {
  const correta = perguntas[indice].correta.toUpperCase();
  if (letra.toUpperCase() === correta) {
    alert("🎉 Resposta correta!");
  } else {
    alert("❌ Resposta errada!");
  }
  indice = (indice + 1) % perguntas.length;
  mostrarPergunta();
}

mostrarPergunta();
