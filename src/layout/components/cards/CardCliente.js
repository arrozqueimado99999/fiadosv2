import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlusCircle, HiOutlineTrash, HiMenu } from 'react-icons/hi';
import { deleteCliente, getClienteById, listContasCount } from "../../../model/cliente";
import { createConta, listContas } from '../../../model/conta';
import BtnAlpha from '../buttons/BtnAlpha.js';
import ContaModal from "../modals/CreateConta.js";
import { toast } from "react-toastify";
import { useModal } from '../../../ModalContext';
import DropdownCliente from '../dropdown/DropdownCliente';
import BtnOption from '../buttons/BtnOption.js';
import BtnOutline from '../buttons/BtnOutline.js';
import BtnSolid from '../buttons/BtnSolid.js';
import BtnWhite from '../buttons/BtnWhite.js';

const CardCliente = ({ clienteId, contas, saldos, setContas }) => {
  const [cliente, setCliente] = useState(null);
  const { isOpen, modalContent, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const [contasCount, setContasCount] = useState({});

  useEffect(() => {
    const fetchCliente = async () => {
      const clienteData = await getClienteById(clienteId);
      setCliente(clienteData);
    };

    fetchCliente();
    listContasCount(clienteId, setContasCount);
  }, [clienteId]);

  const handleCreateConta = async (clienteId, desc, valor, pago, data) => {
    try {
      await createConta(desc, valor, pago, clienteId, data);
      listContas(clienteId, setContas);
      listContasCount(clienteId, setContasCount);
      toast.success('Conta criada com sucesso!', { position: 'bottom-right' });
    } catch (error) {
      console.error("Erro ao criar a conta: ", error);
      toast.error('Erro ao criar a conta.');
    }
  };

  const handleVerMais = () => {
    navigate(`/clientes/${clienteId}`);
  };

  return (
    <div onDoubleClick={handleVerMais} className='flex animate-scaleUp p-2 hover:shadow-lg hover:shadow-gray-200 group duration-75 border-2 border-neutral-200 flex-col w-full rounded-3xl h-fit bg-white'>
      <div 
        className={`flex flex-col rounded-2xl aspect-square p-3 justify-between items-center ${cliente ? cliente.color : 'bg-transparent'}`} // Alterado aqui
      >
        <nav className='flex justify-between w-full xl:opacity-0 duration-100 scale-95 gap-2 xl:group-hover:opacity-100 xl:group-hover:scale-100'>
          <BtnWhite
            id="create-conta"
            click={() => openModal(<ContaModal clienteId={clienteId} handleCreateConta={handleCreateConta} />)}
            icon={<HiPlusCircle />}
            text={'Criar conta'}
          />
          <DropdownCliente 
            icon={<HiMenu />}          
            options={[
              <BtnOption
                icon={<HiOutlineTrash />}
                click={() => deleteCliente(clienteId)}
                text={'Excluir Cliente'}
              />,
              <BtnOption
                className={'text-red-400'}
                icon={<HiOutlineTrash />}
                click={() => deleteCliente(clienteId)}
                text={'Excluir Cliente'}
              />          
            ]}
          />
        </nav>

        <div className='w-full h-full gap-3 flex p-2 flex-col justify-end items-start'>
          <p className='text-2xl font-bold'>{cliente && cliente.nome}</p>

          <div className='grid grid-cols-3 gap-2 w-full'>
            {contasCount[clienteId] > 0 ? (
              <div className='border-2 border-transparent bg-neutral-700 text-white text-xs truncate flex justify-center py-1 px-3 rounded-full'>
                {contasCount[clienteId]} Contas
              </div>
            ) : (
              <div className='border-2 border-neutral-700 text-min font-bold truncate flex justify-center py-1 px-3 rounded-full'>
                Sem contas
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex py-3 pt-4 px-4 drop-shadow-sm justify-between items-center'>
        <div className={`saldo ${saldos && saldos < 0 ? 'text-red-500' : 'text-green-500'} text-lg font-bold`}>
          <p className='text-sm'>Saldo: {saldos}</p>
        </div>
        <BtnSolid
          id="ver-mais"
          text={'Ver Mais'}
          click={handleVerMais}
        />
      </div>
    </div>
  );
}

export default CardCliente;
