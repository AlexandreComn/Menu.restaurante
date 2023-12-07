const carrinho = [];
atualizarCarrinho();

function abrirModal(nome, preco, id) {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-nome').innerText = nome;
    document.getElementById('modal-preco').innerText = `Preço: R$${preco.toFixed(2)}`;
    document.getElementById('modal-id').value = id;
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    resetarOpcoesAdicionais();
}

function adicionarAoCarrinho() {
    const id = document.getElementById('modal-id').value;
    const nome = document.getElementById('modal-nome').innerText;
    const preco = parseFloat(document.getElementById('modal-preco').innerText.replace('Preço: R$', '').replace(',', '.'));
    const quantidade = parseInt(document.getElementById('quantidade').value);

    let totalAdicionais = 0;
    const tipoAdicional = document.getElementById('tipoAdicional').value;
    let detalhesAdicional = '';

    if (tipoAdicional === 'hamburguer') {
        const quantidadeHamburguer = parseInt(document.getElementById('quantidadeHamburguer').value) || 0;
        totalAdicionais = 7.00 * quantidadeHamburguer;
        detalhesAdicional = `Adicional: Hamburguer (Quantidade: ${quantidadeHamburguer})`;
    } else if (tipoAdicional === 'outros') {
        const nomeOutros = document.getElementById('nomeOutros').value;
        const quantidadeOutros = parseInt(document.getElementById('quantidadeOutros').value) || 0;
        totalAdicionais = 4.00 * quantidadeOutros;
        detalhesAdicional = `Adicional: ${nomeOutros} (Quantidade: ${quantidadeOutros})`;
    }

    const totalProduto = (preco || 0) * quantidade + totalAdicionais;

    const produto = {
        nome,
        quantidade,
        tipoAdicional,
        detalhesAdicional,
        totalProduto,
        quantidadeAdicional: tipoAdicional === 'hamburguer' ? (parseInt(document.getElementById('quantidadeHamburguer').value) || 0) : (parseInt(document.getElementById('quantidadeOutros').value) || 0),
        nomeAdicional: tipoAdicional === 'outros' ? document.getElementById('nomeOutros').value : '',
    };

    carrinho.push(produto);
    fecharModal();
    atualizarCarrinho();
}
function mostrarOpcoesAdicionais() {
    const tipoAdicional = document.getElementById('tipoAdicional').value;
    const opcoesHamburguer = document.getElementById('opcoesHamburguer');
    const opcoesOutros = document.getElementById('opcoesOutros');

    if (tipoAdicional === 'hamburguer') {
        opcoesHamburguer.style.display = 'block';
        opcoesOutros.style.display = 'none';
    } else if (tipoAdicional === 'outros') {
        opcoesHamburguer.style.display = 'none';
        opcoesOutros.style.display = 'block';
    } else {
        opcoesHamburguer.style.display = 'none';
        opcoesOutros.style.display = 'none';
    }
}

function resetarOpcoesAdicionais() {
    document.getElementById('quantidadeHamburguer').value = 0;
    document.getElementById('nomeOutros').value = '';
    document.getElementById('quantidadeOutros').value = 0;
}

function criarBotaoRemover(index) {
    const botaoRemover = document.createElement('button');
    botaoRemover.innerText = 'Remover';
    botaoRemover.onclick = function () {
        removerDoCarrinho(index);
    };
    return botaoRemover;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho-container');
    carrinhoContainer.innerHTML = ''; // Limpa o conteúdo atual do carrinho

    let totalAPagar = 0;

    carrinho.forEach((produto, index) => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.innerHTML = `${produto.nome} - Quantidade: ${produto.quantidade} - ${produto.detalhesAdicional} - Total: R$${produto.totalProduto.toFixed(2)}`;
        
        const botaoRemover = criarBotaoRemover(index);
        itemCarrinho.appendChild(botaoRemover);

        carrinhoContainer.appendChild(itemCarrinho);

        totalAPagar += produto.totalProduto;
    });

    const totalAPagarElement = document.createElement('div');
    totalAPagarElement.innerHTML = `<br>Total a Pagar: R$${totalAPagar.toFixed(2)}`;
    carrinhoContainer.appendChild(totalAPagarElement);
}

function prepararMensagemWhatsApp() {
    const numeroWhatsApp = '41998665850'; // Substitua pelo seu número de WhatsApp
    const mensagem = gerarMensagemCarrinho();

    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    window.open(linkWhatsApp, '_blank');
}

function gerarMensagemCarrinho() {
let mensagem = 'Pedido do Cantinho do Sabor:\n';

carrinho.forEach((produto) => {
let detalhesAdicional = '';

if (produto.tipoAdicional === 'hamburguer') {
    detalhesAdicional = `Adicional: Hamburguer (Quantidade: ${produto.quantidadeAdicional})`;
} else if (produto.tipoAdicional === 'outros') {
    detalhesAdicional = `Adicional: ${produto.nomeAdicional} (Quantidade: ${produto.quantidadeAdicional})`;
}

mensagem += `${produto.nome} - Quantidade: ${produto.quantidade} - ${detalhesAdicional} - Total: R$${produto.totalProduto.toFixed(2)}\n`;
});

mensagem += `\nTotal a Pagar: R$${calcularTotalAPagar().toFixed(2)}`;

return encodeURIComponent(mensagem); // Adicionei o encodeURIComponent aqui
}


function calcularTotalAPagar() {
let totalAPagar = 0;
carrinho.forEach((produto) => {
    totalAPagar += produto.totalProduto;
});
return totalAPagar;
}