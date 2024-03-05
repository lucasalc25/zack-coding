document.addEventListener('DOMContentLoaded', function() {
  const character = document.getElementById('character');
  const speechBubble = document.getElementById('speech-bubble');
  const fases = [
    { background: '/assets/img/sala.jpg', falas: ["E aí, beleza? Bem-vindo(a) ao Coding Life!", "Seguinte, meus pais precisaram fazer uma viagem e eu vou precisar de ajuda com algumas tarefas que eles me deixaram. Tô contando com você pra me dar uma força hein! Vamo lá?"] },
    { background: '/assets/img/cozinha.jpg', falas: ["A primeira tarefa é levar o lixo pra fora. Eu vou te dar um algoritmo todo bagunçado, você só precisa colocar os passos na ordem correta, beleza?", "Caso não saiba, um algoritmo é nada mais que um conjunto de ações que depois de serem executadas deverão resolver algum problema.", "Agora é com você, manda ver!"] }
  ]
  const texto = document.getElementById('text');
  const gameContainerElemento = document.getElementById('game-container');

  let indiceFaseAtual = 0;
  let faseAtual = fases[indiceFaseAtual];
  let indiceFalaAtual = 0;
  let falaAtual = faseAtual.falas[indiceFalaAtual];
  let animacaoAtiva = false;

  function completarFala(fala) {
    texto.textContent = fala;
    animacaoAtiva = false;
  }
 
   // Função para exibir o texto gradualmente
   function exibirTextoGradualmente(text, index) {
      animacaoAtiva = true;
     if (index < text.length) {
       texto.textContent += text.charAt(index);
       index++;
       setTimeout(function() {
         exibirTextoGradualmente(text, index);
       }, 50); // Ajuste o tempo de exibição aqui (em milissegundos)
     } else {
      animacaoAtiva = false; // Indicar que a animação terminou
    }
   }

  // Função para avançar para o próximo texto ou fase
  function proximoTextoOuFase() {
    if (animacaoAtiva) {
      completarFala(falaAtual);
    } else {  // Se a animação estiver ativa, não fazer nada
      let faseAtual = fases[indiceFaseAtual];

      if (indiceFalaAtual < faseAtual.falas.length - 1) {
        // Se houver mais textos na fase, avançar para o próximo texto
        indiceFalaAtual++;
        falaAtual = faseAtual.falas[indiceFalaAtual];
        texto.textContent = ''; // Limpar o texto atual
        exibirTextoGradualmente(falaAtual, 0);
      } else {
        // Se todos os textos da fase foram exibidos, avançar para a próxima fase
        if (indiceFaseAtual < fases.length - 1) {
          indiceFaseAtual++;
          indiceFalaAtual = 0;
          faseAtual = fases[indiceFaseAtual];
          falaAtual = faseAtual.falas[indiceFalaAtual];
          gameContainerElemento.style.backgroundImage = 'url(' + faseAtual.background + ')';
          gameContainerElemento.style.backgroundSize = 'cover';
          texto.textContent = ''; // Limpar o texto atual
          animacaoAtiva = true; // Indicar que a animação está ativa
          exibirTextoGradualmente(falaAtual, 0);
        }
      }
    }
  }

    gameContainerElemento.style.backgroundImage = 'url(' + faseAtual.background + ')';
    gameContainerElemento.style.backgroundSize = 'cover';

  // Adicionar evento de clique à tela
  document.addEventListener('click', proximoTextoOuFase);

  character.addEventListener('animationend', function() {
   // Exibir o balão de fala após a animação do personagem
   speechBubble.classList.add('show');
   // Exibir o texto com a animação de digitado
   exibirTextoGradualmente(falaAtual, 0);
  });


});