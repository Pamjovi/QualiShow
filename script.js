// Inicializar partículas
document.addEventListener('DOMContentLoaded', function() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffd700" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffd700",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }
});

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
const somAcerto = document.getElementById("somAcerto");
const somErro = document.getElementById("somErro");

function mostrarPergunta() {
  const q = perguntas[indice];
  elementoPergunta.classList.remove("fade");
  void elementoPergunta.offsetWidth; // reinicia animação
  elementoPergunta.classList.add("fade");

  elementoPergunta.innerHTML = `<h2>${q.pergunta}</h2>`;
  elementoOpcoes.innerHTML = "";

  ["a", "b", "c", "d"].forEach((letra) => {
    const botao = document.createElement("button");
    botao.innerText = `${letra.toUpperCase()}: ${q[letra]}`;
    botao.onclick = () => verificarResposta(letra, botao);
    elementoOpcoes.appendChild(botao);
  });
}

function verificarResposta(letra, botao) {
  const correta = perguntas[indice].correta.toUpperCase();
  const todosBotoes = elementoOpcoes.getElementsByTagName("button");
  
  // Desabilita todos os botões após resposta
  Array.from(todosBotoes).forEach(btn => {
    btn.style.pointerEvents = "none";
  });

  if (letra.toUpperCase() === correta) {
    somAcerto.play();
    botao.classList.add("correto");
  } else {
    somErro.play();
    botao.classList.add("errado");
    
    // Most
