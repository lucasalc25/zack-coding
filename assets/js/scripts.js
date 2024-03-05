document.addEventListener('DOMContentLoaded', function() {
  const character = document.getElementById('character');
  const speechBubble = document.getElementById('speech-bubble');
  const fases = [
    { background: '/assets/img/sala.jpg', falas: ["E aí, beleza? Bem-vindo(a) ao Coding Life!", "Seguinte, meus pais precisaram fazer uma viagem e eu vou precisar de ajuda com algumas tarefas que eles deixaram pra mim. To contando contigo pra me dar uma força hein! Vamo lá?"] },
    { background: '/assets/img/sala.jpg', falas: ["A primeira tarefa é levar o lixo pra fora. Eu vou te dar um algoritmo todo bagunçado, você só precisa colocar os passos na ordem correta, beleza?", "Caso não saiba, um algoritmo é nada mais que um conjunto de ações que depois de serem executadas deverão resolver algum problema.", "Agora é com você, manda ver!"] }
  ]
  const texto = document.getElementById('text');

  let indiceFaseAtual = 0;
  let faseAtual = fases[indiceFaseAtual];
  let indiceFalaAtual = 0;
  let falaAtual = faseAtual.falas[indiceFalaAtual];
  let animacaoAtiva = false;
 
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

  // Adicionar evento de clique à tela
  document.addEventListener('click', function() {
    // Se a animação estiver ativa, interrompa-a e exiba o próximo texto da fase
    if (animacaoAtiva) {
      terminarAnimacao();
      setTimeout(function() {
        if (indiceTextoAtual < faseAtual.textos.length - 1) {
          indiceTextoAtual++;
          textoAtual = faseAtual.textos[indiceTextoAtual];
          textoElemento.textContent = ''; // Limpa o texto atual
          exibirTextoGradualmente(textoAtual, 0);
          animacaoAtiva = true; // Restaura a animação
        } else {
          // Se todos os textos da fase foram exibidos, avance para a próxima fase
          if (indiceFaseAtual < fases.length - 1) {
            indiceFaseAtual++;
            faseAtual = fases[indiceFaseAtual];
            indiceTextoAtual = 0;
            textoAtual = faseAtual.textos[indiceTextoAtual];
            gameContainerElemento.style.backgroundImage = 'url(' + faseAtual.background + ')';
            textoElemento.textContent = ''; // Limpa o texto atual
            exibirTextoGradualmente(textoAtual, 0);
            animacaoAtiva = true; // Restaura a animação
          }
        }
      }, 500); // Tempo de espera antes de exibir o próximo texto (em milissegundos)
    }
  });

   // Função para terminar a animação ao clicar na tela
  function terminarAnimacao() {
    animacaoAtiva = false;
    texto.textContent = falas; // Exibe todo o texto instantaneamente
  }

   // Adicionar evento de clique à tela
   document.addEventListener('click', terminarAnimacao);

  character.addEventListener('animationend', function() {
   // Exibir o balão de fala após a animação do personagem
   speechBubble.classList.add('show');
   // Exibir o texto com a animação de digitado
   exibirTextoGradualmente(falaAtual, 0);
  });


});