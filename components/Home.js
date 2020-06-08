import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import ProdutoAdd from './AdicionarProduto';
import ProdutoItem from './ProdutoItem';
import Cores from '../Cores/Cores';
import Medidas from '../Medidas/Medidas';
import ExibirProduto from './ExibirProduto';
import EditarProduto from  './EditarProduto';
import { withNavigation } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import * as EstoqueAction from '../Store/EstoqueAction';

const Home = ({navigation}) => {
  const [produto, setProduto] = useState ([]);
  const [modoAdd, setModoAdd] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const [modoEdit, setModoEdit] = useState(false);
  const [modoView, setModoView] = useState(false);
  const lista_produtos = useSelector(estado => estado.produtos.produtos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(EstoqueAction.listarProdutos())
  }, [dispatch]);

  function handleBack(){
    setModoAdd(false);
    setModoEdit(false);
    setModoView(false);
  }

  const handleSaveClick = (nome, preco, unidade, codigo) => {
    let id = calculateIndex();
    //Add the current contact in the end of the array
    setProduto(produto => {
      return [...produto, {id: id, nome: nome, preco: preco, unidade: unidade, codigo: codigo}];
    })
  }

  const handleSaveEdit = (nome, preco, unidade, codigo) => {
    let index = findProdutoIndex();

    removerProduto(produtoSelecionado.id);

    if(index >= 0){
      setProduto(produto => {
        return [...produto, {id: produtoSelecionado.id, nome: nome, preco: preco, unidade: unidade, codigo: codigo}];
      })
    }
    setModoEdit(false);
  }

  function handleAddClick(){
    setModoAdd(true);
  }

  function findProdutoIndex(){
    return produto.indexOf(produtoSelecionado)
  }

  function calculateIndex(){
    if(produto.length == 0 ){
      return 10;
    } else{
      let ultimoProduto = produto[produto.length - 1];
      return ultimoProduto.id + 2;
    }
  }

  const removerProduto = (key) => {
    //Returns all array elements that are not the one i want to delete 
    //And then changes the value of the array
    let filteredProduto = produto.filter((p) => {return p.id != key });
    setProduto(filteredProduto);
  }
 
  const exibir = (key) => {
    let filteredProduto = lista_produtos.filter((p) => {return p.id == key });
    setProdutoSelecionado(filteredProduto[0]);
    setModoView(true);
    setModoAdd(false);
    setModoEdit(false);
  }

  const handleEditClick = () => {
    setModoEdit(true);
    setModoView(false);
  }
  
  return (
    <View style={styles.container}>
      {modoAdd == false && modoEdit == false && modoView == false &&
        <View>
          <Text style={styles.title}>               Lista de produtos</Text>
          {lista_produtos && lista_produtos.length > 0? 
            <FlatList
              data={lista_produtos}
              renderItem={
              produto => (
              <ProdutoItem style={styles.nomes}
                id={produto.item.id}
                nome={produto.item.nome}
                preco={produto.item.preco}
                unidade={produto.item.unidade}
                codigo={produto.item.codigo}
                imagem={produto.item.imagemURI}
                onDelete={removerProduto}
                onClick={exibir}
              />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            :
            null
          }
          <Button style={styles.botao} title="Adicionar produto" color={Cores.primary} onPress={() => {handleAddClick()}} />
      </View>
      }
      {modoAdd == true &&
        <ProdutoAdd salvar={handleSaveClick} voltar={handleBack}/>
      }
      {modoView ==true&&
          <ExibirProduto id={produtoSelecionado.id} nome={produtoSelecionado.nome} preco={produtoSelecionado.preco} unidade={produtoSelecionado.unidade} codigo={produtoSelecionado.codigo} imagem={produtoSelecionado.imagemURI} voltar={handleBack} handleEdit={handleEditClick}/>
      }
      {modoEdit == true &&
        <EditarProduto id={produtoSelecionado.id} nome={produtoSelecionado.nome} preco={produtoSelecionado.preco} unidade={produtoSelecionado.unidade} codigo={produtoSelecionado.codigo} imagem={produtoSelecionado.imagemURI} voltar={handleBack} handleSaveClick={handleSaveEdit} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: Medidas.flex1,
    backgroundColor: Cores.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  tableHeader: {
    fontWeight: 'bold',
    marginBottom: Medidas.margin10,
    color: Cores.primary
  },
  title: {
    color: Cores.primary,
    fontSize: Medidas.font24,
    fontWeight: 'bold',
    marginTop: Medidas.margin15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Medidas.margin6,
    width: Medidas.width100
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  nomes:{
    color: '#121212',
    fontSize: 20,
    paddingLeft: 8,
    paddingRight: 20
}
});

export default withNavigation(Home);