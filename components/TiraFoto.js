import React, {useState, useEffect, useCallback} from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import Cores from '../Cores/Cores';
import * as ImagePicker from 'expo-image-picker';
import {BarCodeScanner} from 'expo-barcode-scanner';
import App from '../codigodebarra/LerCodigoDeBarra'

const TiraFoto = props => {
    const [imagemURI, setImagemURI] = useState();

    const tirarFoto = async () => {
        const foto = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        });
        setImagemURI(foto.uri);
        props.onFotoTirada(foto.uri); 
    }


    return (
        <View style={estilos.principal}>
            <View style={estilos.previewDaImagem}>
                {
                    !imagemURI ?
                    <Text>Nenhuma foto.</Text>
                    :
                    <Image
                    style={estilos.imagem}
                    source={{ uri: imagemURI }}
                    />
                }
            </View>
                        <Button
            title="Tirar foto"
            color={Cores.primary}
            onPress={tirarFoto}
            />

            <Button
            title="Escanear"
            color={Cores.primary}
            onPress={App}
            />
        </View>
        )
};
const estilos = StyleSheet.create({
    principal: {
        alignItems: 'center',
        marginBottom: 15
    },
    previewDaImagem: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#CCC',
        borderWidth: 1
    },
    imagem: {
        width: '100%',
        height: '100%'
    }
});
export default TiraFoto;