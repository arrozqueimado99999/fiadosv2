import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById } from '../model/cliente.js';
import { buscarContasPorCliente, createConta, listContas, moveContasToPedido } from '../model/conta.js';
import { listarPedidos } from '../model/pedido.js';
import Loading from '../layout/Loading';
import BtnAlpha from '../layout/components/buttons/BtnAlpha';
import BtnOutline from '../layout/components/buttons/BtnOutline.js';
import ContaModal from '../layout/components/modals/CreateConta.js';
import { useModal } from '../ModalContext.js';
import { toast } from 'react-toastify';
import CardConta from '../layout/components/cards/CardConta.js';
import CardPedido from '../layout/components/cards/CardPedido.js';
import BtnSolid from '../layout/components/buttons/BtnSolid.js';
import { HiArrowNarrowLeft, HiPlusCircle, HiArrowSmDown, HiOutlineFolderAdd } from 'react-icons/hi';
import empty from '../assets/empty.jpg';
import SimpleLoad from '../layout/SimpleLoad';

const ClienteDetails = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [contas, setContas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const { isOpen, modalContent, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState('contas'); // Gerencia a página atual
  const [filtro, setFiltro] = useState('todas'); // Estado para o filtro aplicado
  const scrollContainerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const fetchClienteData = async () => {
      const clienteData = await getClienteById(id);
      setCliente(clienteData);

      const contasData = await buscarContasPorCliente(id);
      setContas(contasData[id] || []);

      const pedidosData = await listarPedidos(id);
      setPedidos(pedidosData || []);

      setLoading(false); // Carregamento completo
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

  const handleMoveContasToPedido = async () => {
    try {
      await moveContasToPedido(id);
      const contasData = await buscarContasPorCliente(id);
      setContas(contasData[id] || []);
      const pedidosData = await listarPedidos(id);
      setPedidos(pedidosData || []);
      toast.success('Contas movidas para o pedido com sucesso!', { position: 'bottom-right' });
    } catch (error) {
      console.error("Erro ao mover contas para pedido: ", error);
      toast.error('Erro ao mover contas para pedido.');
    }
  };

  const handleFilterClick = async (filtro) => {
    try {
      const contasData = await buscarContasPorCliente(id);
      setContas(contasData[id] || []);
      setFiltro(filtro);
    } catch (error) {
      toast.error("Erro ao buscar contas: ");
    }
  };
  

  const filtrarContas = (contas, filtro) => {
    switch (filtro) {
      case 'recentes':
        return [...contas].sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
      case 'pendentes':
        return contas.filter(conta => !conta.pago);
      case 'pagas':
        return contas.filter(conta => conta.pago);
      default:
        return contas;
    }
  };
  

  const contasFiltradas = filtrarContas(contas, filtro);

  return (
    <div className='p-6 flex h-full w-full flex-col gap-4'>
      <nav className='grid grid-cols-10 gap-2'>
        <div className='col-span-1 flex justify-end px-3'>
          <BtnAlpha
            click={() => navigate('/clientes')}
            icon={<HiArrowNarrowLeft />}
          />
        </div>
        <div className='col-span-9 px-3'>
          <h1 className='text-3xl font-extrabold'>{cliente.nome}</h1>
        </div>
      </nav>
      <section className='grid h-full w-full gap-4 grid-cols-10'>
        <div className='flex flex-col gap-2 w-full col-span-1 bg-transparent'>
          <button
            onClick={() => setCurrentPage('contas')}
            className={`text-neutral-400 text-right p-2 ${currentPage === 'contas' ? 'font-bold text-neutral-800' : ''}`}
          >
            Contas
          </button>
          <button
            onClick={() => setCurrentPage('pedidos')}
            className={`text-neutral-400 text-right p-2 ${currentPage === 'pedidos' ? 'font-bold text-neutral-800' : ''}`}
          >
            Pedidos
          </button>
        </div>
        <section className='grid col-span-9 grid-cols-10 relative w-full gap-4'>
          <div className='bg-white col-span-7 relative shadow-md overflow-hidden rounded-2xl h-full flex flex-col'>
            {currentPage === 'contas' && (
              <>
                <nav className='flex justify-between items-center p-4'>
                  <div className='flex gap-2 items-center justify-start'>
                  <BtnOutline
                    id="create-conta"
                    click={() => openModal(<ContaModal clienteId={id} handleCreateConta={handleCreateConta} />)}
                    icon={<HiPlusCircle />}
                    text={'Criar conta'}
                  />
                    <button
                      onClick={() => handleFilterClick('recentes')}
                      className={` duration-75 active:scale-95 flex w-fit flex-row menu-item hover:border-neutral-200 border-2 border-transparent font-regular text-xs items-center gap-1 p-2 h-fit rounded-full px-4 ${filtro === 'recentes' ? 'bg-neutral-700 text-white font-bold' : 'text-neutral-800'}`}
                    >
                      Mais recentes
                    </button>
                    <button
                      onClick={() => handleFilterClick('pendentes')}
                      className={` duration-75 active:scale-95 flex w-fit flex-row menu-item hover:border-neutral-200 border-2 border-transparent font-regular text-xs items-center gap-1 p-2 h-fit rounded-full  px-4 ${filtro === 'pendentes' ? 'bg-neutral-700 text-white font-bold' : 'text-neutral-800'}`}
                    >
                      Pendentes
                    </button>
                    <button
                      onClick={() => handleFilterClick('pagas')}
                      className={`duration-75 active:scale-95 flex w-fit flex-row menu-item hover:border-neutral-200 border-2 border-transparent font-regular text-xs items-center gap-1 p-2 h-fit rounded-full  px-4 ${filtro === 'pagas' ? 'bg-neutral-700 text-white font-bold' : 'text-neutral-800'}`}
                    >
                      Pagas
                    </button>
                  </div>
                  <div>
                    <BtnSolid
                    icon={<HiOutlineFolderAdd />}
                    text={"Fechar pedido"}
                    click={handleMoveContasToPedido}
                    />
                  </div>
                </nav>
                <div className='overflow-y-auto overflow-x-hidden no-scrollbar h-80 flex-grow relative'>
                <div ref={scrollContainerRef} className='overflow-y-auto overflow-x-hidden pt-0 p-4 no-scrollbar h-full flex-grow relative'>
                  {loading ? (
                    <SimpleLoad />
                  ) : contasFiltradas.length > 0 ? (
                    contasFiltradas.map((conta) => (
                      <CardConta
                        key={conta.id}
                        contaId={conta.id}
                        setContas={setContas}
                      />
                    ))
                  ) : (
                    <img className='h-4/5' src={empty} alt="No accounts available" />
                  )}
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
              </>
            )}
            {currentPage === 'pedidos' && (
              <div className='flex gap-4 h-full row-span-2'>
                <div className='bg-white shadow-md rounded-2xl p-3 h-full w-full overflow-y-auto'>
                  <nav className='flex justify-between items-center p-3'>
                  
                  </nav>
                  <div className='flex flex-col gap-2 w-full'>
                    {Array.isArray(pedidos) && pedidos.map((pedido) => (
                      <CardPedido
                        key={pedido.id}
                        pedido={pedido}
                        setPedidos={setPedidos}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='bg-white col-span-3 p-4 shadow-md overflow-hidden rounded-2xl h-full flex flex-col'>
            cu
          </div>
        </section>
      </section>
    </div>
  );
};

export default ClienteDetails;
