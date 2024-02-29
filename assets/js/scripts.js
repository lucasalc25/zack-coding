const fases = [
    {
        algoritmo: [
            "Ler a primeira nota do aluno.",
            "Ler a segunda nota do aluno.",
            "Ler a terceira nota do aluno.",
            "Calcular a soma das três notas.",
            "Dividir a soma pelo número de notas (3)",
            "Mostrar a média calculada."
        ],
        pseudoCodigo: [
            "algoritmo 'Média de 3'",
            "var",
            "nota1, nota2, nota3, soma, media: real",
            "inicio",
            "ler(nota1)",
            "ler(nota2)",
            "ler(nota3)",
            "soma <- nota1 + nota2 + nota3",
            "media <- soma / 3",
            "escrever(media)",
            "fimalgoritmo",
        ]
    },
    {
        algoritmo: [
            "Ler o primeiro valor.",
            "Ler o segundo valor",
            "Ler o terceiro valor",
            "Se o primeiro valor for maior que o segundo e maior que o terceiro, então o maior é o primeiro valor",
            "Se o segundo valor for maior que o primeiro e maior que o terceiro, então o maior é o segundo valor",
            "Senão o maior é o terceiro valor",
            "Mostrar o maior valor",
        ],
        pseudoCodigo: [
            "algoritmo 'Maior número'",
            "var",
            "numero1, numero2, numero3, maior: inteiro",
            "inicio",
            "ler(numero1)",
            "ler(numero2)",
            "ler(numero3)",
            "se numero1 > numero2 E numero1 > numero3 então",
            "maior <- numero1",
            "senão se numero2 > numero1 E numero2 > numero3 então",
            "maior <- numero2",
            "senão",
            "maior <- numero3",
            "escrever(maior)",
            "fimalgoritmo",
        ]
    }
]

let faseAtual = 0;
let faseAlgoritmo = true;

function iniciarFase() {
    const fase = fases[faseAtual];
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<h3>Monte o Algoritmo</h3>';
    const wrongDiv = document.getElementById('wrong');
    wrongDiv.textContent = '';
  
    const sortableList = document.querySelector('ul');
    sortableList.classList.add('sortable');
    outputDiv.appendChild(sortableList);
  
    const opcoesDesordenadas = fase.algoritmo.slice().sort(() => Math.random() - 0.5);
    
    opcoesDesordenadas.forEach(opcao => {
      const li = document.createElement('li');
      li.classList.add('ui-state-default');
      li.textContent = opcao;
      sortableList.appendChild(li);
    });

    $(function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
    });
  
    outputDiv.innerHTML += "<button onclick='verificarOrdem()'>Confirmar</button>";
  }
  
  function verificarOrdem() {
    const fase = fases[faseAtual];
    const etapas = document.querySelectorAll("#sortable li");
    let ordemCorreta = true;
    for (let i = 0; i < etapas.length; i++) {
      if (etapas[i].textContent !== fase.algoritmo[i]) {
        ordemCorreta = false;
        break;
      }
    }
  
    if (ordemCorreta) {
      setTimeout(() => iniciarFasePseudocodigo(), 1000);
    } else {
      const wrongDiv = document.getElementById('wrong');
      setTimeout(() => wrongDiv.textContent = "Ordem incorreta. Tente novamente.", 1000);
    }
  }
  
  function iniciarFasePseudocodigo() {
    const fase = fases[faseAtual];
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = '';
    const wrongDiv = document.getElementById('wrong');
    wrongDiv.textContent = '';
    const completeDiv = document.getElementById('complete');
    completeDiv.innerHTML = '<h3>Agora é a vez do código!</h3>';
    
    const sortableList = document.createElement('ul');
    sortableList.id = 'sortable';
    sortableList.classList.add('sortable');
    outputDiv.appendChild(sortableList);
  
    fase.pseudoCodigo.forEach(opcao => {
      const li = document.createElement('li');
      li.classList.add('ui-state-default');
      li.textContent = opcao;
      sortableList.appendChild(li);
    });

    $(function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
    });
  
    outputDiv.innerHTML += "<button onclick='verificarPseudocodigo()'>Confirmar</button>";
  }
  
  function verificarPseudocodigo() {
    const fase = fases[faseAtual];
    const etapas = document.querySelectorAll("#sortable li");
    let ordemCorreta = true;
    for (let i = 0; i < etapas.length; i++) {
      if (etapas[i].textContent !== fase.pseudocodigoOpcoes[i]) {
        ordemCorreta = false;
        break;
      }
    }
  
    if (ordemCorreta) {
      const completeDiv = document.getElementById('complete');
      completeDiv.textContent = "Pseudocódigo correto! Avançando para a próxima fase";
      faseAtual++;
      iniciarFase();
    } else {
      const completeDiv = document.getElementById('complete');
      completeDiv.textContent = "Pseudocódigo incorreto. Tente novamente.";
    }
  }
  
  window.onload = iniciarFase;