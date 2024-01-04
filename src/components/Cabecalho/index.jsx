import { useState } from 'react'
import Botao from '../Botao'
import './Cabecalho.css'


export default function Header({filtrar, filtroMês,tabelaFiltrada}){
const [mesSelecionado, setMesSelecionado]= useState('')

const mesAlterado = (evento) =>{
    evento.preventDefault();
    setMesSelecionado(evento.target.value)
    console.log(evento.target.value)
    filtroMês(evento.target.value)
    
}



    return(
        <header className="cabecalho">
            <h1>Lista de Contatos</h1>
                <p>Filtrar por:</p>
           <Botao id={'nome'} funcao={()=> filtrar('first_name')}>Nome</Botao>
           <label >Mês de Nascimento</label>
           <select onChange={mesAlterado}>
            <option value=""></option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
           </select>
           {tabelaFiltrada.length>0?<span> {tabelaFiltrada.length} Contatos Filtrados  </span>: ''}

           <Botao id={'genero'} funcao={()=>filtrar('gender')}>Genero</Botao>
           <Botao id={'idioma'} funcao={()=>filtrar('language')}>idioma</Botao>
        </header>
    )
}