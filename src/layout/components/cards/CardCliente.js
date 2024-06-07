import React, { useEffect, useState } from "react";
import { HiPlusCircle, HiOutlineTrash, HiCurrencyDollar, HiArrowRight } from "react-icons/hi";
import { deleteCliente, getClienteById } from "../../../model/cliente";
import { createConta, deleteConta, listContas, marcarComoPago } from '../../../model/conta';
import BtnSolid from "../buttons/BtnSolid";
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
    <div className='flex animate-scaleUp hover:drop-shadow-lg duration-75 drop-shadow-md flex-col w-full rounded-xl h-fit bg-white'>
      <div className='flex p-2 justify-between items-center'>
        <p className='text-lg text-bold pl-2 font-bold'>{cliente && cliente.nome}</p>
        <div className='flex gap-2'>
          <BtnAlpha
            icon={<HiOutlineTrash />}
            click={() => deleteCliente(clienteId)}
          />
          <BtnAlpha
            click={() => openModal(<ContaModal clienteId={clienteId} handleCreateConta={handleCreateConta} />)}
            icon={<HiPlusCircle />}
          />
        </div>
      </div>
      <div className='min-h-40'>
        <nav className='nav'>
          <p className="text-sm pl-4 text-neutral-400">Contas recentes:</p>
        </nav>
        <div className='px-2'>
          {contas && contas.map((conta, i) => (
            <div className={`conta ${conta.pago ? 'bg-green-500' : 'bg-red-500'} flex justify-between items-center p-2`} key={i}>
              <p>{conta.descricao}</p>
              <div className='flex gap-2 items-center'>
                <p>{"R$" + conta.valor}</p>
                <BtnAlpha icon={<HiCurrencyDollar/>} click={() => marcarComoPago(conta.id, clienteId, setContas)}/>
                <BtnAlpha icon={<HiOutlineTrash/>}click={() => deleteConta(conta.id, setStoredValues, setContas)}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex p-4 border-t-2 drop-shadow-sm border-neutral-200 justify-between items-center'>
        <div className={`saldo ${saldos && saldos < 0 ? 'text-red-500' : 'text-green-500'} text-lg font-bold`}>
          <p className='text-sm'>Saldo: {saldos}</p>
        </div>
        <button className='btnDisc' onClick={() => console.log('Arrow button clicked')}>
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
}

export default CardCliente;
