import './CampoTexto.css'


export default function CampoTexto({nome, placeholder,valor,aoAlterado, name,isRequired}){
    const inputAlterado = (evento)=>{
        aoAlterado(evento.target.value)
    }
    return(
       <div className='campoTexto'> 
        <label>{nome}</label>
        <input name={name} value={valor} onChange={inputAlterado} {...(isRequired && {required: true})} type="text" placeholder={placeholder}/>
        </div>

    )
}
