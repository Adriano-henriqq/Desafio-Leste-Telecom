import './Tabela.css'
import  {FaTrash, FaEdit}  from "react-icons/fa/" 
import { toast } from 'react-toastify';
import { VscAdd } from "react-icons/vsc";


export default function Tabela({contatos,setContato,setAoEditar, exibeFormulario}){
   
  
 
  
  const deleteUser = async (id) => {
    const contatosExistentes = localStorage.getItem('contatos');
    const contatos = JSON.parse(contatosExistentes);
    const contatoLocalStorage = contatos.findIndex(contato => contato.id == id)
    //Verifica se ele consta no localStorage
    if (contatoLocalStorage == -1) {
      const response = await fetch(`http://localhost:3000/banco/${id}`, {
        method: 'DELETE',

      }).then(({ data }) => {
        const newArray = contatos.filter((contato) => contato.id !== id)

        setContato(newArray)
        toast.success('Dados excluidos com sucesso', { autoClose: 1000 })
      })
      if (!response.ok) {
        throw new Error('nao foi possivel excluir o contato')
      }
      //caso se encontre no localStorage ele remove
    } else if (contatosExistentes) {
      const novosContatos = contatos.filter(contato => contato.id !== id);

      localStorage.setItem('contatos', JSON.stringify(novosContatos));
      setContato(novosContatos);
      toast.success('Dados excluidos com sucesso', { autoClose: 1000 })
    } else {
      console.error('Não há contatos salvos no localStorage.');
    }


  }

  

    const dadosEditar = (contatos)=>{
        setAoEditar(contatos)
        console.log(contatos)
        exibeFormulario() 
    }
    function formataData(data){
      if (typeof data === 'string') {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    } else {
        console.error('O parâmetro fornecido não é uma string.');
    }
  }
      
  return (
    <div className='container'>
      <div className='container__button'>
        <button onClick={exibeFormulario}><VscAdd size={20}/></button>
      </div>
  
      <section className='secao-lista'>
        <ul className='lista-contatos'>
          {contatos.map((contato) => (
            <li key={contato.id} className='contato'>
              <img src={contato.avatar} alt="Avatar photo" />
              <div className='info-contato'>
                <h3>{`${contato.first_name} ${contato.last_name}`}</h3>
                <p>Email: {contato.email}</p>
                <p>Gênero: {contato.gender}</p>
                <p>Data de Nascimento: {formataData(contato.birthday)}</p>
                <p>Idioma: {contato.language}</p>
                <div className='botoes'>
                  <FaEdit onClick={() => dadosEditar(contato)} size={20} cursor={'pointer'} />
                  <FaTrash onClick={() => deleteUser(contato.id)} size={20} cursor={'pointer'} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
  
}

