import React, { useEffect, useState } from "react";
import { HiPlusCircle, HiOutlineTrash, HiCurrencyDollar, HiArrowRight } from "react-icons/hi";
import { deleteCliente, getClienteById } from "../../../model/cliente";
import { createConta, deleteConta, listContas, marcarComoPago } from '../../../model/conta';
import BtnAlpha from '../buttons/BtnAlpha.js';
import ContaModal from "../modals/ContaModal";
import { toast } from "react-toastify";
import { useModal } from '../../../ModalContext';

function CardCliente({ clienteId, contas, saldos, setContas, setStoredValues }) {
  const [cliente, setCliente] = useState(null);
  const { isOpen, modalContent, openModal, closeModal } = useModal();

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

  return (
    <div className='flex animate-scaleUp hover:drop-shadow-lg group duration-75 drop-shadow-md flex-col w-full rounded-xl h-fit bg-white'>
      <div className='flex p-2 justify-between items-center'>
        <p className='text-lg text-bold pl-2 font-bold'>{cliente && cliente.nome}</p>
        <div className='flex opacity-0 duration-100 scale-95 gap-2 group-hover:opacity-100 group-hover:scale-100'>
          <BtnAlpha
            id="delete-cliente"
            icon={<HiOutlineTrash />}
            click={() => deleteCliente(clienteId)}
            tooltip={'Excluir cliente'}
          />
          <BtnAlpha
            id="create-conta"
            click={() => openModal(<ContaModal clienteId={clienteId} handleCreateConta={handleCreateConta} />)}
            icon={<HiPlusCircle />}
            tooltip={'Criar conta'}
          />
        </div>
      </div>
      <div className='min-h-40'>
        <nav className='nav'>
          <p className="text-sm pl-4 text-neutral-400">Contas recentes:</p>
        </nav>
        <div className='px-2'>
          {contas && contas.map((conta, i) => (
            <div className={`${conta.pago ? 'text-black' : 'text-red-500'} flex justify-between items-center p-1 group`}>
              <p className="text-sm">{conta.descricao}</p>
              <div className='flex gap-2 items-center'>
                <span>
                  <p className="text-sm">{"R$" + conta.valor}</p>
                </span>
                <div className="flex opacity-0 group-hover:opacity-100">
                  <BtnAlpha 
                    id={`mark-paid-${i}`}
                    icon={<HiCurrencyDollar/>} 
                    click={() => marcarComoPago(conta.id, clienteId, setContas)} 
                    tooltip={"Marcar como pago"}
                  />
                  <BtnAlpha 
                    id={`delete-conta-${i}`}
                    icon={<HiOutlineTrash/>} 
                    click={() => deleteConta(conta.id, setStoredValues, setContas)} 
                    tooltip={"Excluir conta"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex p-4 border-t-2 drop-shadow-sm border-neutral-200 justify-between items-center'>
        <div className={`saldo ${saldos && saldos < 0 ? 'text-red-500' : 'text-green-500'} text-lg font-bold`}>
          <p className='text-sm'>Saldo: {saldos}</p>
        </div>
        <BtnAlpha
          id="ver-mais"
          icon={<HiArrowRight />}
          text={'Ver mais'}
        />
      </div>
    </div>
  );
}

export default CardCliente;
