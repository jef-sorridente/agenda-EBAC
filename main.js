const form = document.getElementById("form");
const containerMensagem = document.getElementById("mensagem");
const numeroContato = document.getElementById("numeroContato");
const nomes = [];
const numeros = [];

let linhas = "";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  adicionaLinha();
  atualizaTabela();
  totalNumero();
});

numeroContato.addEventListener("input", function () {
  mascara();
});

function mascara() {
  let limparValor = numeroContato.value.replace(/\D/g, "").substring(0, 11);
  let numerosArray = limparValor.split("");
  let numeroFormatado = "";

  if (numerosArray.length > 0) {
    numeroFormatado += `(${numerosArray.slice(0, 2).join("")})`;
  }

  if (numerosArray.length > 2) {
    numeroFormatado += ` ${numerosArray.slice(2, 7).join("")}`;
  }
  if (numerosArray.length > 7) {
    numeroFormatado += `-${numerosArray.slice(7, 11).join("")}`;
  }

  numeroContato.value = numeroFormatado;
}

function adicionaLinha() {
  const nomeContato = document.getElementById("nomeContato");

  const mensagem = `O número: <b>${numeroContato.value}</b> já está cadastrado!`;

  if (numeros.includes(numeroContato.value)) {
    containerMensagem.innerHTML = mensagem;
    containerMensagem.classList = "mensagem-erro";
    setTimeout(() => {
      containerMensagem.innerHTML = mensagem;
      containerMensagem.classList = "mensagem-disabilitada";
    }, 4000);
  } else {
    nomes.push(nomeContato.value);
    numeros.push(numeroContato.value);

    let linha = `
    <tr>
    <td>${nomeContato.value}</td>
    <td>${numeroContato.value}</td>
    </tr>`;

    linhas += linha;
  }

  nomeContato.value = "";
  numeroContato.value = "";
}

function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linhas;
}

function totalNumero() {
  const totalNumeros = document.getElementById("totalNumerosCadastrados");
  totalNumeros.innerHTML = numeros.length;
}
