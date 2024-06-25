import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import InputText from '../inputs/InputText';
import BtnSolid from '../buttons/BtnSolid';
import {HiSave} from 'react-icons/hi';
import Toggle from "../inputs/Toggle";
import InputEmail from "../inputs/InputEmail";
import InputReal from "../inputs/InputReal";

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
      <div className='w-full p-4 flex flex-col items-center justify-center gap-3'>
        <p className="text-3xl p-4 font-black">Criar conta</p>
        <div className="h-full w-full flex flex-col gap-2 items-start">
          <InputEmail
            placeholder='Descrição'
            value={inputDesc}
            onChange={(e) => setInputDesc(e.target.value)}
          />
          <div className="flex w-full gap-2 items-end">
            <InputReal
              placeholder='Valor'
              value={inputValor}
              onChange={(e) => setInputValor(e.target.value)}
            />
            <Toggle
            checked={inputPago}
            change={(e) => setInputPago(e.target.checked)}
            />
          </div>
        </div>

          <nav className="h-fit w-full flex justify-end">
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