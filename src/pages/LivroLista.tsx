import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '@/componente/Menu';
import {LinhaLivro} from '@/componente/LinhaLivro';
import Livro from '@/classes/modelo/Livro';
import styles from '../styles/Home.module.css'

const baseURL = "http://localhost:3000/api/livros";

const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState(false);

    const obterLivros = async () => {
        const resposta = await fetch(baseURL);
        const dados = await resposta.json();
        setLivros(dados);
        setCarregado(true);
    }

    const excluirLivro = async (codigo: number) => {
        const resposta = await fetch(`${baseURL}/${codigo}`, {
            method: 'DELETE'
        });
        return resposta.ok;
    }

    const excluir = async (codigo: number) => {
        const sucesso = await excluirLivro(codigo);
        if (sucesso) {
            setCarregado(false);
        }
    }

    useEffect(() => {
        if (!carregado) {
            obterLivros().then(() => setCarregado(true));
        }
    }, [carregado]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <main className='container'>
      <h1 className='text-center py-4'>Livros</h1>
        <table className='container-fluid'>
        <thead>
          <tr className='text-light bg-dark col'>
            <th className='p-3 col-2 '>Título</th>
            <th className='p-3 col-7'>Resumo</th>
            <th className='p-3 col-1'>Editora</th>
            <th className='p-3 col-2'>Autores</th>
          </tr>
        </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo).then(() => setCarregado(false))}
              />
            ))}
          </tbody>
        </table>
        {livros.length <= 0 ? (<h2 className='text-center py-5'>Estoque de livros vazio 😢</h2>) : (<></>)}
      </main>
    </div>
  );
};

export default LivroLista;
