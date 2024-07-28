import { useState } from "react";
import InputTextWithAutocomplete from '../inputs/InputTextWithAutocomplete';
import BtnSolid from '../buttons/BtnSolid';
import { HiLockClosed, HiSave } from 'react-icons/hi';
import Toggle from "../inputs/Toggle";
import InputReal from "../inputs/InputReal";
import InputData from "../inputs/InputData";

const CreateConta = ({ clienteId, handleCreateConta }) => {
  const [inputDesc, setInputDesc] = useState('');
  const [inputValor, setInputValor] = useState('');
  const [inputData, setInputData] = useState('');
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
        <InputTextWithAutocomplete
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
          <InputData
            placeholder='Criado em'
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </div>
      </div>
      <nav className="h-fit w-full flex justify-end">
        <BtnSolid
          text={'Criar'}
          icon={<HiSave />}
          click={handleSubmit}
        />
      </nav>
    </div>
  );
};

export default CreateConta;
