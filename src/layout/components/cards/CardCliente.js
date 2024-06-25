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
      <div className='min-h-40'>
        <nav className='nav'>
          <p className="text-sm pl-4 text-neutral-400">Contas recentes:</p>
        </nav>
        <div className='px-2'>
          {contas && contas.map((conta, i) => (
            <div className={`${conta.pago ? 'text-black' : 'text-red-500'} flex conta-div h-10 z-0 justify-between items-center p-1 group`} key={i}>
              <p className="text-sm">{conta.descricao}</p>
              <div className='flex gap-2 items-center'>
                <span>
                  <p className="text-sm">{"R$" + conta.valor}</p>
                </span>
                <div className="flex opacity-0 group-hover:opacity-100">
                  <span className='hidden dpd-conta-menu'>
                    <DropdownCliente
                      icon={<HiChevronDown />}          
                      options={[
                        <BtnOption 
                          id={`mark-paid-${i}`}
                          icon={<HiCurrencyDollar />} 
                          click={() => marcarComoPago(conta.id, clienteId, setContas)} 
                          text={'Marcar como pago'}
                        />,
                        <BtnOption 
                          id={`delete-conta-${i}`}
                          icon={<HiOutlineTrash />} 
                          click={() => deleteConta(conta.id, setStoredValues, setContas)} 
                          text={'Excluir conta'}
                        />
                      ]}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
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
