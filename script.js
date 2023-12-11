var totalCarrinho = 0; // Variável para armazenar o total do carrinho
var quantidadesNoCarrinho = {}; // Objeto para armazenar as quantidades de cada item no carrinho

function abrirModal(nomeProduto, precoProduto, idModal, tipoProduto) {
    var modal = document.getElementById(idModal + "-modal");

    // Atualiza o conteúdo do modal
    modal.innerHTML = `
        <h3>${nomeProduto}</h3>
        <p>Preço: R$${precoProduto.toFixed(2)}</p>
        <label for="${idModal}-quantidade">Quantidade:</label>
        <input type="number" id="${idModal}-quantidade" value="1">
        <button onclick="adicionarAoCarrinho('${nomeProduto}', ${precoProduto}, '${idModal}')">Adicionar ao Carrinho</button>
        <button onclick="fecharModal('${idModal}')">Fechar</button>
    `;

    // Exibe o modal
    modal.style.display = "block";
}

function adicionarAoCarrinho(nomeProduto, precoProduto, idModal) {
    var quantidade = parseInt(document.getElementById(`${idModal}-quantidade`).value);

    // Adiciona a quantidade ao carrinho
    if (quantidadesNoCarrinho[idModal]) {
        quantidadesNoCarrinho[idModal] += quantidade;
    } else {
        quantidadesNoCarrinho[idModal] = quantidade;
    }

    // Calcula o preço total
    var precoTotal = precoProduto * quantidade;

    // Adiciona o código para adicionar ao carrinho aqui
    var carrinhoContainer = document.getElementById("carrinho-container");
    carrinhoContainer.innerHTML += `
        <p>${quantidade}x ${nomeProduto} - R$${precoTotal.toFixed(2)}</p>
    `;

    totalCarrinho += precoTotal; // Atualiza o total do carrinho
    document.getElementById("total-carrinho").innerText = `Total do Carrinho: R$${totalCarrinho.toFixed(2)}`;

    fecharModal(idModal);
}

function fecharModal(idModal) {
    // Fecha o modal
    document.getElementById(idModal + "-modal").style.display = "none";
}