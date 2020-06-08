import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {View, TextInput, Button, StyleSheet, Platform, Image, Text} from 'react-native';
import Cores from '../Cores/Cores';
import Medidas from '../Medidas/Medidas';
import { withNavigation } from 'react-navigation';
import BotaoNavegacao from '../components/BotaoNavegacao';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as EstoqueAction from '../Store/EstoqueAction';
import TiraFoto from './TiraFoto';

const EditarProduto = (props) => {
    const [nome, setNome] = useState (props.nome);
    const [preco, setPreco] = useState(props.preco);
    const [unidade, setUnidade] = useState(props.unidade);
    const [codigo, setCodigo] = useState(props.codigo);

    const dispatch = useDispatch();
    const [imagemURI, setImagemURI] = useState(props.imagem);

    const fotoTirada = imagemURI => {
        setImagemURI(imagemURI);
    }

    const mudouNome = (nome) => {
        setNome (nome);
    }

    const mudouPreco = (preco) => {
        setPreco(preco);
    }

    const mudouUnidade = (unidade) => {
        setUnidade(unidade);
    }

    const mudouCodigo = (codigo) => {
        setCodigo(codigo);
    }

    function salvar(){
        dispatch(EstoqueAction.atualizarProduto(props.id, nome, preco, unidade, codigo, imagemURI));
        props.voltar();
    }

    return (
        <View>
            <Image style={styles.imagem} source={{ uri: props.imagem }}/>
            <TextInput placeholder="Nome" value={nome} onChangeText={mudouNome}/>
            <TextInput placeholder="Preço" value={preco.toString()} onChangeText={mudouPreco} keyboardType={'numeric'}/>
            <TextInput placeholder="Unidade" value={unidade.toString()} onChangeText={mudouUnidade} keyboardType={'numeric'}/>
            <TextInput placeholder="Código" value={codigo.toString()} onChangeText={mudouCodigo} keyboardType={'numeric'}/>

            <View style={styles.buttons}> 
                <Button title="Salvar" onPress={salvar} color={Cores.primary}/>
                <Button title="Página inicial" onPress={() => props.voltar()} color={Cores.gray}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-around',
        marginTop: Medidas.margin10
    },
    component: {
       backgroundColor: Cores.background 
    },
    input:{
        marginBottom: Medidas.margin15
    },
    imagem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Medidas.image230,
        height: Medidas.image230,
        borderRadius: Medidas.radius150,
        backgroundColor: '#ccc',
        borderColor: Cores.primary,
        borderWidth: 1,
        marginBottom: Medidas.margin15,
        alignSelf: 'center'
    }
});


EditarProduto.navigationOptions = dadosNav => {
    return {
    headerTitle: "Editar o produto",
    headerRight:
    <HeaderButtons
    HeaderButtonComponent={BotaoNavegacao}>
    <Item
        title="Editar"
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        onPress={() => { dadosNav.navigation.navigate("Editar") }} />
    </HeaderButtons>
    }
}


export default withNavigation(EditarProduto);