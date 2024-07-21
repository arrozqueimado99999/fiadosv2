import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById } from '../model/cliente.js';
import { deleteConta, marcarComoPago, buscarContasPorCliente, createConta } from '../model/conta.js';
import Loading from '../layout/Loading';
import BtnAlpha from '../layout/components/buttons/BtnAlpha';
import { HiArrowNarrowLeft, HiChevronDown, HiCurrencyDollar, HiOutlineTrash, HiPlusCircle, HiArrowSmDown } from 'react-icons/hi';
import DropdownCliente from '../layout/components/dropdown/DropdownCliente';
import BtnOption from '../layout/components/buttons/BtnOption';
import BtnOutline from '../layout/components/buttons/BtnOutline.js';
import ContaModal from '../layout/components/modals/ContaModal.js';
import { useModal } from '../ModalContext.js';
import { toast } from 'react-toastify';

const ClienteDetails = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [contas, setContas] = useState([]);
  const { isOpen, modalContent, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const scrollContainerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const fetchClienteData = async () => {
      const clienteData = await getClienteById(id);
      setCliente(clienteData);

      const contasData = await buscarContasPorCliente(id);
      setContas(contasData[id] || []);
    };

    fetchClienteData();
  }, [id]);

  useEffect(() => {
    const checkScrollable = () => {
      const el = scrollContainerRef.current;
      if (el) {
        setIsScrollable(el.scrollHeight > el.clientHeight);
        setIsAtBottom(el.scrollHeight <= el.clientHeight + el.scrollTop);
      }
    };
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [contas]);

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollContainerRef.current;
      if (el) {
        setIsAtBottom(el.scrollHeight <= el.clientHeight + el.scrollTop);
      }
    };
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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

  if (!cliente) {
    return <Loading />;
  }

  const handleCreateConta = async (clienteId, desc, valor, pago, data) => {
    try {
      await createConta(desc, valor, pago, clienteId, data);
      const contasData = await buscarContasPorCliente(clienteId);
      setContas(contasData[clienteId] || []);
      toast.success('Conta criada com sucesso!', { position: 'bottom-right' });
    } catch (error) {
      console.error("Erro ao criar a conta: ", error);
      toast.error('Erro ao criar a conta.');
    }
  };

  return (
    <div className='p-6 flex h-full flex-col gap-4'>
      <nav className='flex gap-2'>
        <BtnAlpha
          click={() => navigate('/clientes')}
          icon={<HiArrowNarrowLeft />}
        />
        <h1 className='text-3xl font-extrabold'>{cliente.nome}</h1>
      </nav>
      <section className='grid h-full gap-4 grid-cols-2'>
        <div className='bg-white shadow-md overflow-hidden rounded-2xl h-full flex flex-col'>
          <nav className='flex justify-between items-center p-4'>
            <p className='font-bold text-xl'>Contas</p>
            <div>
              <BtnOutline
                id="create-conta"
                click={() => openModal(<ContaModal clienteId={id} handleCreateConta={handleCreateConta} />)}
                icon={<HiPlusCircle />}
                text={'Criar conta'}
              />
            </div>
          </nav>
          <div className='overflow-y-auto overflow-x-hidden no-scrollbar h-20 flex-grow relative'>
            <div ref={scrollContainerRef} className='overflow-y-auto overflow-x-hidden pt-0 p-4 no-scrollbar h-full flex-grow relative'>
              {contas && contas.map((conta, i) => (
                <div className={`${conta.pago ? 'text-neutral-400 font-thin' : 'text-black font-semibold'} flex hover:bg-neutral-100 rounded-2xl cursor-pointer conta-div relative h-14 z-0 justify-between  items-center p-1 group`} key={i}>
                  <div className='flex flex-col pl-2 items-start justify-center'>
                    <p className="text-sm">{conta.descricao}</p>
                    <p className="text-xs font-thin">Criada em {formatDate(conta.dataCriacao)}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <span>
                      <p className="text-sm font-semibold">{formatCurrency(conta.valor)}</p>
                    </span>
                    <div className="flex opacity-0 group-hover:opacity-100">
                      <span className='hidden dpd-conta-menu'>
                        <DropdownCliente
                          icon={<HiChevronDown />}
                          options={[
                            <BtnOption
                              id={`mark-paid-${i}`}
                              icon={<HiCurrencyDollar />}
                              click={() => marcarComoPago(conta.id, id, setContas)}
                              text={'Marcar como pago'}
                            />,
                            <BtnOption
                              id={`delete-conta-${i}`}
                              icon={<HiOutlineTrash />}
                              click={() => deleteConta(conta.id, setContas)}
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

            {isScrollable && (
              <>
                <div className={`absolute bottom-0 right-0 w-full h-20 bg-gradient-to-b from-transparent to-white ${isAtBottom ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}></div>
                <span className={`absolute text-xl bottom-4 right-2/4 bg-neutral-600 p-2 rounded-full ${isAtBottom ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
                  <HiArrowSmDown className="text-white" />
                </span>
              </>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-4 h-full'>
          <section className='flex gap-4 rounded-lg h-full row-span-2'>
            <div className='bg-blue-300 rounded-xl h-full w-full'></div>
            <div className='bg-blue-300 rounded-xl h-full w-full'></div>
          </section>

          <div className='bg-red-500 rounded-lg h-full row-span-2'>
            wecdwedc
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClienteDetails;
