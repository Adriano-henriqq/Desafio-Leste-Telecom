import './CampoData.css'

export default function InputData ({nome, aoAlterado,name,valor, isRequired}){

    const inputAlterado = (evento)=>{
        aoAlterado(evento.target.value)
    }
    return(
        <div className="campoData">
            <label>{nome}</label>
            <input name={name} value={valor}  onChange={inputAlterado} {...(isRequired && {required: true})} type="date"  />
        </div>
    )
}