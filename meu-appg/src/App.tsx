import React from 'react';
import logo from './logo.svg';
import './App.css';
import TarefasListar from './components/tarefas-listar';
import TarefasListarConcluidas from './components/tarefas-listar-concluidas';
import TarefasListarNaoConcluidas from './components/tarefas-listar-naoconcluidas';
import TarefasCadastrar from './components/tarefas-cadastrar';
import CategoriasListar from './components/categoria-listar';

function App() {
  return (
    <div className="App">
      <TarefasCadastrar></TarefasCadastrar>
      <CategoriasListar></CategoriasListar>
      <TarefasListar></TarefasListar>
      <TarefasListarConcluidas></TarefasListarConcluidas>
      <TarefasListarNaoConcluidas></TarefasListarNaoConcluidas>
    </div>
  );
}

export default App;
