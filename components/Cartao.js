import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Cores from '../Cores/Cores';
import Medidas from '../Medidas/Medidas';

export const Cartao = (props) => {
    return(
        // Eu uso o spread operator para mesclar os estilos css
        <View style={{...estilos.cartao, ...props.estilos}}>
            {props.children}
        </View>
    );

};

const estilos = StyleSheet.create({
    cartao:{
        shadowColor:Cores.shadowCartao,
            shadowOffset:{
                width:0,
                height:2
            },
        shadowRadius:6,
        shadowOpacity:0.32,
        backgroundColor:'white',
        elevation:4,
        padding:15,
        borderRadius:15
    }
});
