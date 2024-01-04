import Header from "./components/Cabecalho"
import Formulario from "./components/Form"
import Tabela from "./components/Tabela"
import { useEffect, useState } from 'react';
import Modal from "./components/modal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";
import Notificacao from "./components/Util";



function App() {
const [contatos,setContato] = useState([])
const [tabelas,setTabela] = useState([])
const [aoEditar,setAoEditar] = useState(null)
const [tabelaFiltrada,setTabelaFiltrada] = useState([])
const [filtroAtivo, setFiltroAtivo] = useState(false)
const [mostrarModal, setMostrarModal] = useState(true)

  const getUser = async () => {
    try {
      const resposta = await fetch('https://my.api.mockaroo.com/lestetelecom/test.json?key=f55c4060')
      const respostaTradata = await resposta.json()
      const dadosSalvos = localStorage.getItem('contatos')
        const novoArray = JSON.parse(dadosSalvos)
      if (Array.isArray(novoArray)) {
        
        setTabela([...respostaTradata, ...novoArray])
      } else {
        console.log('Os dados nao carregaram')
        setTabela([respostaTradata])
      }

    } catch (err) {
      console.log(err)
    }
  }

useEffect(()=>{
  getUser()
  
},[contatos])

 
  function setUser(contato) {
    const contatosComId = { ...contato, id: uuidv4() }
    const contatosExistentes = localStorage.getItem('contatos');
    if (contatosExistentes) {

      const contatos = JSON.parse(contatosExistentes)
      console.log(contatos)
      const novosContatos = [...contatos, contatosComId]
      localStorage.setItem('contatos', JSON.stringify(novosContatos))
      setContato(novosContatos)
    } else {
      localStorage.setItem('contatos', JSON.stringify([contatosComId]))
      setContato([contatosComId])
    }
    toast.success('Contato Adicionado', { autoClose: 1000 })

  }



const filtrar = (tipoDeFiltro)=>{

  if(filtroAtivo && tabelaFiltrada.length>0){
    setTabela(tabelas)
    setFiltroAtivo(false)
    setTabelaFiltrada([])
    console.log('itens da tabela original', tabelas)
    
  }else{
    const itensFiltrados = tabelas.filter(item => item[tipoDeFiltro])
    .sort((a,b) => a[tipoDeFiltro]
    .localeCompare(b[tipoDeFiltro]))
    setTabelaFiltrada(itensFiltrados)
    console.log(itensFiltrados)
    setFiltroAtivo(true)
  }
  
}

const filtrarPorMes = (mesSelecionado) => {
  const itensFiltrados = tabelas.filter(item => {
    const partesData = item.birthday.split('-');
    const dataNascimento = new Date(
      parseInt(partesData[0], 10),  
      parseInt(partesData[1], 10) - 1,  
      parseInt(partesData[2], 10)  
    );

    const mesNascimento = dataNascimento.getMonth() + 1;  
    return mesNascimento === parseInt(mesSelecionado, 10);
  });
  console.log(itensFiltrados)
  if(itensFiltrados.length < 1 ) {
    setFiltroAtivo(false);
    setTabelaFiltrada([])
    
  }else{
    setFiltroAtivo(true)

    setTabelaFiltrada(itensFiltrados);
    console.log(itensFiltrados);
  }

 
};
const exibeFormulario = ()=>{
  setMostrarModal(!mostrarModal)
}
const fecharForm = () => {
  setMostrarModal(true);
  setAoEditar(null)
};

  return (
    <div className="app">
     <Header filtroMês={filtrarPorMes} filtrar = {filtrar} tabelaFiltrada={tabelaFiltrada}/>
     <Notificacao/>
     
     <Tabela exibeFormulario={exibeFormulario} 
     setContato={setContato} contatos={ filtroAtivo == true? tabelaFiltrada :tabelas} 
     setAoEditar={setAoEditar}
     />
     {!mostrarModal && <Modal fecharModal={fecharForm}>
     <Formulario setAoEditar={setAoEditar} aoEditar={aoEditar} 
     aoAdicionarContato={setUser} getUser={()=>getUser()}
     />
    </Modal>}
    
    </div>
  )
}

export default App
