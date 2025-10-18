// No script.js, atualize a função loadQuestion:

function loadQuestion() {
    if (!canAnswer) return;
    
    const question = perguntas[currentQuestionIndex];
    
    // Atualiza a pergunta
    questionElement.innerHTML = `<h2>${question.pergunta}</h2>`;
    
    // Limpa opções anteriores
    optionsElement.innerHTML = '';
    
    // Cria os botões de opção
    const opcoes = ['a', 'b', 'c', 'd'];
    opcoes.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.className = 'option-btn';
        botao.textContent = question[opcao];
        botao.setAttribute('data-letter', opcao.toUpperCase());
        botao.onclick = function() {
            verificarResposta(opcao, this);
        };
        optionsElement.appendChild(botao);
    });
}
