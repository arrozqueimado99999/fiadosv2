import React, { useState, useEffect } from 'react';
import '../index.css';
import '../firebaseConfig.js';
import { HiOutlineUserAdd } from "react-icons/hi";
import { useModal } from '../ModalContext.js';
import { listClientes } from '../model/cliente.js';
import 'react-toastify/dist/ReactToastify.css';
import CardCliente from '../layout/components/cards/CardCliente.js';
import BtnSolid from '../layout/components/buttons/BtnSolid.js';
import CreateCliente from '../layout/components/modals/CreateCliente.js';

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
    <div className='flex flex-col gap-4 px-6 py-4 w-full h-full overflow-y-auto'>
      <div className='flex pl-2 justify-between items-center'>
        <h2 className='text-2xl font-bold'>Clientes</h2>
        <div className='nav justify-end flex gap-2 items-center'>
          <BtnSolid
            icon={<HiOutlineUserAdd />}
            text={'Criar Cliente'}
            click={() => openModal(<CreateCliente />)}
          />
        </div>
      </div>

      <div className='pb-14 overflow-visible grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-5'>
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
