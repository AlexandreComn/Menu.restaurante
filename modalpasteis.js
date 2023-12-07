function abrirModalPasteis(nome, preco, id) {
    document.getElementById("modal-nome-pasteis").textContent = "Item: " + nome;
    document.getElementById("modal-preco-pasteis").textContent = "Preço: R$" + preco.toFixed(2);
    document.getElementById("modal-id-pasteis").value = id;

    // Configurar as opções adicionais com base na categoria
    document.getElementById("quantidade-adicional-pasteis").value = 0; // Reiniciar quantidade de adicionais
    document.getElementById("modalPasteis").style.display = "block";
}



function adicionarAoCarrinhoPasteis() {
    var id = document.getElementById("modal-id-pasteis").value;
    var nome = document.getElementById("modal-nome-pasteis").textContent.replace("Item: ", "");
    var preco = parseFloat(document.getElementById("modal-preco-pasteis").textContent.replace("Preço: R$", ""));
    var quantidade = parseInt(document.getElementById("quantidade-pasteis").value);
    var quantidadeAdicional = parseInt(document.getElementById("quantidade-adicional-pasteis").value);

    // Lógica para adicionar ao carrinho de pasteis
    var item = {
        id: id,
        nome: nome,
        preco: preco,
        quantidade: quantidade,
        adicionais: {
            quantidade: quantidadeAdicional,
            precoUnitario: 3.00  // Preço do adicional por unidade
        }
    };

    // Adicione o item ao carrinho ou faça qualquer outra lógica desejada
    // Exemplo: carrinho.push(item);

    // Fechar o modal após adicionar ao carrinho
    fecharModal('modalPasteis');
}

function fecharModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
