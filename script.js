// SHOW DO MILHÃO - SCRIPT PRINCIPAL

console.log('🚀 Show do Milhão - Script carregado!');

// Perguntas padrão
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
    },
    {
        pergunta: "Qual é o maior planeta do sistema solar?",
        a: "Terra",
        b: "Júpiter",
        c: "Saturno",
        d: "Marte",
        correta: "b"
    }
];

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Iniciando Show do Milhão...');
    initializeGame();
});

function initializeGame() {
    console.log('🔄 Carregando perguntas...');
    
    // Carrega perguntas do localStorage ou usa as padrão
    let perguntas = JSON.parse(localStorage.getItem('perguntas'));
    if (!perguntas || perguntas.length === 0) {
        console.log('📝 Usando perguntas padrão...');
        perguntas = defaultQuestions;
        localStorage.setItem('perguntas', JSON.stringify(perguntas));
    }
    
    console.log(`📚 ${perguntas.length} perguntas carregadas`);
    
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options-grid');
    let currentQuestionIndex = 0;
    let canAnswer = true;
    
    // Carrega a primeira pergunta
    loadQuestion();
    
    function loadQuestion() {
        if (!canAnswer) return;
        
        const question = perguntas[currentQuestionIndex];
        console.log(`❓ Carregando pergunta ${currentQuestionIndex + 1}: ${question.pergunta}`);
        
        // Atualiza a pergunta
        questionElement.innerHTML = `<h2>${question.pergunta}</h2>`;
        
        // Limpa opções anteriores
        optionsElement.innerHTML = '';
        
        // Cria os botões de opção
        const opcoes = ['a', 'b', 'c', 'd'];
        opcoes.forEach(opcao => {
            const botao = document.createElement('button');
            botao.className = 'option-btn';
            botao.textContent = question[opcao];
            botao.setAttribute('data-letter', opcao.toUpperCase());
            botao.onclick = function() {
                checkAnswer(opcao, this);
            };
            optionsElement.appendChild(botao);
        });
        
        console.log('✅ Pergunta carregada com sucesso');
    }
    
    function checkAnswer(selectedOption, clickedButton) {
        if (!canAnswer) return;
        
        console.log(`🎯 Resposta selecionada: ${selectedOption}`);
        
        canAnswer = false;
        const correctOption = perguntas[currentQuestionIndex].correta;
        const allButtons = optionsElement.getElementsByClassName('option-btn');
        
        // Desabilita todos os botões
        for (let btn of allButtons) {
            btn.style.pointerEvents = 'none';
        }
        
        if (selectedOption === correctOption) {
            // Resposta correta
            console.log('🎉 Resposta correta!');
            document.getElementById('correctSound').play().catch(e => console.log('🔇 Erro ao tocar som: ', e));
            clickedButton.classList.add('correct');
        } else {
            // Resposta errada
            console.log('❌ Resposta errada!');
            document.getElementById('wrongSound').play().catch(e => console.log('🔇 Erro ao tocar som: ', e));
            clickedButton.classList.add('wrong');
            
            // Mostra a resposta correta
            for (let btn of allButtons) {
                if (btn.getAttribute('data-letter').toLowerCase() === correctOption) {
                    btn.classList.add('correct');
                }
            }
        }
        
        // Próxima pergunta após 2 segundos
        setTimeout(() => {
            currentQuestionIndex = (currentQuestionIndex + 1) % perguntas.length;
            canAnswer = true;
            loadQuestion();
        }, 2000);
    }
}

// Função para debug
window.debugGame = function() {
    console.log('🐛 Debug do jogo:');
    console.log('- LocalStorage:', localStorage.getItem('perguntas'));
    console.log('- Elementos DOM:', {
        question: document.getElementById('question'),
        options: document.getElementById('options-grid')
    });
};
