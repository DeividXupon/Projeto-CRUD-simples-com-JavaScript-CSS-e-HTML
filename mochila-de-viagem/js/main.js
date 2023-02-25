const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (element) => {
    criaItem(element);
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];

    if (nome.value.trim() != "" && quantidade.value <= 1000 && quantidade.value != ""){
        const itemExist = itens.find(element => element.nome === nome.value);

        const objItemSalvo = {
            "nome": nome.value,
            "quantidade": quantidade.value
        }

        if (itemExist) {
            objItemSalvo.id = itemExist.id ;
            atualizaItem(objItemSalvo, quantidade.value);

            itens[itens.findIndex(elemento => elemento.id === itemExist.id)] = objItemSalvo;
        }else{
            objItemSalvo.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0;

            criaItem(objItemSalvo);
            
            itens.push(objItemSalvo);
        }

        localStorage.setItem("itens", JSON.stringify(itens));

        //clear inputs
        nome.value = "";
        quantidade.value = "";
    } else{
        criaAviso("É necessário preencher os dois campos do formulario com valores validos, quantidade deve ser menor que 1000");
    }
})

function criaItem(objItem) {
    
    const elementoLi = document.createElement("li");
    elementoLi.setAttribute("class" , "item");

    const elementoStrong = document.createElement("strong");
    elementoStrong.innerHTML = objItem.quantidade;
    elementoStrong.dataset.id = objItem.id;

    const elementoP = document.createElement("p");
    elementoP.innerHTML += objItem.nome;

    const elementoDivParaButoes = document.createElement("div");

    elementoLi.appendChild(elementoStrong);
    elementoLi.appendChild(elementoP);
    elementoLi.appendChild(elementoDivParaButoes);
    elementoDivParaButoes.appendChild(criaButaoEdit());
    elementoDivParaButoes.appendChild(criaButaoDelet(objItem.id));

    lista.appendChild(elementoLi);
}

function atualizaItem(objItem, novoValor) {
    document.querySelector(`[data-id='${objItem.id}']`).innerHTML = objItem.quantidade;
}

function criaButaoDelet(id) {
    const butao = document.createElement("button");
    butao.innerHTML = "X";
    butao.setAttribute("class", "butao");

    butao.addEventListener("click", function() {
        deletaElemento(this.parentNode.parentNode, id);
    })

    return butao;

}

function criaButaoEdit() {
    const butao = document.createElement("button");
    butao.innerHTML = "Edit";
    butao.setAttribute("class", "editButao");

    const nomeInput = document.querySelector("#nome");

    butao.addEventListener("click", function() {
        nomeInput.value = this.parentNode.parentNode.querySelector("p").innerHTML;
    })

    return butao;
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}

function criaAviso(texto){
    const main = document.querySelector("main");
    const conteudoAviso = document.createElement("div");
    conteudoAviso.setAttribute("class", "aviso")

    const tituloAviso = document.createElement("h2");
    tituloAviso.innerHTML = "AVISO";

    const textoAviso = document.createElement("p");
    textoAviso.setAttribute("class", "parag")
    textoAviso.innerHTML = texto;

    const butaoAviso = document.createElement("button");
    butaoAviso.setAttribute("class", "btn");
    butaoAviso.innerHTML = "Ok"

    butaoAviso.addEventListener("click", function() {
        deletaElemento(this.parentNode);
    })

    conteudoAviso.appendChild(tituloAviso);
    conteudoAviso.appendChild(textoAviso);
    conteudoAviso.appendChild(butaoAviso);

    main.appendChild(conteudoAviso)
}

