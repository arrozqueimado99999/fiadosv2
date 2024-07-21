import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate no lugar de useHistory
import { HiPlusCircle, HiChevronDown, HiOutlineTrash, HiCurrencyDollar, HiChevronRight, HiMenu } from 'react-icons/hi';
import { deleteCliente, getClienteById } from "../../../model/cliente";
import { createConta, deleteConta, listContas, marcarComoPago } from '../../../model/conta';
import BtnAlpha from '../buttons/BtnAlpha.js';
import ContaModal from "../modals/ContaModal";
import { toast } from "react-toastify";
import { useModal } from '../../../ModalContext';
import DropdownCliente from '../dropdown/DropdownCliente';
import BtnOption from '../buttons/BtnOption.js';
import BtnOutline from '../buttons/BtnOutline.js';

const CardCliente = ({ clienteId, contas, saldos, setContas, setStoredValues }) => {
  const [cliente, setCliente] = useState(null);
  const { isOpen, modalContent, openModal, closeModal } = useModal();
  const navigate = useNavigate(); // Uso do useNavigate

  useEffect(() => {
    const fetchCliente = async () => {
      const clienteData = await getClienteById(clienteId);
      setCliente(clienteData);
    };

    fetchCliente();
  }, [clienteId]);

  const handleCreateConta = async (clienteId, desc, valor, pago, data) => {
    try {
      await createConta(desc, valor, pago, clienteId, data);
      listContas(clienteId, setContas);
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
    <div className='flex animate-scaleUp hover:shadow-lg hover:shadow-gray-200 group duration-75 border-2 border-neutral-200 flex-col w-full rounded-xl h-fit bg-white'>
      <div className='flex p-2 justify-between items-center'>
        <p className='text-lg font-bold pl-2'>{cliente && cliente.nome}</p>
        <div className='flex xl:opacity-0 duration-100 scale-95 gap-2 xl:group-hover:opacity-100 xl:group-hover:scale-100'>
          <BtnOutline
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
        </div>
      </div>
      <div className='w-full'>
        <div className='grid grid-cols-2 p-2 gap-2 min-h-40 w-full h-full'>
          <div className='rounded-2xl bg-purple-400'>
            wecrewvc
          </div>
          <div className='grid grid-rows-2 gap-2 h-full w-full'>
              <div className='rounded-2xl bg-purple-400'>
                wecrewvc
              </div>
              <div className='rounded-2xl grid grid-cols-2 gap-2'>
                <div className='bg-red-500 rounded-2xl'></div>
                <div className='bg-red-500 rounded-2xl'></div>
              </div>
          </div>
        </div>
      </div>
      <div className='flex py-2 px-4 border-t-2 drop-shadow-sm border-neutral-200 justify-between items-center'>
        <div className={`saldo ${saldos && saldos < 0 ? 'text-red-500' : 'text-green-500'} text-lg font-bold`}>
          <p className='text-sm'>Saldo: {saldos}</p>
        </div>
        <BtnAlpha
          id="ver-mais"
          icon={<HiChevronRight />}
          text={'Ver Mais'}
          click={handleVerMais} // Adiciona o handler ao click do botão
        />
      </div>
    </div>
  );
}

export default CardCliente;
