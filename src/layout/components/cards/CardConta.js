import React, { useEffect, useState, useRef } from 'react';
import { HiOutlineTrash, HiCurrencyDollar, HiSelector, HiOutlineCheck, HiOutlineCheckCircle, HiInformationCircle, HiOutlineCurrencyDollar, HiOutlineInformationCircle } from 'react-icons/hi';
import { deleteConta, getContaById, listContas, marcarComoPago } from "../../../model/conta";
import { useModal } from '../../../ModalContext';
import BtnOption from '../buttons/BtnOption.js';
import ContaOverview from '../modals/ContaOverview.js';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CardConta = ({ contaId, setContas }) => {
  const { id: clienteId } = useParams();
  const [conta, setConta] = useState(null);
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchConta = async () => {
      const contaData = await getContaById(contaId);
      setConta(contaData);
    };

    fetchConta();
  }, [contaId]);

  const toggleDropdown = (event) => {
    event.preventDefault(); // Previene o menu de contexto padrão
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleDeleteConta = async () => {
    try {
      await deleteConta(contaId, clienteId, setContas);
      toast.success("Conta excluida com sucesso");
    } catch (error) {
      toast.error("Erro ao excluir conta");
    }
  };

  const handleMarcarComoPago = async () => {
    try {
      await marcarComoPago(contaId, clienteId, setContas);
      const contaData = await getContaById(contaId);
      setConta(contaData);
    } catch (error) {
      console.error("Erro ao marcar como pago: ", error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!conta) return null;

  return (
    <div onContextMenu={toggleDropdown} ref={dropdownRef} className={`${conta.pago ? 'text-neutral-400 font-thin' : 'text-black font-semibold'} flex hover:bg-neutral-100 focus:bg-neutral-700 rounded-2xl cursor-pointer conta-div relative h-16 justify-between items-center p-1 group`}>
      <div className='flex flex-col pl-2 items-start justify-center'>
        <div className='flex items-center justify-start'>
          <input className='hidden h-4 border-2 border-neutral-400' type='checkbox' name='cu'/>
          <p className="text-sm">{conta.descricao}</p>
        </div>
        <p className="text-xs font-thin">Criada em {formatDate(conta.dataCriacao)}</p>
      </div>
      <div className='flex gap-2 items-center'>
        <span>
          <p className="text-sm font-semibold">{formatCurrency(conta.valor)}</p>
        </span>
        <div className="relative inline-block text-left">
          {isOpen && (
            <div className="origin-top-left z-50 animate-slideDown flex absolute right-4 top-8 mt-2 w-fit rounded-xl overflow-hidden shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <BtnOption
                  icon={<HiOutlineInformationCircle />}
                  click={() => openModal(<ContaOverview contaId={contaId} />)}
                  text={'Detalhes'}
                />
                <BtnOption
                  key={`mark-paid-${contaId}`}
                  icon={<HiOutlineCurrencyDollar />}
                  click={() => {
                    handleMarcarComoPago();
                    setIsOpen(false);
                  }}
                  text={'Marcar como pago'}
                />
                <BtnOption
                  icon={<HiOutlineCheckCircle />}
                  click={() => {
                  }}
                  text={'Selecionar'}
                />
                <BtnOption
                  key={`delete-conta-${contaId}`}
                  icon={<HiOutlineTrash />}
                  className={"text-red-500 font-bold"}
                  click={()=> handleDeleteConta()}
                  text={'Excluir conta'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardConta;
