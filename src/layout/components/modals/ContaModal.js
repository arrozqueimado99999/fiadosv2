import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import InputText from '../inputs/InputText';
import BtnSolid from '../buttons/BtnSolid';
import {HiSave} from 'react-icons/hi';
import Toggle from "../inputs/Toggle";

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
      <div className='h-full'>
        <p className="text-xl font-black">Criar conta</p>
        <InputText
          placeholder='Descrição'
          value={inputDesc}
          onChange={(e) => setInputDesc(e.target.value)}
        />
  
        <InputText
          placeholder='Valor'
          type="number"
          value={inputValor}
          onChange={(e) => setInputValor(e.target.value)}
        />
          <Toggle
          checked={inputPago}
          change={(e) => setInputPago(e.target.checked)}
          />

        <BtnSolid
        text={'Criar'}
        icon={<HiSave/>}
        click={handleSubmit}
        />
      </div>
    );
  };
  
  export default ContaModal;