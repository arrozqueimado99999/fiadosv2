import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const ContaModal = ({ clienteId, handleCreateConta }) => {
    const [inputDesc, setInputDesc] = useState('');
    const [inputValor, setInputValor] = useState('');
    const [inputData, setInputData] = useState(serverTimestamp);
    const [inputPago, setInputPago] = useState(false);
  
    const handleSubmit = () => {
      handleCreateConta(clienteId, inputDesc, inputValor, inputPago, inputData);
      setInputDesc('');
      setInputValor('');
      setInputPago(false);
    };
  
    return (
      <div className='modalContent'>
        <input
          placeholder='Descrição'
          type="text"
          value={inputDesc}
          onChange={(e) => setInputDesc(e.target.value)}
        />
  
        <input
          placeholder='Valor'
          type="number"
          value={inputValor}
          onChange={(e) => setInputValor(e.target.value)}
        />
  
          <input type="checkbox" id="checkboxInput"
          checked={inputPago}
          onChange={(e) => setInputPago(e.target.checked)}
          />
          <label for="checkboxInput" class="toggleSwitch">
          </label>
  
          <input type='date' onChange={(e) => setInputData(e.target.value)}>
          </input>
        <button className='outline' onClick={handleSubmit}>
          Criar conta
        </button>
      </div>
    );
  };
  
  export default ContaModal;