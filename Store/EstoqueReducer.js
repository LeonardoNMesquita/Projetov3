import { ADD_PRODUTO, LISTA_PRODUTOS, EDITAR_PRODUTO, DELETAR_PRODUTO, ADD_PRODUT, LISTA_PRODUT, EDITAR_PRODUTOOS, DELETAR_PRODUTOO } from './EstoqueAction';
import Contato from '../Modelos/Contato';
import Produto from '../Modelos/Contato';

const estadoInicial = {
    produtos: []
};

export default (estado = estadoInicial, action) => {
    switch (action.type) {
        case ADD_PRODUTO:
            const produto = new Produto(action.produto.id.toString(), action.produto.nome, action.produto.preco, action.produto.unidade, action.produto.codigo, action.produto.imagem);
            return {
                produtos: estado.produtos.concat(produto)
            };
        case LISTA_PRODUTOS:
            return {
                produtos: action.produtos.map(p => new Produto(p.id, p.nome, p.preco, p.unidade, p.codigo, p.imagem))
            };
        case EDITAR_PRODUTO: 
            let removedArray = estado.produtos.filter((p) => {return p.id != action.produto.id.toString() });
            estado.produtos = removedArray;
            
            const novoProduto = new Produto(action.produto.id.toString(), action.produto.nome, action.produto.preco, action.produto.unidade, action.produto.codigo, action.produto.imagem);
            return {
                produtos: estado.produtos.concat(novoProduto)
            };
        case DELETAR_PRODUTO:
            let newArray = estado.produtos.filter((p) => {return p.id != action.produto.id.toString() });
            return { 
                produtos: estado.produtos = newArray 
            }
        default:
            return estado;
    }
}

