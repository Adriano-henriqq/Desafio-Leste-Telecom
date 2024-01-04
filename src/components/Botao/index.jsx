 import './Botao.css'
 import PropTypes from 'prop-types';

function Botao({ children,funcao, cor, position,id }) {
  return (
    <div className='container-botao'>
      <button id={id} style={{backgroundColor: cor, position: position}} onClick={funcao}>{children}</button>
    </div>
  );
}

Botao.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Botao;
