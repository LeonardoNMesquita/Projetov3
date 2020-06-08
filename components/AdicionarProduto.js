import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {View, TextInput, Button, StyleSheet, Platform, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text} from 'react-native';

import BotaoNavegacao from '../components/BotaoNavegacao';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { withNavigation } from 'react-navigation';
import * as EstoqueAction from '../Store/EstoqueAction';
import TiraFoto from './TiraFoto';

const AdicionarProduto = (props) => {
    const [nome, setNome] = useState ('');
    const [preco, setPreco] = useState('');
    const [unidade, setUnidade] = useState('');
    const [codigo, setCodigo] = useState('');

    const dispatch = useDispatch();
    const [imagemURI, setImagemURI] = useState();

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
        setCodigo(handleBarCodeScanned(data));
    }


    function salvar(){
        dispatch(EstoqueAction.criarProduto(nome, preco , unidade, codigo, imagemURI));
        props.voltar();
    }

    return (
        <KeyboardAvoidingView style={styles.back}> 
            <View style={styles.logo}>
			<Image
			source={require('../assets/produto.png')}
			/>
			</View>

            <ScrollView style={styles.container}>

            <TiraFoto onFotoTirada={fotoTirada}/>
            <TextInput placeholder="Nome" value={nome} onChangeText={mudouNome}/>
            <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={mudouPreco} keyboardType={'numeric'}/>
            <TextInput style={styles.input} placeholder="Unidade" value={unidade} onChangeText={mudouUnidade} keyboardType={'numeric'}/>
            <TextInput style={styles.input} placeholder="Código" value={codigo} onChangeText={mudouCodigo} keyboardType={'numeric'}/>

            {/* <View style={styles.btnSubmit}> 
                <Button title="Salvar" onPress={salvar} color={Cores.primary}/>
                <Button title="Voltar" onPress={() => props.voltar()} color={Cores.gray}/>
            </View> */}

            <TouchableOpacity style={styles.btnSubmit} onPress = {salvar}>
				<Text style={styles.submitText}>Cadastrar Produto</Text>
			</TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
   
   
    

    logo:{
		flex:1,
		justifyContent: 'center'
    },
    back: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: '#191919',
        width: '100%'
    },
    container:{
		flex: 1,
		width: '90%',
		paddingBottom: 50,
		paddingLeft: 25
    },
    input: {
		backgroundColor: '#121212',
		width: '90%',
		marginBottom: 15,
		color: 'white',
		fontSize: 20,
		borderRadius: 7,
		padding: 10

    },
    
    btnSubmit: {
		backgroundColor: '#35AAFF',
		width: '90%',
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 7
    },
    submitText:{
		color: '#FFF',
		fontSize: 18
	}
});

// AdicionarProduto.navigationOptions = dadosNav => {
//     return {
//     headerTitle: "Adicionar",
//     headerRight:
//     <HeaderButtons
//     HeaderButtonComponent={BotaoNavegacao}>
//     <Item
//         title="Adicionar"
//         iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
//         onPress={() => { dadosNav.navigation.navigate("Adicionar") }} />
//     </HeaderButtons>
//     }
// }

export default withNavigation(AdicionarProduto);