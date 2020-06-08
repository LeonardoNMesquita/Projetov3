import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Keyboard, Platform, Image} from 'react-native';
import { Cartao } from './Cartao';
import Medidas from '../Medidas/Medidas';
import { withNavigation } from 'react-navigation';
import Cores from '../Cores/Cores';
import * as EstoqueAction from '../Store/EstoqueAction';

const ProdutoItem = (props) => {
    const dispatch = useDispatch();

    const confirmaExclusao = () => {
        Alert.alert(
            'Deletar produto',
            'Tem certeza que deseja excluir esse item?', //mensagem
            //coleção de botões, cada botão é um JSON
            [
                {text: 'Deletar', style: 'default', onPress: () => deletar(props.id)},
                {text: 'Cancelar', style: 'default', onPress:  Keyboard.dismiss()},
            ]
        );
       
    }

    const deletar = (id) => {
        dispatch(EstoqueAction.deletarProduto(id));
    }

    return(
        <TouchableOpacity style={styles.item} onPress={() => props.onClick(props.id)} onLongPress={confirmaExclusao}>
                    <Image 
                        style={styles.imagem} 
                        source={{ uri: props.imagem }} 
                    />
                    <Cartao estilos={styles.cartao}>
                    <Text style={styles.nome}>Nome: {props.nome}</Text>
                    <Text style={styles.numero}>Preço: R$ {props.preco}</Text>
                    <Text style={styles.numero}>Unidade: {props.unidade}</Text>
                    <Text style={styles.numero}>Codigo: {props.codigo}</Text>

                </Cartao>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create ({
    item: {
        flexDirection: 'row',
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center'
    },
    cartao: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    imagem: {
        width: 70,
        height: 75,
        borderRadius: 5,
        backgroundColor: '#CCC',
        borderColor: Cores.primary,
        borderWidth: 1
    },
    nome: {
        color: 'black',
        fontSize: 18,
       
    },
    numero: {
        color: 'black',
        fontSize: 16
    }
});

export default withNavigation(ProdutoItem);