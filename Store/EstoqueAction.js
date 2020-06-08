import * as FileSystem from 'expo-file-system'
import { inserirProduto, buscarProduto, editarProduto, excluirProduto } from '../helpers/Database';

export const ADD_PRODUTO = 'ADD_PRODUTO';
export const LISTA_PRODUTOS = 'LISTA_PRODUTOS';
export const EDITAR_PRODUTO = "EDITAR_PRODUTO";
export const DELETAR_PRODUTO = 'DELETAR_PRODUTO';

export const listarProdutos = () => {
    return async dispatch => {
        try {
            const resultadoDB = await buscarProduto();
            dispatch({ type: LISTA_PRODUTOS, produtos: resultadoDB.rows._array })
            console.log(resultadoDB);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const atualizarProduto = (id, nome, preco, unidade, codigo, imagem) => {
    return async dispatch => {
        const nomeArquivo = imagem.split("/").pop();
        const novoPath = FileSystem.documentDirectory + nomeArquivo;
    
        try {
            await FileSystem.moveAsync({
                from: imagem,
                to: novoPath
            })
            const resultadoDB = await editarProduto(
                id,
                nome,
                preco,
                unidade,
                codigo,
                novoPath
            )

            dispatch({ type: EDITAR_PRODUTO, produto: { id: id, nome: nome, preco: preco, unidade: unidade, codigo: codigo, imagem: novoPath } })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const deletarProduto = (id) => {
    return async dispatch => {
        try {
            const resultadoDB = await excluirProduto(id);
            dispatch({ type: DELETAR_PRODUTO, produto: {id: id} })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const criarProduto  = (nome, preco, unidade, codigo, imagem) => {
    return async dispatch => {
        const nomeArquivo = imagem.split("/").pop();
        const novoPath = FileSystem.documentDirectory + nomeArquivo;
    
        try {
            await FileSystem.moveAsync({
                from: imagem,
                to: novoPath
            })
            const resultadoDB = await inserirProduto(
                nome,
                preco,
                unidade,
                codigo,
                novoPath
            )

        dispatch({ type: ADD_PRODUTO, produto: { id: resultadoDB.insertId, nome: nome, preco: preco, unidade: unidade, codigo: codigo, imagem: novoPath } })
        console.log(resultadoDB)
        }

        catch (err) {
            console.log(err);
            throw err;
        }
    }
}