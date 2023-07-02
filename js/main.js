const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach(element => {
    criaElemento(element)
});


form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const nome = event.target.elements["nome"]
    const quantidade =  event.target.elements["quantidade"]
    
    const existe = itens.find(element => element.nome.toUpperCase() === nome.value.toUpperCase())

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        atualizaElementos(itemAtual)
        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;

        criaElemento(itemAtual);
        itens.push(itemAtual);    
    }
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

//Cria um novo Item no HTML da página para ser exibido na tela
function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");
    
    const numeroItem = document.createElement("strong");
    numeroItem.dataset.id = item.id;
    numeroItem.innerHTML = item.quantidade;
    
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novoItem);
}

//Function para atualizar os elementos quando adicionado um elemento igual
function atualizaElementos(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//Adiciona o botão "X" nos itens da lista no HTML em tela
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })  

    return elementoBotao
}


function deletaElemento(element, id) {
    //Remove o elemento recebido do HTML
    element.remove();

    //Remove o elemento do array de Itens
    itens.splice(itens.findIndex(element => element.id === id), 1)

    //Atualiza a lista de itens no Local Storage
    localStorage.setItem("itens", JSON.stringify(itens));
}
