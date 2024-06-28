import React, { useEffect, useState } from 'react';
import { Tarefas } from '../models/Tarefas';
import { Categorias } from '../models/Categorias';

function TarefasCadastrar(){

    const [titulo, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaId, setQuantidade] = useState("");
    const [status, setValor] = useState("");
    const [categorias, setCategorias] = useState<Categorias[]>([]);

  
  
    useEffect(() => {
      carregarCategorias();
    }, []);
  
    function carregarCategorias() {
      //FETCH ou AXIOS
      fetch("http://localhost:5000/categoria/listar")
        .then((resposta) => resposta.json())
        .then((categorias: Categorias[]) => {
          setCategorias(categorias);
        });
    }
  
    function cadastrarTarefa(e: any) {
      const tarefa: Tarefas = {
        titulo: titulo,
        descricao: descricao,
        categoriaId: categoriaId,
        status: status
      };
  
      //FETCH ou AXIOS
      fetch("http://localhost:5000/tarefas/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarefa),
      })
        .then((resposta) => resposta.json());
      e.preventDefault();
    }
    return (
      <div>
        <h1>Cadastrar Tarefa</h1>
        <form onSubmit={cadastrarTarefa}>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome"
            onChange={(e: any) => setNome(e.target.value)}
            required
          />
          <br />
          <label>Descricao:</label>
          <input
            type="text"
            placeholder="Digite o descrição"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
          <br />
          <label>categoriaId:</label>
          <input
            type="text"
            placeholder="Digite o quantidade"
            onChange={(e: any) => setQuantidade(e.target.value)}
          />
          <br />
          <label>status:</label>
          <input
            type="text"
            placeholder="Digite o valor"
            onChange={(e: any) => setValor(e.target.value)}
          />
          <br />
          <label>Categorias:</label>
          {/* <select onChange={(e: any) => setCategoriaId(e.target.value)}>
            {categorias.map((categoria) => (
              <option value={categoria.id} key={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select> */}
          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    )
}

export default TarefasCadastrar;