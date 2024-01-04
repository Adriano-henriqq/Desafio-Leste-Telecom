import './Formulario.css'
import CampoTexto from "../CampoTexto";
import Botao from '../Botao';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputData from '../CampoTexto/CampoDate';


export default function Formulario({aoAdicionarContato, aoEditar, getUser, setAoEditar}){
    const [nome,setNome] = useState('')
    const [sobrenome,setSobrenome] = useState('')
    const [email,setEmail] = useState('')
    const [avatar,setAvatar] = useState('')
    const [genero,setGenero] = useState('')
    const [idioma,setIdioma] = useState('')
    const [birthday,setBirthday] = useState('')
    const ref = useRef()
    
    const limpaFormulario = ()=>{
      setNome('')
      setSobrenome('')
      setEmail('')
      setAvatar('')
      setGenero('')
      setIdioma('')
      setBirthday('')
  }


    useEffect(()=>{
      if(aoEditar){
        setAvatar(aoEditar.avatar);
        setNome(aoEditar.first_name);
        setSobrenome(aoEditar.last_name);
        setEmail(aoEditar.email);
        setGenero(aoEditar.gender);
        setBirthday(aoEditar.birthday);
        setIdioma(aoEditar.language);

      }else{
        console.log('s')
        limpaFormulario()
      }
    },[aoEditar])

    

  const enviaDados = async (evento, id) => {
    evento.preventDefault()
    const dadosContato = {
      avatar,
      first_name: nome,
      last_name: sobrenome,
      email,
      gender: genero,
      birthday,
      language: idioma,
    };
    if (aoEditar) {
      const contatosExistentes = localStorage.getItem('contatos');
      const contatos = JSON.parse(contatosExistentes);
      const contatoLocalStorage = contatos.findIndex(contato => contato.id == aoEditar.id)
      if (contatoLocalStorage == -1) {
        return await fetch(`http://localhost:3000/banco/${aoEditar.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosContato)
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
          }

          return response.json()



        }).then(data => {
          getUser()
          toast.success('Contato alterado com sucesso', { autoClose: 1000 })
          limpaFormulario()


          return data;
        }).catch(error => {
          console.error('Erro ao alterar dados:', error);
          throw error;
        });
      } else {
        let editado = contatos.map(item => {
          item
          if (item.id === aoEditar.id) {

            return dadosContato
          }
          return item
        })
        localStorage.setItem('contatos', JSON.stringify(editado))
        getUser()
        limpaFormulario()
        toast.success('Contato alterado com sucesso', { autoClose: 1000 })
        setAoEditar(null)
      }

    } else {

      aoAdicionarContato(dadosContato)
      limpaFormulario()
      setAoEditar(null)

    }

  }

    return(
       <section className="formulario"> 
            <h2>Preencha os dados do contato abaixo</h2>
        <form onSubmit={enviaDados} ref={ref}>
            <CampoTexto name={'avatar'} valor={avatar} aoAlterado={setAvatar} nome={'Avatar'}  placeholder={'Cole seu Avatar aqui'}/>
            <CampoTexto name={'first_name'} valor={nome} aoAlterado={setNome} nome={'Nome'} isRequired={true} placeholder={'Adicione seu nome aqui'}/>
            <CampoTexto name={'last_name'} valor={sobrenome}  aoAlterado={setSobrenome}  isRequired={true} nome={'Sobrenome'} placeholder={'Adicione seu sobrenome aqui'}/>
            <CampoTexto name={'email'} valor={email}  aoAlterado={setEmail} nome={'Email'} isRequired={true} placeholder={'Adicione seu email aqui'}/>
            <CampoTexto name={'gender'} valor={genero}  aoAlterado={setGenero} nome={'Genero'}  placeholder={'Adicione seu idioma aqui'}/>
            <InputData name={'birthday'} valor={birthday} aoAlterado={setBirthday} nome={'Nascimento'} isRequired={true}/>
            <CampoTexto name={'language'} valor={idioma}  aoAlterado={setIdioma} nome={'Idioma'} placeholder={'Adicione seu idioma aqui'}/>
            <Botao cor={'green'}>Adicionar contato</Botao>
        </form>
        </section>
    )
}
