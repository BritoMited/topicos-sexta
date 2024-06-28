import React, { useEffect, useState } from 'react';
import { Categorias } from '../models/Categorias';

function CategoriasListar(){
    const [categorias, setCategorias] = useState<Categorias[]>([]);
        
          useEffect(() => {
            carregarCategorias();
          }, []);
        
          function carregarCategorias() {
            //FETCH ou AXIOS
            fetch("http://localhost:5000/categoria/listar")
              .then((resposta) => resposta.json())
              .then((categorias: Categorias[]) => {
                console.table(categorias);
                setCategorias(categorias);
              });
          }

      return (
        <div>
        <h1>Listar Categorias</h1>
        <table border={1}>
          <thead>
            <tr>
              <th>Id Categoria</th>
              <th>Titulo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categorias) => (
              <tr key={categorias.categoriaId}>
                <td>{categorias.categoriaId}</td>
                <td>{categorias.nome}</td>
                <td>{categorias.criadoEm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )
  }


export default CategoriasListar;