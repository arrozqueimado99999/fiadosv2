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
      <div className='min-h-full w-full flex flex-col items-center justify-center gap-3'>
        <p className="text-3xl p-4 font-black">Criar conta</p>
        <div className="h-full w-10/12 flex flex-col gap-2 items-center">
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
        </div>

          <nav className="h-fit w-10/12 flex justify-end">
            <BtnSolid
              text={'Criar'}
              icon={<HiSave/>}
              click={handleSubmit}
            />
          </nav>
      </div>
    );
  };
  
  export default ContaModal;