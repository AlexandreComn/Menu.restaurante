function abrirModalPasteis(nome, preco, id) {
    var modal = document.getElementById("modalPasteis");
    var modalTitle = document.getElementById("modalTitle");
    var modalPrice = document.getElementById("modalPrice");
    var modalId = document.getElementById("modal-id");

    modalTitle.textContent = nome;
    modalPrice.textContent = "Preço: R$" + preco;
    modalId.value = id;

    var camposAdicionais = document.getElementById("camposAdicionais");
    camposAdicionais.style.display = "none";

    var quantidadeAdicionais = document.getElementById("quantidadeAdicionais");
    var descricaoAdicionais = document.getElementById("descricaoAdicionais");

    quantidadeAdicionais.value = 0;
    descricaoAdicionais.value = "";

    modal.style.display = "block";
}

function fecharModalPasteis() {
    var modal = document.getElementById("modalPasteis");
    modal.style.display = "none";
}

function mostrarCamposAdicionais() {
    var tipoAdicional = document.getElementById("additional").value;
    var camposAdicionais = document.getElementById("camposAdicionais");

    if (tipoAdicional === "3") {
        camposAdicionais.style.display = "block";
    } else {
        camposAdicionais.style.display = "none";
    }
}

function adicionarAoCarrinhoPasteis() {
    var nome = document.getElementById("modalTitle").textContent;
    var preco = document.getElementById("modalPrice").textContent.split(" ")[1];
    var quantidade = document.getElementById("quantity").value;

    // Use um nome diferente para a função para evitar a chamada recursiva
    adicionarItemAoCarrinhoPasteis(nome, preco, quantidade);
    fecharModalPasteis();
}

var carrinho = [];

function adicionarItemAoCarrinhoPasteis(nome, preco, quantidade) {
    // Cria um objeto com as informações do pastel
    var item = {
        nome: nome,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
        tipo: 'pastel'
    };

    // Adiciona o pastel ao carrinho
    carrinho.push(item);

    // Atualiza a exibição do carrinho
    atualizarCarrinho();

    // Fecha o modal
    fecharModalPasteis();
}

function atualizarCarrinho() {
    var carrinhoContainer = document.getElementById("carrinho-container");
    carrinhoContainer.innerHTML = "";

    // Itera sobre os itens do carrinho e os exibe
    for (var i = 0; i < carrinho.length; i++) {
        var item = carrinho[i];

        var itemDiv = document.createElement("div");
        itemDiv.classList.add("carrinho-item");

        var nomeDiv = document.createElement("div");
        nomeDiv.textContent = item.nome;

        var precoDiv = document.createElement("div");
        precoDiv.textContent = "Preço: R$" + (item.preco * item.quantidade).toFixed(2);

        var quantidadeDiv = document.createElement("div");
        quantidadeDiv.textContent = "Quantidade: " + item.quantidade;

        itemDiv.appendChild(nomeDiv);
        itemDiv.appendChild(precoDiv);
        itemDiv.appendChild(quantidadeDiv);

        carrinhoContainer.appendChild(itemDiv);
    }
}
