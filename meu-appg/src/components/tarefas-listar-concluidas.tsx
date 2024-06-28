import React, { useEffect, useState } from 'react';
import { Tarefas } from '../models/Tarefas';

function TarefasListarConcluidas(){
          const [tarefas, setTarefas] = useState<Tarefas[]>([]);
        
          useEffect(() => {
            carregarTarefas();
          }, []);
        
          function carregarTarefas() {
            //FETCH ou AXIOS
            fetch("http://localhost:5000/tarefas/concluidas")
              .then((resposta) => resposta.json())
              .then((tarefas: Tarefas[]) => {
                console.table(tarefas);
                setTarefas(tarefas);
              });
          }

      return (
        <div>
        <h1>Listar Tarefas Concluidos</h1>
        <table border={1}>
          <thead>
            <tr>
              <th>#</th>
              <th>Titulo</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Criado Em</th>             
              <th>Categoria Id</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.id}>  
              <td>{tarefa.id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.status}</td>
              <td>{tarefa.criadoEm}</td>
              <td>{tarefa.categoriaId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )
  }


export default TarefasListarConcluidas;