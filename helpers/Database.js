import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("produtos.db");

export const buscarProduto = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM produto ORDER BY NOME ASC',
                [],
                (_, resultado) => { resolve(resultado) },
                (_, err) => { reject(err) }
            )
                ;
        });
    });
    return promise;
}

export const editarProduto = (id, nome, preco, unidade, codigo, imagem) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`UPDATE produto SET NOME = ?, PRECO = ?, UNIDADE = ?, CODIGO = ?, IMAGEM = ? WHERE ID = ?`,
                [nome, preco, unidade, codigo, imagem, id],
                (_, resultado) => { resolve(resultado) },
                (_, err) => { reject(err) }
            )
                ;
        });
    });
    return promise;
}

export const inserirProduto = (nome, preco, unidade, codigo, imagemUri) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO produto (nome, preco, unidade, codigo, imagem) VALUES (?,?,?,?,?);',
                [nome, preco, unidade, codigo, imagemUri],
                (_, resultado) => { resolve(resultado) },
                (_, err) => { reject(err) }
            )
                ;
        });
    });
    return promise;
}

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS produto (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, preco REAL NOT NULL, unidade INTEGER NOT NULL, codigo INTEGER NOT NULL, imagem TEXT NOT NULL);',
                [],
                () => { resolve() },
                (_, err) => { reject(err) }
            )
                ;
        });
    });
    return promise;
}

export const excluirProduto = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM produto WHERE ID = ?',
                [id],
                () => { resolve() },
                (_, err) => { reject(err) }
            )
                ;
        });
    });
    return promise;
}