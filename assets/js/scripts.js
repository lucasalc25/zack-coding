document.addEventListener('DOMContentLoaded', function() {
  const character = document.getElementById('character');
  const speechBubble = document.getElementById('speech-bubble');
  const falas = "Olá! Bem-vindo(a) ao Coding Life! Meu nome é Zack, muito prazer!";
  const texto = document.getElementById('text');
  let animacaoAtiva = true;
 
   // Função para exibir o texto gradualmente
   function exibirTextoGradualmente(text, index) {
     if (animacaoAtiva && index < text.length) {
       texto.textContent += text.charAt(index);
       index++;
       setTimeout(function() {
         exibirTextoGradualmente(text, index);
       }, 50); // Ajuste o tempo de exibição aqui (em milissegundos)
     }
   }

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
   exibirTextoGradualmente(falas, 0);
  });


});