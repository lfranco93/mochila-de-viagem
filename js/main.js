const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach(element => {
    criaElemento(element);
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nome = event.target.elements['nome'];
    const quantidade =  event.target.elements['quantidade'];
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    criaElemento(itemAtual);
    itens.push(itemAtual);

    localStorage.setItem('itens', JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';
})

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    
    lista.appendChild(novoItem);
}

