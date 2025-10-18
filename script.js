// Banco de perguntas padrão
const defaultQuestions = [
    {
        pergunta: "Qual é a capital do Brasil?",
        a: "Rio de Janeiro",
        b: "São Paulo", 
        c: "Brasília",
        d: "Salvador",
        correta: "c"
    },
    {
        pergunta: "Quantos estados tem o Brasil?",
        a: "26 estados",
        b: "27 estados",
        c: "25 estados", 
        d: "28 estados",
        correta: "b"
    }
];

// Carrega perguntas do localStorage ou usa as padrão
let perguntas = JSON.parse(localStorage.getItem('perguntas')) || defaultQuestions;

// Elementos da página
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

let currentQuestionIndex = 0;
let canAnswer = true;

// Função para iniciar o jogo
function startGame() {
    if (perguntas.length === 0) {
        showNoQuestionsMessage();
        return;
    }
    loadQuestion();
}

// Função para carregar uma pergunta
function loadQuestion() {
    if (!canAnswer) return;
    
    const question = perguntas[currentQuestionIndex];
    
    // Aplica animação
    questionElement.classList.remove('fade-in');
    void questionElement.offsetWidth; // Força reflow
    questionElement.classList.add('fade-in');
    
    // Insere a pergunta
    questionElement.innerHTML = `<h2>${question.pergunta}</h2>`;
    
    // Limpa opções anteriores
    optionsElement.innerHTML = '';
    
    // Cria os botões de opção
    const options = ['a', 'b', 'c', 'd'];
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = `${option.toUpperCase()}: ${question[option]}`;
        button.onclick = () => checkAnswer(option, button);
        optionsElement.appendChild(button);
    });
}

// Função para verificar resposta
function checkAnswer(selectedOption, button) {
    if (!canAnswer) return;
    
    canAnswer = false;
    const correctOption = perguntas[currentQuestionIndex].correta.toLowerCase();
    const allButtons = optionsElement.getElementsByClassName('option-btn');
    
    // Desabilita todos os botões
    Array.from(allButtons).forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    if (selectedOption === correctOption) {
        // Resposta correta
        correctSound.play();
        button.classList.add('correct');
    } else {
        // Resposta errada
        wrongSound.play();
        button.classList.add('wrong');
        
        // Mostra a resposta correta
        Array.from(allButtons).forEach(btn => {
            if (btn.textContent.toLowerCase().startsWith(correctOption + ':')) {
                btn.classList.add('correct');
            }
        });
    }
    
    // Próxima pergunta após 2 segundos
    setTimeout(() => {
        currentQuestionIndex = (currentQuestionIndex + 1) % perguntas.length;
        canAnswer = true;
        loadQuestion();
    }, 2000);
}

// Mensagem quando não há perguntas
function showNoQuestionsMessage() {
    questionElement.innerHTML = '<h2>Nenhuma pergunta cadastrada</h2>';
    optionsElement.innerHTML = '<p>Use o botão abaixo para adicionar perguntas</p>';
}

// Inicia o jogo quando a página carrega
document.addEventListener('DOMContentLoaded', startGame);

// Função para salvar perguntas (usada na admin)
function saveQuestions(newQuestions) {
    localStorage.setItem('perguntas', JSON.stringify(newQuestions));
    perguntas = newQuestions;
}
