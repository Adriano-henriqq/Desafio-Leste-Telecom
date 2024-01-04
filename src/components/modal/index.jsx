import Botao from '../Botao';
import './Modal.css'

function Modal({  fecharModal, children }) {

  return (
    <div className="modal-overlay" >
      <div className="modal">
        <Botao cor={'red'}funcao={fecharModal}>Fechar Formulario</Botao>
        {children}
      </div>
    </div>
  );
}

export default Modal;
