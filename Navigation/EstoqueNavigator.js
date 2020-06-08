import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import AdicionarProduto from '../components/AdicionarProduto';
import EditarProduto from '../components/EditarProduto';
import ExibirProduto from '../components/ExibirProduto';
import ProdutoItem from '../components/ProdutoItem';
import Home from '../components/Home';
import Cores from '../Cores/Cores';
import Menu from '../components/Menu';
import Login from '../components/Login'
import LoginADM from '../components/LoginADM';
import CadastroLoja from '../components/CadastroLoja';
import CadastroLogin from '../components/CadastroLogin'

const Navigation = createStackNavigator({
    Menu: Menu,
    Login: Login,
    LoginADM: LoginADM,
    CadastroLoja: CadastroLoja,
    CadastroLogin:CadastroLogin,
    Home: Home,
    Criar: AdicionarProduto,
    Editar: EditarProduto,
    Item: ProdutoItem,
    Exibir: ExibirProduto
}, { 
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS ==='android'?Cores.second:''
        },
        headerTintColor: Platform.OS ==='android'?'black':'Cores.primary'
    }
});

export default createAppContainer(Navigation);