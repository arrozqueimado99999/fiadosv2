import React, { useState, useEffect } from 'react';
import '../index.css';
import '../firebaseConfig.js';
import { HiOutlineUserAdd, HiSearch } from "react-icons/hi";
import { useModal } from '../ModalContext.js';
import { listClientes } from '../model/cliente.js';
import 'react-toastify/dist/ReactToastify.css';
import CardCliente from '../layout/components/cards/CardCliente.js';
import BtnSolid from '../layout/components/buttons/BtnSolid.js';
import BtnAlpha from '../layout/components/buttons/BtnAlpha.js';
import CreateCliente from '../layout/components/modals/CreateCliente.js';
import InputTextIcon from '../layout/components/inputs/InputTextIcon.js';

export function Clientes() {
  const [storedValues, setStoredValues] = useState([]);
  const [contas, setContas] = useState({});
  const { openModal } = useModal();
  const [saldos, setSaldos] = useState({});
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    listClientes(setStoredValues, setContas);
  }, []);

  useEffect(() => {
    const novosSaldos = {};
    Object.keys(contas).forEach((clienteId) => {
      const saldo = contas[clienteId]
        .filter((conta) => !conta.pago)
        .reduce((acc, conta) => acc - conta.valor, 0);
      novosSaldos[clienteId] = saldo;
    });
    setSaldos(novosSaldos);
  }, [contas]);

  return (
    <div className='flex overflow-y-auto flex-col gap-2 p-4 w-full h-full'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Clientes</h2>
        <div className='nav justify-end flex gap-2 items-center'>
          <BtnSolid
            icon={<HiOutlineUserAdd />}
            text={'Criar Cliente'}
            click={() => openModal(<CreateCliente />)} 
          />
          <InputTextIcon
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          icon={<HiSearch/>}
          placeholder={'Pesquisar'}
          //onKeyPress={searchByQuery}
          />
        </div>
      </div>

      <div className='pb-6 overflow-visible grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full h-fit max-h-screen gap-3'>
        {storedValues.map((cliente, index) => (
          <CardCliente
            key={index}
            clienteId={cliente.id}
            contas={contas[cliente.id]}
            saldos={saldos[cliente.id]}
            setContas={setContas}
            setStoredValues={setStoredValues}
          />
        ))}
      </div>
    </div>
  );
}

export default Clientes;
