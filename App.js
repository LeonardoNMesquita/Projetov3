import React, { useState } from 'react';
import EstoqueNavigator from './Navigation/EstoqueNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import EstoqueReducer from './Store/EstoqueReducer';
import { init } from './helpers/Database';  

init().
  then(() => {
    console.log("Base criada com sucesso ou já existente.");
  }).
  catch((err) => {
    console.log("Criação da base falhou.");
    console.log(err);
})

const rootReducer = combineReducers({
  produtos: EstoqueReducer
});

//criando o estado centralizado
const store = createStore(rootReducer, applyMiddleware(reduxThunk));

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Provider store={store}>
         <EstoqueNavigator/>
      </Provider>
    );
  }
}

export default App;


