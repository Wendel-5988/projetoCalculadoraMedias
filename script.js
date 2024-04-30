const form = document.getElementById('form');
const imgApr = '<img src="./images/aprovado.png" alt="Emoji Festejando">'
const imgRpr = '<img src="./images/reprovado.png" alt="Emoji Triste">'
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado!</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado!</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima"));
//criando variável para armazenar tds as linhas:
let linhas = '';

//criando uma função pro botão submit:
form.addEventListener('submit', function(e){ 
//desabilitando o evento padrao do submit para não atualizar a pag ao ser clicado:  
  e.preventDefault();
//chamando as funções criadas abaixo para o submit:
  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

function adicionaLinha() {
//chamando novamente os elementos html pra uma const:
  const nameTask = document.getElementById('nameTask');
  const note = document.getElementById('note');
//validação para ver se o nome da atividade já existe:
  if (atividades.includes(nameTask.value)) {
    alert(`A atividade: ${nameTask.value} já foi adicionada!`);
  }else{
//adicionando os valores dos inputs nas arrays correspondentes:
    atividades.push(nameTask.value);
    notas.push(parseFloat((note.value)));
//função que vai adcionar linha por linha na tabela do html: (concatenamos cada linha.)
    let linha = '<tr>';
    linha += `<td>${nameTask.value}</td>`;
    linha += `<td>${note.value}</td>`;
    linha += `<td>${note.value >= notaMinima ? imgApr : imgRpr}</td>`;  //obs('?'=if e ':'=else).
    linha += `</tr>`;
//esquema para juntar as linhas da tabela concatenando-as:
    linhas += linha   
  }
//limpando o campo de preenchimento:
  nameTask.value = '';
  note.value = '';
}

function atualizaTabela() {
//chamando o elemento "corpo da tabela" para o js:  
  const tBody = document.querySelector('tbody');
//inserindo a nossa variável das linhas no tbody atraves do innerHTML:
  tBody.innerHTML = linhas;
}

  function atualizaMediaFinal() {
  const mediaFinal = calculaMediaFinal();
//inserindo o calculo da media no html:
  document.getElementById('mediaFinalValor').innerHTML = mediaFinal.toFixed(2); //limita a 2 casas decimais.
  document.getElementById('mediaFinalResultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
  let soma = 0;
//estrutura de repetição para calcular a soma das notas:
  for (let i = 0; i <notas.length; i++){
    soma += notas[i];
  }
//calculo da media dividindo a soma das notas com a quantidade de notas adicionadas:
  return soma / notas.length;
}